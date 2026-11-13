#!/usr/bin/env node
/**
 * Dynamic Meta Generator - YBE Auto Repair Center (pgcountyautorepair.com)
 *
 * Implements the Trades Meta Rule (trades-meta-rule-all-pages.md) exactly:
 * - Meta is GENERATED from the page record. Nobody hand writes meta.
 * - The input is the KEY QUESTION: the exact question people type for that
 *   service and city. No key question on the record = no meta ships (flagged).
 * - FAQ and BLOG pages: the title IS the key question, trimmed from the END
 *   to 50-60 characters.
 * - Service, service x location, location, home, emergency pages: STATEMENT
 *   titles. The key question drives the DESCRIPTION, not the title.
 * - Descriptions: 150-160 characters, phone last, always, never trimmed.
 * - Trim order when too long: drop {{offer}}, then {{fix_3}}, then {{proof}}.
 *   Never cut the question, the city, or the phone.
 * - Empty variable = its whole segment drops out. No gaps, no brackets.
 * - {{proof}} and {{offer}} print only when a real value is on the record.
 * - No brand name in descriptions.
 * - Two pages never share the same key question (build flags duplicates).
 *
 * Usage:
 *   node dynamic-meta.js page-records.json [meta-output.csv]
 * Output: CSV with page, slug, type, key question, title, title chars,
 *         description, description chars, flags. Exit code 1 if any record
 *         is flagged, so the build can stop on a bad record.
 */

const fs = require("fs");

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

function seg(...parts) {
  // Join non-empty segments with single spaces; empty variable drops out.
  return parts.filter((p) => p && String(p).trim().length > 0).join(" ");
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function trimQuestionFromEnd(q, max = TITLE_MAX) {
  if (q.length <= max) return q;
  let t = q.slice(0, max);
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace > TITLE_MIN) t = t.slice(0, lastSpace);
  return t;
}

/*
 * Steer, 2026-11-13 (Old Ox Tire pattern): service, service area and location
 * titles end with the phone: "<service> in <town>, <state> | Call 202-455-3822",
 * 60 characters at most. When the statement is too long, the state goes first,
 * then the whole town; a town is never cut in half.
 */
