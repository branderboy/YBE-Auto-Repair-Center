module.exports = {
  slug: 'electrical',
  navLabel: 'Electrical & Starting',
  title: 'Electrical and Starting Systems',
  icon: 'battery-charging',
  metaTitle: 'Auto Electrical Repair in Capitol Heights, MD | YBE Auto',
  metaDescription:
    'Car will not start? YBE tests batteries, alternators, starters, wiring and sensors in Capitol Heights, MD. Open seven days. Call or text (202) 455-3822.',
  blurb:
    'Batteries, alternators, starters, wiring, sensors, charging problems, and no-start conditions.',
  intro: [
    'Electrical faults are the ones most likely to leave you standing next to your car wondering what just happened. Everything worked yesterday. Today it clicks, or it cranks and will not catch, or the dash lights up like a Christmas tree and then goes dark.',
    'The frustrating part is that a dead battery, a failing alternator and a bad starter can all look identical from the driver seat. Replacing the wrong one is a common and avoidable expense.',
    'We test the system rather than swapping parts. A charging-system test takes minutes and tells us which component actually failed, and whether the battery was the cause or just the casualty.'
  ],
  covers: [
    'Batteries and battery testing',
    'Alternators and charging systems',
    'Starters and starting circuits',
    'Wiring, grounds and connectors',
    'Fuses and relays',
    'Sensors and no-start diagnostics'
  ],
  services: [
    {
      slug: 'battery-alternator-starter',
      navLabel: 'Battery, Alternator & Starter',
      title: 'Battery, Alternator and Starter Repair',
      metaTitle: 'Battery & Starter Repair in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Dead battery, dimming lights or a clicking starter? YBE tests the whole charging system before replacing anything. Capitol Heights, MD. Call (202) 455-3822.',
      customerVoice: 'I keep having to jump-start my car.',
      problem: [
        'You turn the key and get a click, a slow lazy crank, or nothing at all. Maybe it started fine this morning and refused this afternoon. Maybe a jump start works but you are back in the same spot two days later.',
        'Needing repeated jump starts is the clearest signal that something beyond the battery is going on. Either the battery is no longer holding a charge, the alternator is not replacing what you use, or something is draining it while the car sits.'
      ],
      whatWeDo: [
        'We test the battery under load, not just its resting voltage. A battery can read fine sitting still and still collapse the moment the starter asks for real current.',
        'We test the alternator output across the range the engine actually runs, and we check the charging circuit including the belt, the main cables and the ground connections. A corroded ground is a surprisingly common cause of symptoms that look like a bad alternator.',
        'If the battery keeps dying overnight, we test for a parasitic draw to find the circuit that stays awake after the car is shut off. And if the complaint is a starter, we test current draw and the starting circuit rather than assuming it.'
      ],
      warningSigns: [
        'A single click, or rapid clicking, when you turn the key',
        'Slow, labored cranking, especially in the morning',
        'Battery or charging warning light on the dash',
        'Headlights that dim at idle and brighten when you rev',
        'Needing a jump more than once',
        'Corrosion built up on the battery terminals'
      ],
      includes: [
        'Load testing of the battery',
        'Alternator output and charging-circuit testing',
        'Starter current-draw and starting-circuit testing',
        'Cable, terminal and ground inspection and cleaning',
        'Parasitic-draw testing when the battery drains overnight',
        'Replacement of the component that actually failed, with the system retested after'
      ],
      whyNotIgnore: [
        'A failing alternator does not just strand you eventually. It ruins the battery it is supposed to be charging, so waiting often means paying for both.',
        'A battery that is already weak also puts extra strain on the starter, which draws more current to do the same job. These parts fail in sequence when they are not sorted out early.'
      ],
      related: ['no-start-diagnostics', 'wiring-sensors-fuses', 'jump-start']
    },
    {
      slug: 'no-start-diagnostics',
      navLabel: 'No-Start Diagnosis',
      title: 'No-Start Diagnostics',
      metaTitle: 'No-Start Diagnostics in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Car cranks but will not start, or does nothing at all? YBE finds the cause in Capitol Heights, MD. Roadside help available. Call or text (202) 455-3822.',
      customerVoice: 'My car won’t start.',
      problem: [
        'There are two very different versions of this. In one, the engine turns over normally and simply never catches. In the other, nothing turns over at all: a click, a dashboard that lights up and dies, or complete silence.',
        'That distinction is the single most useful thing you can tell us on the phone, because it splits the possible causes almost in half before anyone touches the car.'
      ],
      whatWeDo: [
        'If the engine cranks but will not start, it is missing one of three things: spark, fuel or compression. We test for each in order rather than guessing. That covers ignition components, fuel pump and pressure, injectors, crank and cam sensors, and timing.',
        'If it does not crank, we work through the starting circuit: battery condition, cable and ground integrity, the starter and its solenoid, the ignition switch, the neutral safety or clutch switch, and the anti-theft system, which can silently block starting on many vehicles.',
        'We also scan for stored codes. A no-start with a crank-sensor code is a much shorter conversation than a no-start with nothing stored.'
      ],
      warningSigns: [
        'Engine cranks normally but never fires',
        'A click or nothing at all when you turn the key',
        'The car started rough or stalled repeatedly before it quit',
        'Security or immobilizer light flashing on the dash',
        'Fuel smell while cranking',
        'It only fails to start when hot, or only when cold'
      ],
      includes: [
        'Confirming whether the fault is cranking or starting',
        'Spark, fuel-pressure and compression testing as the symptom requires',
        'Crank and cam sensor testing',
        'Starting-circuit, ignition-switch and safety-switch checks',
        'Anti-theft and immobilizer verification',
        'Code scan with live-data review during cranking'
      ],
      whyNotIgnore: [
        'A car that has started intermittently is telling you it is about to stop starting entirely, usually at the least convenient moment. Intermittent no-starts are easier to diagnose while the symptom is still happening occasionally.',
        'If the vehicle is already stranded, our roadside service can often handle the battery, starting and minor causes on the spot.'
      ],
      related: ['battery-alternator-starter', 'wiring-sensors-fuses', 'roadside-mobile-diagnostics']
    },
    {
      slug: 'wiring-sensors-fuses',
      navLabel: 'Wiring, Fuses & Sensors',
      title: 'Wiring, Fuses, Relays and Sensor Repair',
      metaTitle: 'Auto Wiring & Sensors in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Electrical gremlins, blown fuses, dead accessories or sensor faults? YBE traces automotive wiring problems in Capitol Heights, MD. Call (202) 455-3822.',
      customerVoice: 'My lights and windows stopped working for no reason.',
      problem: [
        'Electrical problems that are not the battery tend to be the strangest ones. A window that works sometimes. Dash lights that flicker over bumps. A fuse that keeps blowing. Gauges that drop to zero and come back.',
        'These faults are frustrating because they come and go, and because a part that tests fine on the bench can still fail in the car once heat, vibration and moisture are involved.'
      ],
      whatWeDo: [
        'We trace circuits rather than replace components. That means testing for voltage and ground where they are supposed to be, checking for voltage drop across connections that look fine but are corroded inside, and following the circuit until the fault shows itself.',
        'Repeatedly blown fuses get treated as a short to be located, not a fuse to be upsized. A larger fuse in a circuit that is shorting is how wiring harnesses catch fire.',
        'For sensor faults we verify the sensor, its wiring and its power and ground supply before condemning it. A large share of sensor codes turn out to be connector or wiring problems, not the sensor itself.'
      ],
      warningSigns: [
        'Accessories that work intermittently or only sometimes',
        'A fuse that blows repeatedly',
        'Dash lights or gauges flickering, especially over bumps',
        'Interior or exterior lights dimming or behaving oddly',
        'Sensor-related check-engine codes that return after part replacement',
        'A burning-plastic smell or visible melted connector'
      ],
      includes: [
        'Circuit testing for power, ground and voltage drop',
        'Short-circuit location on repeatedly blown fuses',
        'Connector, terminal and harness inspection and repair',
        'Relay and fuse-box testing',
        'Sensor verification including supply and signal wiring',
        'Repair of the wiring fault rather than replacement of the symptom'
      ],
      whyNotIgnore: [
        'Wiring faults are the one electrical problem with a fire risk. A chafed wire or a melting connector is not something to watch for a few more weeks.',
        'They also tend to spread. Corrosion travels down a wire, and a bad ground can create symptoms in several unrelated systems at once, which is why these get worse and stranger over time.'
      ],
      related: ['no-start-diagnostics', 'battery-alternator-starter', 'check-engine-light-diagnostics']
    }
  ]
};
