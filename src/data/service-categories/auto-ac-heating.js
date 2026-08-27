module.exports = {
  slug: 'auto-ac-heating',
  navLabel: 'A/C & Heating',
  title: 'Auto A/C and Heating',
  icon: 'wind',
  metaTitle: 'Car A/C & Heating Repair in Capitol Heights, MD | YBE Auto',
  metaDescription:
    'A/C blowing warm or heater blowing cold? YBE diagnoses and repairs vehicle air conditioning and heating in Capitol Heights, MD. Call (202) 455-3822.',
  blurb:
    'A/C diagnostics, refrigerant service, compressors, condensers, blower motors, and vehicle heating.',
  intro: [
    'Air conditioning is a sealed system. That is the most important thing to understand about it, because it explains why "it just needs a recharge" is usually not the whole story. If the refrigerant is low, it went somewhere, and it will go there again.',
    'Heating problems are related but different. A heater that blows cold usually points at the cooling system: low coolant, a stuck thermostat or a restricted heater core.',
    'We test both systems properly, find where the performance is being lost, and repair the cause rather than topping it up and sending you back out into a DC summer.'
  ],
  covers: [
    'A/C performance diagnostics',
    'Refrigerant leak detection and service',
    'Compressors and clutches',
    'Condensers and evaporators',
    'Blower motors and controls',
    'Heating-system repair'
  ],
  services: [
    {
      slug: 'ac-repair',
      navLabel: 'A/C Repair',
      title: 'Auto Air Conditioning Repair',
      metaTitle: 'Car A/C Repair in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Car A/C blowing warm air? YBE finds the leak or failure instead of just recharging it. Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
      customerVoice: 'My A/C is blowing warm.',
      problem: [
        'It worked last summer. Now the air coming out is cool at best, or plain warm in traffic and only cold on the highway. Maybe it blows cold for ten minutes and then quits, or you hear the compressor clicking on and off more than it used to.',
        'Each of those patterns points somewhere different, which is why we ask about them. Cold on the highway and warm at idle is a different fault than cold for ten minutes and then nothing.'
      ],
      whatWeDo: [
        'We measure system pressures on both the high and low side and compare them against what they should be for the outside temperature. Those two numbers together tell us a great deal before we open anything.',
        'If the system is low, we look for the leak rather than just refilling it. That means checking for the oil residue that marks a leak point, and using dye or an electronic detector where the leak is not visible. Common spots are condensers, hoses, seals and the compressor shaft.',
        'We also check the parts that are not refrigerant related: cooling fans, the compressor clutch and its electrical circuit, cabin filter restriction and blend-door operation. Plenty of "bad A/C" complaints turn out to be a clogged cabin filter or a fan that is not coming on.'
      ],
      warningSigns: [
        'Air that is cool but not cold, or warm at idle and cold when moving',
        'A/C works briefly and then blows warm',
        'Compressor cycling on and off rapidly',
        'Weak airflow even at the highest fan setting',
        'A musty smell when the A/C first comes on',
        'Water pooling on the passenger floor'
      ],
      includes: [
        'High and low side pressure testing against ambient temperature',
        'Leak detection using dye or electronic detection',
        'Compressor, clutch and electrical-circuit testing',
        'Condenser, cooling-fan and airflow inspection',
        'Cabin air filter and blend-door check',
        'Evacuate, repair the cause, and recharge to the correct capacity'
      ],
      whyNotIgnore: [
        'Refrigerant carries the oil that lubricates the compressor. Running a system that is low on refrigerant starves the compressor, and a seized compressor can send debris through the whole system, turning a hose repair into a much larger one.',
        'Leaks also get worse with time and vibration. The seal that is losing refrigerant slowly in June is usually losing it faster by August.'
      ],
      related: ['heating-system-repair', 'cooling-system-overheating', 'wiring-sensors-fuses']
    },
    {
      slug: 'heating-system-repair',
      navLabel: 'Heater Repair',
      title: 'Vehicle Heating System Repair',
      metaTitle: 'Car Heater Repair in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Heater blowing cold or defroster not working? YBE repairs heater cores, thermostats and blower motors in Capitol Heights, MD. Call (202) 455-3822.',
      customerVoice: 'My heat is blowing cold air.',
      problem: [
        'The engine is warm but the air from the vents is not. Or you get heat on one side and cold on the other, or heat that only shows up once you are moving, or a defroster that cannot keep the windshield clear.',
        'A heater that will not heat is often the first visible sign of a cooling-system problem, which makes it worth checking properly rather than living with a cold car all winter.'
      ],
      whatWeDo: [
        'We start with the cooling system, because your heater runs on engine coolant. Low coolant, a thermostat stuck open, or air trapped in the system will all produce a heater that blows cold while the engine appears to run normally.',
        'If the coolant side checks out, we look at the heater core and the controls: whether the core is flowing or restricted, whether the blend door is actually moving, and whether the blower motor and its resistor are working across all speeds.',
        'A blower that works only on the highest setting is a specific and common fault, and it is usually a straightforward repair.'
      ],
      warningSigns: [
        'Air stays cold even after the engine reaches operating temperature',
        'Heat on one side of the vehicle and cold on the other',
        'Blower works only on the highest setting, or not at all',
        'Windows fogging that the defroster cannot clear',
        'A sweet smell inside the cabin, or a greasy film on the windshield',
        'Coolant level dropping with no visible external leak'
      ],
      includes: [
        'Coolant level, condition and circulation check',
        'Thermostat operation testing',
        'Heater core flow assessment',
        'Blend-door and control verification',
        'Blower motor and resistor testing across all speeds',
        'Repair of the confirmed cause and heat-output verification'
      ],
      whyNotIgnore: [
        'A sweet smell or fogging windshield can mean the heater core is leaking coolant into the cabin. That is worth addressing quickly, both for the cooling system and for what you are breathing.',
        'A defroster that cannot clear the windshield is a visibility problem, and low coolant behind a cold heater can become an overheating problem the moment the weather turns.'
      ],
      related: ['ac-repair', 'cooling-system-overheating', 'engine-repair']
    }
  ]
};