function withPhone(statement, r) {
  // Old Ox's title format for the phone ("Call 202-481-0685"): two characters
  // shorter than the description's "(202) 455-3822", so full town names fit.
  const digits = String(r.phone).replace(/\D/g, '');
  const tail = ` | Call ${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  const room = TITLE_MAX - tail.length;
  let base = statement;
  if (base.length > room) base = base.replace(/, [A-Z]{2}$/, '');
  // Never half a town: if the town still does not fit, drop it whole.
  if (base.length > room) base = base.replace(/ in [^|]+$/, '');
  return `${base}${tail}`;
}

function buildTitle(r) {
  const t = statementTitle(r);
  if (t && ['service', 'service_location', 'location'].includes(r.page_type)) return withPhone(t, r);
  return t;
}

function statementTitle(r) {
  switch (r.page_type) {
    case "faq":
    case "blog":
      return trimQuestionFromEnd(r.key_question);
    case "service":
      return r.offer ? `${r.service} | ${r.offer}` : r.service;
    case "service_location":
      return `${r.service} in ${r.city}, ${r.state}`;
    case "location":
      return `${r.trade_label} in ${r.city}, ${r.state}`;
    case "home":
      return `${r.primary_service} in ${r.service_area}`;
    case "emergency":
      return `${r.emergency_service} in ${r.city}, ${r.state}`;
    default:
      return null;
  }
}

// Descriptions are assembled as ordered segments so the trim order can drop
// whole segments: offer first, then fix_3, then proof.
function descriptionSegments(r) {
  const call = `Call ${r.phone}.`;
  const trust = r.trust_signal ? `${r.trust_signal}.` : null;
  const proof = r.proof ? `${r.proof}.` : null;
  const offer = r.offer ? `${r.offer}.` : null;

  const fixes = (n) => {
    const list = [r.fix_1, r.fix_2, r.fix_3].filter(Boolean).slice(0, n);
    return list.length ? cap(list.join(", ")) + "." : null;
  };
  const tops = () => {
    const list = [r.top_service_1, r.top_service_2, r.top_service_3].filter(Boolean);
    return list.length ? list.join(", ") + "." : null;
  };

  switch (r.page_type) {
    case "home":
      return { head: `Dealing with ${r.problem} in ${r.service_area}?`, mid: tops(), offer, fixSeg: null, proof, tail: [trust, call] };
    case "service":
      return { head: `Need ${r.service_lower || r.service}?`, mid: null, offer, fixSeg: fixes(3), proof, tail: ["Priced before work starts.", trust, call].filter(Boolean) };
    case "service_location":
      return { head: `Need ${r.service_lower || r.service} in ${r.city}?`, mid: null, offer, fixSeg: fixes(3), proof, tail: [trust, call] };
    case "location":
      return { head: `In ${r.city} and dealing with ${r.problem}?`, mid: tops(), offer, fixSeg: null, proof, tail: [trust, call] };
    case "emergency":
      return { head: `${cap(r.problem)} in ${r.city} right now?`, mid: r.response_time ? `${r.response_time} response.` : null, offer, fixSeg: null, proof, tail: [trust, `Call ${r.phone} now.`] };
    case "faq":
      // The rule's template line adds "Still stuck?" before the call, but the
      // rule's own worked FAQ example (151 chars, Drywall Pros) ships without
      // it: question + mid + trust + "Call {{phone}}." The worked example is
      // the generated output, so the tail follows the example.
      return { head: r.key_question, mid: "The answer covers cost factors, time, and process.", offer, fixSeg: null, proof, tail: [trust, call] };
    case "blog":
      return { head: r.key_question, mid: "What it costs, how long it takes, what to do first.", offer, fixSeg: null, proof, tail: [call] };
    default:
      return null;
  }
}

function buildDescription(r) {
  const s = descriptionSegments(r);
  if (!s) return null;
  const fixesTwo = () => {
    const list = [r.fix_1, r.fix_2].filter(Boolean);
    return list.length ? cap(list.join(", ")) + "." : null;
  };
  const assemble = (parts) => seg(s.head, s.mid, parts.offer, parts.fixSeg, parts.proof, ...s.tail);
  let desc = assemble(s);
  // Trim order: drop offer, then fix_3 (rebuild with 2 fixes), then proof.
  if (desc.length > DESC_MAX && s.offer) desc = assemble({ ...s, offer: null });
  if (desc.length > DESC_MAX && s.fixSeg) desc = assemble({ ...s, offer: null, fixSeg: fixesTwo() });
  if (desc.length > DESC_MAX && s.proof) desc = assemble({ ...s, offer: null, fixSeg: s.fixSeg ? fixesTwo() : null, proof: null });
  return desc;
}

function generateMeta(r) {
  const flags = [];
  if (!r.key_question) {
    return { title: null, description: null, flags: ["NO KEY QUESTION: no meta ships"] };
  }
  const title = buildTitle(r);
  const description = buildDescription(r);
  if (title === null) flags.push(`UNKNOWN PAGE TYPE: ${r.page_type}`);
  if (title) {
    if (title.length > 60) flags.push(`TITLE OVER 60 (${title.length})`);
    if ((r.page_type === "faq" || r.page_type === "blog") && title.length < TITLE_MIN)
      flags.push(`QUESTION TITLE UNDER 50 (${title.length})`);
  }
  if (description) {
    if (description.length > DESC_MAX) flags.push(`DESCRIPTION OVER 160 (${description.length})`);
    if (description.length < DESC_MIN) flags.push(`DESCRIPTION UNDER 150 (${description.length})`);
    if (!description.includes(r.phone)) flags.push("PHONE MISSING FROM DESCRIPTION");
  }
  return { title, description, flags };
}

function csvCell(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function main() {
  const inPath = process.argv[2] || "page-records.json";
  const outPath = process.argv[3] || "meta-output.csv";
  const records = JSON.parse(fs.readFileSync(inPath, "utf8"));

  // Duplicate key question check: same question twice = build flags it.
  const seen = new Map();
  for (const r of records) {
    if (!r.key_question) continue;
    const k = r.key_question.trim().toLowerCase();
    if (!seen.has(k)) seen.set(k, []);
    seen.get(k).push(r.page);
  }

  const rows = [["Page", "Slug", "Page Type", "Key Question", "Title", "Title Chars", "Description", "Description Chars", "Flags"]];
  let flagged = 0;
  for (const r of records) {
    const { title, description, flags } = generateMeta(r);
    if (r.key_question && seen.get(r.key_question.trim().toLowerCase()).length > 1)
      flags.push("DUPLICATE KEY QUESTION");
    if (flags.length) flagged++;
    rows.push([
      r.page, r.slug, r.page_type, r.key_question || "",
      title || "", title ? title.length : "",
      description || "", description ? description.length : "",
      flags.join("; "),
    ]);
  }
  fs.writeFileSync(outPath, rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n");
  console.log(`records: ${records.length}, flagged: ${flagged}, output: ${outPath}`);
  if (flagged) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { generateMeta };
