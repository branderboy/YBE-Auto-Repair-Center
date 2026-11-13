/**
 * SPANISH PAGES (/es/)
 *
 * Translations of the site's own English copy for the core pages: home,
 * services, roadside help, contact and FAQ. Nothing here adds a fact the
 * English site does not already state.
 *
 * Owner, 2026-11-13: the shop's staff do not speak Spanish. Every Spanish page
 * says calls are answered in English and suggests text or WhatsApp, where a
 * customer can write with a translator. Nothing claims Spanish service, and
 * business.languages stays English only.
 */

const LANG_NOTE =
  'Nuestro equipo atiende en inglés. Si le resulta más fácil, envíenos un mensaje de texto o por WhatsApp al (202) 455-3822; puede escribir con un traductor.';

const PLACE = 'Capitol Heights, MD';

/** Category pages: one per English category hub. `en` is the English URL it mirrors. */
const categories = [
  {
    slug: 'reparacion-y-diagnostico',
    en: '/services/auto-repair-diagnostics/',
    title: 'Reparación y diagnóstico de autos',
    metaTitle: 'Reparación y diagnóstico de autos en Capitol Heights, MD',
    metaDescription:
      '¿Se encendió la luz de check engine? YBE diagnostica y repara motores, sobrecalentamiento y mantenimiento en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'La mayoría de los autos avisan antes de dejarlo varado: una luz en el tablero, un ruido nuevo, un ralentí inestable o un olor que antes no estaba. Conectamos el escáner, leemos lo que guardó la computadora y lo confirmamos con pruebas directas antes de cambiar piezas.',
    services: [
      { name: 'Diagnóstico de la luz de check engine', en: '/services/auto-repair-diagnostics/check-engine-light-diagnostics/', text: 'La luz se encendió. Leemos el código y luego probamos el sistema para encontrar la causa real, no solo la pieza que nombra el código.' },
      { name: 'Reparaciones para la inspección estatal de Maryland', en: '/services/auto-repair-diagnostics/state-inspection-repairs/', text: 'No somos una estación de inspección de Maryland y no emitimos el certificado. Reparamos lo que hizo fallar la inspección para que el auto pueda volver a la estación.' },
      { name: 'Reparación de motor', en: '/services/auto-repair-diagnostics/engine-repair/', text: 'Golpeteo, fallas de encendido, fugas de aceite o pérdida de potencia. Encontramos la causa y le decimos con claridad cuándo una reparación cuesta más de lo que vale el auto.' },
      { name: 'Afinación y mantenimiento preventivo', en: '/services/auto-repair-diagnostics/tune-ups-maintenance/', text: 'Bujías, filtros, fluidos y el mantenimiento programado, con una lista de lo que urge y lo que puede esperar.' },
      { name: 'Cambio de aceite y fluidos', en: '/services/auto-repair-diagnostics/oil-change/', text: 'Aceite y filtro con una revisión por debajo del auto. Se aceptan clientes sin cita.' },
      { name: 'Sistema de enfriamiento y sobrecalentamiento', en: '/services/auto-repair-diagnostics/cooling-system-overheating/', text: 'La temperatura sube, sale vapor o hay líquido verde, naranja o rosado debajo del auto. Encontramos la fuga o la pieza que falla.' }
    ]
  },
  {
    slug: 'frenos',
    en: '/services/brake-repair/',
    title: 'Reparación de frenos',
    metaTitle: 'Reparación de frenos en Capitol Heights, MD',
    metaDescription:
      '¿Sus frenos rechinan, raspan o vibran? YBE cambia pastillas y discos, revisa calipers y líquido de frenos en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'Con los frenos, esperar nunca sale más barato. Cambiar pastillas es un gasto normal; pastillas gastadas hasta el metal significan cambiar discos, y a veces calipers. Los frenos casi siempre avisan primero.',
    services: [
      { name: 'Cambio de pastillas y discos', en: '/services/brake-repair/brake-pad-rotor-replacement/', text: 'Medimos las pastillas y los discos en las cuatro ruedas y cambiamos solo lo que lo necesita.' },
      { name: 'Ruido, vibración y jalón al frenar', en: '/services/brake-repair/brake-noise-vibration/', text: 'Cada síntoma apunta a algo distinto. El ruido que hace su auto ya nos dice gran parte de la historia.' },
      { name: 'Líquido de frenos, calipers y luz de frenos', en: '/services/brake-repair/brake-fluid-calipers/', text: 'Pedal blando, luz de frenos encendida o un caliper que se pega. Revisamos todo el sistema hidráulico.' }
    ]
  },
  {
    slug: 'transmision',
    en: '/services/transmission/',
    title: 'Servicio de transmisión',
    metaTitle: 'Servicio de transmisión en Capitol Heights, MD',
    metaDescription:
      '¿La transmisión patina o cambia tarde? YBE diagnostica, repara y reemplaza transmisiones en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'Un problema de cambios puede venir de líquido bajo o quemado, un solenoide, un sensor o un problema interno. Diagnosticamos primero, porque no toda transmisión que patina necesita reemplazo.',
    services: [
      { name: 'Reparación y diagnóstico de transmisión', en: '/services/transmission/transmission-repair/', text: 'El motor se acelera pero el auto no avanza, o el cambio llega con un golpe o tarde. Buscamos la causa real antes de hablar de reconstruir.' },
      { name: 'Reemplazo y reconstrucción de transmisión', en: '/services/transmission/transmission-replacement-rebuild/', text: 'Cuando el daño interno es real, le damos una respuesta clara sobre el costo frente al valor del auto.' },
      { name: 'Servicio de líquido y fugas de transmisión', en: '/services/transmission/transmission-fluid-leaks/', text: 'Líquido rojo o rojizo debajo del centro del auto. Unas gotas se vigilan; una mancha que crece cada noche se repara.' }
    ]
  },
  {
    slug: 'electrico-y-arranque',
    en: '/services/electrical/',
    title: 'Sistema eléctrico y de arranque',
    metaTitle: 'Reparación eléctrica y de arranque en Capitol Heights, MD',
    metaDescription:
      '¿El auto no arranca? YBE prueba baterías, alternadores y motores de arranque antes de cambiar piezas en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'Una batería muerta, un alternador que falla y un motor de arranque malo se ven igual desde el asiento del conductor. Probamos el sistema primero para cambiar solo la pieza que falló.',
    services: [
      { name: 'Batería, alternador y motor de arranque', en: '/services/electrical/battery-alternator-starter/', text: 'Un clic, un arranque lento o nada. Probamos la batería y la carga antes de cambiar algo.' },
      { name: 'Diagnóstico cuando el auto no arranca', en: '/services/electrical/no-start-diagnostics/', text: 'El motor gira pero no prende, o no gira en absoluto. Son dos problemas distintos con causas distintas.' },
      { name: 'Cables, fusibles, relés y sensores', en: '/services/electrical/wiring-sensors-fuses/', text: 'Una ventana que funciona a veces, luces que parpadean o un fusible que se quema una y otra vez.' }
    ]
  },
  {
    slug: 'llantas-alineacion-y-suspension',
    en: '/services/tires-alignment-suspension/',
    title: 'Llantas, alineación y suspensión',
    metaTitle: 'Llantas, alineación y suspensión en Capitol Heights, MD',
    metaDescription:
      '¿El auto se jala hacia un lado o golpea en los baches? YBE repara llantas, alineación y suspensión en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'Llantas, dirección y suspensión son un solo sistema conectado: un buje gastado desajusta la alineación, y una mala alineación gasta las llantas. Por eso diagnosticamos antes de cambiar la pieza más obvia.',
    services: [
      { name: 'Alineación', en: '/services/tires-alignment-suspension/wheel-alignment/', text: 'El auto se jala hacia un lado o el volante queda torcido aunque vaya derecho.' },
      { name: 'Reparación, cambio y rotación de llantas', en: '/services/tires-alignment-suspension/tire-repair-replacement/', text: 'Un clavo en la banda, una fuga lenta o llantas gastadas que ya no son seguras con lluvia.' },
      { name: 'Amortiguadores, struts y dirección', en: '/services/tires-alignment-suspension/shocks-struts-steering/', text: 'Golpes en los baches, un manejo flojo o juego en el volante.' }
    ]
  },
  {
    slug: 'aire-acondicionado-y-calefaccion',
    en: '/services/auto-ac-heating/',
    title: 'Aire acondicionado y calefacción',
    metaTitle: 'Aire acondicionado de autos en Capitol Heights, MD',
    metaDescription:
      '¿El aire acondicionado sopla caliente? YBE encuentra la fuga o la pieza que falla, no solo recarga gas, en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'El aire acondicionado es un sistema sellado. Si le falta refrigerante, se fue por algún lado y se volverá a ir. Una calefacción que sopla frío casi siempre apunta al sistema de enfriamiento.',
    services: [
      { name: 'Reparación de aire acondicionado', en: '/services/auto-ac-heating/ac-repair/', text: 'Sopla tibio en el tráfico, enfría solo en la autopista o deja de enfriar a los diez minutos.' },
      { name: 'Reparación de calefacción', en: '/services/auto-ac-heating/heating-system-repair/', text: 'El motor está caliente pero el aire no, o el desempañador no mantiene limpio el parabrisas.' }
    ]
  },
  {
    slug: 'carroceria-y-vidrios',
    en: '/services/auto-body-glass/',
    title: 'Carrocería, pintura y vidrios',
    metaTitle: 'Carrocería y pintura en Capitol Heights, MD',
    metaDescription:
      '¿Choque, abolladura o rayón? YBE repara carrocería, pintura y vidrios, y la parte mecánica también, en Capitol Heights, MD. Llame al (202) 455-3822.',
    intro:
      'Tener carrocería y mecánica bajo el mismo techo importa: un choque de frente puede afectar el radiador, los ventiladores, las luces, la alineación y la suspensión. Un solo taller revisa todo el vehículo.',
    services: [
      { name: 'Reparación de choques y carrocería', en: '/services/auto-body-glass/collision-body-repair/', text: 'Después de un choque, el daño que se ve casi nunca es todo. Revisamos lo que hay detrás de la pieza.' },
      { name: 'Abolladuras, rayones y pintura', en: '/services/auto-body-glass/dent-scratch-paint/', text: 'Golpes de estacionamiento, rayones profundos y pintura igualada al color actual de su auto.' },
      { name: 'Reparación y cambio de vidrios', en: '/services/auto-body-glass/auto-glass/', text: 'Una piedra deja una marca en el parabrisas que con el frío se convierte en una grieta.' }
    ]
  }
];

/** Roadside pages. `en` is the English page each one mirrors. */
const roadsideHub = {
  slug: 'asistencia-en-carretera',
  en: '/roadside-assistance/',
  title: 'Asistencia en carretera',
  metaTitle: 'Asistencia en carretera en Capitol Heights, MD',
  metaDescription:
    '¿Varado? YBE ofrece asistencia en carretera para baterías, llantas, llaves dentro del auto y gasolina en Capitol Heights, MD. Llame al (202) 455-3822.',
  intro: [
    'Si está varado en este momento, llamar es más rápido que cualquier otra cosa en esta página. Contestamos el teléfono del taller los siete días de la semana, de 8:30 AM a 6:00 PM.',
    'Nuestro servicio móvil, YBE Mechanic On Wheelz, va a donde está su auto en Capitol Heights, DC y el condado de Prince George’s. Baterías muertas, llantas ponchadas, llaves dentro del auto, falta de gasolina y autos que no arrancan son las llamadas más comunes, y la mayoría se resuelven donde está el vehículo.',
    'Lo que no hacemos es remolcar. Si el vehículo tiene que salir del camino, se lo diremos con honestidad para que pida una grúa en lugar de esperar una ayuda que no resolverá el problema.'
  ]
};

const roadside = [
  {
    slug: 'arranque-con-cables',
    en: '/roadside-assistance/jump-start/',
    title: 'Servicio de arranque con cables',
    metaTitle: 'Arranque con cables en Capitol Heights, MD',
    metaDescription:
      '¿Batería muerta? YBE va a donde está su auto, lo arranca y prueba la batería y el alternador en el lugar, en Capitol Heights, MD. Llame al (202) 455-3822.',
    voice: 'Mi batería está muerta y necesito que me pasen corriente.',
    problem: [
      'Gira la llave y solo escucha un clic, o las luces del tablero parpadean y se apagan. Tal vez dejó las luces prendidas, tal vez hace frío, o la batería se venía debilitando y hoy por fin se rindió.',
      'Pasar corriente lo pone en marcha, pero no le dice si la batería aguantará mañana. Por eso la revisamos en lugar de solo arrancar el auto e irnos.'
    ],
    whatWeDo: [
      'Vamos al vehículo y lo arrancamos con el equipo adecuado y en los puntos de conexión correctos. Pasar corriente de forma incorrecta puede dañar la electrónica de un auto moderno.',
      'Una vez encendido, probamos la batería y el sistema de carga en el lugar. Si la batería ya no sirve, muchas veces la podemos cambiar ahí mismo. Si el problema es el alternador, se lo decimos.'
    ],
    signs: ['Un clic o varios clics rápidos al girar la llave', 'Las luces del tablero se apagan al intentar arrancar', 'Arranque lento y forzado antes de fallar', 'Necesitó que le pasaran corriente hace poco', 'Las luces interiores se ven muy débiles o no prenden', 'La batería tiene varios años'],
    includes: ['Arranque con cables donde está su auto', 'Conexión correcta para vehículos modernos', 'Prueba de la batería en el lugar', 'Revisión del sistema de carga', 'Cambio de batería en el lugar si falló', 'Una respuesta honesta sobre si puede manejarlo'],
    note: [
      'Una batería que necesitó corriente una vez casi siempre la volverá a necesitar, y la segunda vez rara vez es en un buen lugar.',
      'Si el problema real es el alternador, el auto funcionará hasta agotar la batería y luego se apagará, a veces en pleno tráfico.'
    ]
  },
  {
    slug: 'llanta-ponchada',
    en: '/roadside-assistance/flat-tire/',
    title: 'Ayuda con llanta ponchada',
    metaTitle: 'Ayuda con llanta ponchada en Capitol Heights, MD',
    metaDescription:
      '¿Llanta ponchada? YBE le pone la llanta de repuesto donde está o revisa si se puede parchar, en Capitol Heights, MD. Llame al (202) 455-3822.',
    voice: 'Se me ponchó una llanta y estoy varado.',
    problem: [
      'Una llanta que reventó en la autopista o que amaneció baja en un estacionamiento. No tiene herramientas, no tiene repuesto útil o no es seguro arrodillarse junto al auto.',
      'Si está en el acotamiento con tráfico pasando cerca, quédese en el vehículo con el cinturón puesto y llame.'
    ],
    whatWeDo: [
      'Vamos y le ponemos la llanta de repuesto para que pueda seguir, o revisamos si la llanta se puede atender en el lugar. Muchas ponchaduras en la banda se reparan; un daño en el costado no se puede reparar con seguridad.',
      'Si su repuesto es temporal, le decimos los límites de velocidad y distancia. Si la llanta necesita cambio, lo hacemos en el taller.'
    ],
    signs: ['Un golpe fuerte y el auto se jala hacia un lado', 'Golpeteo o aleteo en una rueda', 'Luz de presión de llantas con el auto manejando raro', 'Llanta visiblemente baja o destrozada', 'Una llanta que se baja una y otra vez', 'Sin repuesto, sin gato o con el repuesto también bajo'],
    includes: ['Instalación del repuesto en el camino', 'Revisión de si la llanta se puede reparar', 'Límites de velocidad y distancia del repuesto temporal', 'Revisión de presión del repuesto instalado', 'Reparación o cambio de llanta en el taller', 'Indicaciones de seguridad si está en un lugar peligroso'],
    note: [
      'Manejar con una llanta ponchada la destruye en poca distancia y puede dañar el rin.',
      'Estar junto al auto en un acotamiento con mucho tráfico es peligroso. Si el lugar no es seguro, llame primero al 911 y después a nosotros.'
    ]
  },
  {
    slug: 'cambio-de-bateria-a-domicilio',
    en: '/roadside-assistance/mobile-battery-replacement/',
    title: 'Cambio de batería a domicilio',
    metaTitle: 'Cambio de batería a domicilio en Capitol Heights, MD',
    metaDescription:
      'YBE prueba la batería donde está su auto, instala la batería correcta en el lugar y se lleva la vieja, en Capitol Heights, MD. Llame al (202) 455-3822.',
    voice: 'Mi batería se descarga y necesito cambiarla.',
    problem: [
      'El auto arrancó con cables y dos días después volvió a fallar. O cada mañana arrancaba más lento y hoy ya no arrancó.',
      'Una batería que ya no guarda carga no se recupera. En ese punto, cambiarla donde está el auto suele ser más fácil que llevarlo al taller.'
    ],
    whatWeDo: [
      'Probamos la batería bajo carga para confirmar que falló, y probamos el sistema de carga para que un alternador malo no acabe con la batería nueva.',
      'Si la batería es el problema, la cambiamos en el lugar con la especificación correcta para su vehículo y limpiamos los bornes y cables.'
    ],
    signs: ['La batería se vuelve a descargar pocos días después', 'El arranque es más lento cada mañana', 'Luz de batería en el tablero', 'Corrosión o hinchazón en la batería', 'Accesorios eléctricos que se comportan raro', 'La batería tiene varios años'],
    includes: ['Prueba de carga en el lugar', 'Prueba del sistema de carga', 'Cambio de batería con la especificación correcta', 'Limpieza de bornes y cables', 'Revisiones eléctricas después de la instalación cuando el auto las requiere', 'Desecho de la batería vieja'],
    note: [
      'Una batería débil hace trabajar de más al motor de arranque y al alternador.',
      'Las baterías suelen pasar de “un poco lenta” a “nada” en una sola noche fría.'
    ]
  },
  {
    slug: 'entrega-de-gasolina',
    en: '/roadside-assistance/fuel-delivery/',
    title: 'Entrega de gasolina de emergencia',
    metaTitle: 'Entrega de gasolina en Capitol Heights, MD',
    metaDescription:
      '¿Se quedó sin gasolina? YBE le lleva suficiente combustible para llegar a la gasolinera, en Capitol Heights, MD. Llame al (202) 455-3822.',
    voice: 'Me quedé sin gasolina.',
    problem: [
      'El medidor era optimista, el tráfico fue peor de lo esperado o la luz de reserva llevaba mucho tiempo encendida.',
      'También les pasa a conductores cuidadosos, sobre todo cuando el medidor de gasolina no marca bien.'
    ],
    whatWeDo: [
      'Llevamos suficiente gasolina para llegar a una estación y nos aseguramos de que el vehículo arranque antes de irnos.',
      'Si no arranca después de cargar gasolina, revisamos en el lugar si pasa algo más. Quedarse sin combustible a veces revela una bomba de gasolina que ya estaba débil.'
    ],
    signs: ['El motor tosió y perdió potencia antes de apagarse', 'El medidor marca vacío o no se mueve', 'La luz de reserva llevaba rato encendida', 'El motor gira normal pero no arranca', 'El medidor marca de forma irregular', 'Arranca un momento y se vuelve a apagar'],
    includes: ['Gasolina de emergencia donde está su auto', 'Confirmación de que arranca antes de irnos', 'Revisión rápida si no arranca después de cargar', 'Orientación sobre fallas del medidor', 'Diagnóstico del sistema de combustible en el taller si hace falta', 'Indicaciones de seguridad si está detenido en el tráfico'],
    note: [
      'Andar seguido con el tanque casi vacío desgasta la bomba de gasolina, que necesita combustible para enfriarse.',
      'Si el problema es el medidor, conviene repararlo antes de que lo deje varado en un peor lugar.'
    ]
  },
  {
    slug: 'llaves-dentro-del-auto',
    en: '/roadside-assistance/car-lockout/',
    title: 'Apertura de autos con llaves adentro',
    metaTitle: 'Llaves dentro del auto en Capitol Heights, MD',
    metaDescription:
      '¿Dejó las llaves dentro del auto? YBE abre la puerta sin dañarla, en Capitol Heights, MD. Siete días a la semana. Llame al (202) 455-3822.',
    voice: 'Dejé las llaves dentro del auto.',
    problem: [
      'Las llaves están en el asiento, las puertas cerradas y usted afuera. A veces es más que una molestia: el motor encendido, compras atrás o un día de calor.',
      'Si hay un niño o una mascota encerrados en el vehículo, llame primero al 911. Es una emergencia y no debe esperar a nadie, ni siquiera a nosotros.'
    ],
    whatWeDo: [
      'Abrimos el vehículo con herramientas hechas para eso, cuidando la puerta, los empaques y el mecanismo de la ventana.',
      'Le pedimos comprobar que el vehículo es suyo antes de abrirlo. Si la cerradura, el seguro o el control remoto están fallando, lo revisamos en el taller.'
    ],
    signs: ['Llaves visibles dentro del auto cerrado', 'El control remoto ya no abre las puertas', 'Seguros que se traban o fallan a veces', 'Una puerta que no abre por dentro ni por fuera', 'El auto se cerró solo', 'Una llave rota o gastada que ya no gira'],
    includes: ['Apertura en el lugar', 'Herramientas adecuadas, cuidando puerta y empaques', 'Verificación de que el auto es suyo', 'Revisión de seguros y cerraduras después', 'Orientación sobre controles, seguros o cerraduras que fallan', 'Reparación en el taller si hace falta'],
    note: [
      'Forzar una puerta con herramientas improvisadas dobla marcos, rompe empaques y daña los elevadores de ventana. El daño suele costar más que la llamada.',
      'Si las cerraduras están fallando, la próxima vez puede quedarse afuera con las llaves en la mano.'
    ]
  },
  {
    slug: 'diagnostico-movil',
    en: '/roadside-assistance/roadside-mobile-diagnostics/',
    title: 'Diagnóstico móvil',
    metaTitle: 'Diagnóstico móvil de autos en Capitol Heights, MD',
    metaDescription:
      '¿Su auto se detuvo y no sabe por qué? YBE va, escanea los códigos y le dice si se puede manejar, en Capitol Heights, MD. Llame al (202) 455-3822.',
    voice: 'Mi auto se detuvo y no sé qué tiene.',
    problem: [
      'El auto se apagó o se encendió una luz de advertencia y no sabe si es seguro seguir manejando.',
      'Adivinar mal sale caro en las dos direcciones: manejar un motor sobrecalentado puede destruirlo, y abandonar el auto por una falla menor le cuesta un día y una grúa que no necesitaba.'
    ],
    whatWeDo: [
      'Vamos al vehículo, leemos los códigos guardados y revisamos lo que más deja varada a la gente: batería y carga, arranque, enfriamiento, combustible y fugas.',
      'En el camino el objetivo es una decisión: ¿se arregla aquí, se puede manejar al taller o no se debe manejar? Si se puede reparar en el lugar, muchas veces lo hacemos.'
    ],
    signs: ['El auto se apagó sin explicación', 'Se encendió una luz y no sabe si es seguro manejar', 'La temperatura sube a la zona roja', 'Ruidos, olores o humo nuevos', 'El auto funciona pero claramente algo anda mal', 'Arrancó, se apagó y ya no vuelve a arrancar'],
    includes: ['Escaneo de códigos y datos en vivo en el lugar', 'Prueba de batería, carga y arranque', 'Revisión del enfriamiento y de fugas', 'Revisión básica del combustible cuando el síntoma apunta ahí', 'Una respuesta clara: se puede manejar o no', 'Reparación en el lugar cuando la falla lo permite'],
    note: [
      'El error más caro en el camino es manejar un auto que debió apagarse, sobre todo con el motor sobrecalentado o con la luz de presión de aceite.',
      'Saber qué tiene también evita pagar por mover un vehículo que se podía reparar donde estaba.'
    ]
  },
  {
    slug: 'reparaciones-menores-a-domicilio',
    en: '/roadside-assistance/roadside-mobile-repairs/',
    title: 'Reparaciones menores a domicilio',
    metaTitle: 'Reparaciones menores a domicilio en Capitol Heights, MD',
    metaDescription:
      'Algunas fallas se arreglan donde está el auto. YBE hace reparaciones menores a domicilio en Capitol Heights, MD. Siete días. Llame al (202) 455-3822.',
    voice: '¿Lo pueden arreglar aquí sin mover el auto?',
    problem: [
      'No toda falla termina con el auto arriba de una grúa. Muchas llamadas son por problemas que se reparan en un estacionamiento o en la entrada de la casa en menos de una hora.',
      'Baterías, cables, conexiones, bandas, mangueras, fusibles y fallas eléctricas simples dejan varada a la gente y muchas veces se arreglan en el lugar.'
    ],
    whatWeDo: [
      'Diagnosticamos primero para que la reparación ataque la falla real, y luego hacemos lo que se puede hacer de forma razonable y segura donde está el vehículo.',
      'Cuando un trabajo no se debe hacer en el camino, se lo decimos. Algunos trabajos necesitan un elevador o equipo especial.'
    ],
    signs: ['El auto se detuvo pero la falla parece pequeña y específica', 'Una banda se rompió o se salió', 'Una manguera pierde anticongelante', 'Un sistema dejó de funcionar de repente', 'Se quemó un fusible y el auto no arranca', 'Un cable o conexión de la batería está corroído o flojo'],
    includes: ['Diagnóstico en el lugar antes de cambiar piezas', 'Reparación de batería, cables y conexiones', 'Cambio de fusibles y relés', 'Reparación de bandas y mangueras cuando la situación lo permite', 'Reparación de fallas eléctricas menores', 'Una respuesta clara cuando un trabajo no debe hacerse en el camino'],
    note: [
      'Un arreglo temporal en el camino es solo eso. Si lo reparamos para que llegue a casa, termine el trabajo en el taller.',
      'Una banda que patina o una manguera que gotea casi siempre vuelven a fallar, y normalmente más lejos de casa.'
    ]
  },
  {
    slug: 'compra-de-autos-chatarra',
    en: '/roadside-assistance/junk-car-pickup/',
    calm: true,
    title: 'Recogemos autos chatarra',
    metaTitle: 'Compramos autos chatarra en Capitol Heights, MD',
    metaDescription:
      'YBE paga en efectivo por autos chatarra y los recoge, funcionen o no, en Capitol Heights, MD y alrededores. Llame al (202) 455-3822 para una oferta.',
    voice: 'Tengo un auto que ya no vale la pena arreglar. ¿Me lo compran?',
    problem: [
      'Algunos autos llegan al punto en que la reparación cuesta más de lo que vale el auto. Otros llevan años parados con llantas bajas y la batería muerta.',
      'Aun así, el auto tiene valor como metal y piezas, y deshacerse de él no debería tomarle un fin de semana de llamadas.'
    ],
    whatWeDo: [
      'YBE paga en efectivo por autos chatarra y los recoge, funcionen o no. Llame con el año, la marca, el modelo y el estado, y le damos una oferta antes de ir.',
      'Si el auto todavía vale la pena repararlo, se lo diremos.'
    ],
    signs: ['La reparación cuesta más de lo que vale el auto', 'El auto lleva tiempo parado y ya no funciona', 'No pasó la inspección y no vale la pena arreglarlo', 'Necesita recuperar el espacio de estacionamiento', 'Llantas bajas y batería muerta por estar parado', 'Ya reemplazó el auto'],
    includes: ['Una oferta en efectivo según el auto que describa', 'Recogemos autos que funcionan y que no funcionan', 'Una respuesta honesta si conviene repararlo', 'Ayuda para saber qué necesita, como el título'],
    note: [
      'Un auto parado pierde valor: las llantas se pudren, los fluidos gotean y los roedores dañan los cables.',
      'Tenga el título a la mano si puede. La mayoría de los compradores pagan menos sin título, y un título de Maryland perdido se puede reponer en la MVA.'
    ]
  }
];

/** The site FAQs, translated in the same order as src/data/trust.js. */
const faqs = [
  { q: '¿YBE atiende sin cita?', a: 'Sí. Se aceptan clientes sin cita, aunque llamar antes o pedir una cita nos ayuda a atender su vehículo más rápido, sobre todo los fines de semana.' },
  { q: '¿YBE abre los domingos?', a: 'Sí. Abrimos los siete días de la semana, de 8:30 AM a 6:00 PM, incluidos sábado y domingo.' },
  { q: '¿Dónde está el taller?', a: 'Estamos en 8632 Edgeworth Dr, Capitol Heights, MD 20743, cerca del corredor de Central Avenue y a poca distancia de la línea de DC.' },
  { q: '¿Puedo enviar un mensaje de texto en lugar de llamar?', a: 'Sí. Puede escribir o llamar al (202) 455-3822, y también por WhatsApp. Nuestro equipo atiende en inglés; por mensaje puede escribir con un traductor.' },
  { q: '¿YBE ofrece asistencia en carretera?', a: 'Sí. Ofrecemos asistencia móvil para pasar corriente, llantas ponchadas, cambio de batería, entrega de gasolina, llaves dentro del auto, diagnóstico móvil y algunas reparaciones menores en Capitol Heights y comunidades cercanas.' },
  { q: '¿YBE ofrece servicio de grúa?', a: 'No. YBE ofrece asistencia en carretera pero no servicio de grúa. Si su vehículo necesita grúa, se lo diremos directamente para que la pida y no espere una ayuda que no resolverá el problema.' },
  { q: '¿YBE hace trabajos de carrocería además de mecánica?', a: 'Sí. Reparamos choques, abolladuras, rayones, paneles y pintura, además de la mecánica. Tener ambos bajo el mismo techo significa que una reparación que involucra más de un sistema se resuelve en un solo lugar.' },
  { q: '¿Cuánto tiempo tiene YBE en el negocio?', a: 'YBE Auto Repair Center abrió en febrero de 2006 y ha servido a la zona de Capitol Heights desde entonces.' },
  { q: '¿Necesito cita para la asistencia en carretera?', a: 'No. Si está varado, llámenos directamente al (202) 455-3822. Llamar siempre es más rápido que llenar un formulario cuando está detenido al lado del camino.' },
  { q: '¿Hay estacionamiento accesible en el taller?', a: 'Sí, el taller tiene estacionamiento accesible para sillas de ruedas.' }
];

const home = {
  url: '/es/',
  en: '/',
  title: 'Taller mecánico en Capitol Heights, MD',
  metaTitle: 'Taller mecánico y reparación de autos en Capitol Heights, MD',
  metaDescription:
    '¿Su auto no arranca? Taller mecánico en Capitol Heights, MD desde 2006: frenos, transmisión, carrocería y asistencia en carretera. Llame al (202) 455-3822.',
  slogan: 'Reparación de autos que lo devuelve al camino',
  intro:
    'Reparaciones mecánicas, diagnóstico, mantenimiento, carrocería y asistencia en carretera de un taller de confianza en Capitol Heights, al servicio de la comunidad desde 2006. Somos un negocio de propietarios afroamericanos, abierto los siete días de la semana.'
};

const contact = {
  url: '/es/contacto/',
  en: '/contact/',
  title: 'Contacto y cómo llegar',
  metaTitle: 'Contacto y cómo llegar a YBE en Capitol Heights, MD',
  metaDescription:
    'YBE Auto Repair Center está en 8632 Edgeworth Dr, Capitol Heights, MD 20743. Abierto de 8:30 AM a 6:00 PM, siete días. Llame o escriba al (202) 455-3822.'
};

const faqPage = {
  url: '/es/preguntas-frecuentes/',
  en: '/faq/',
  title: 'Preguntas frecuentes',
  metaTitle: 'Preguntas frecuentes sobre YBE en Capitol Heights, MD',
  metaDescription:
    'Horario, clientes sin cita, mensajes de texto, asistencia en carretera, grúa y carrocería en YBE Auto Repair Center, Capitol Heights, MD. Llame al (202) 455-3822.'
};

const servicesHub = {
  url: '/es/servicios/',
  en: '/services/',
  title: 'Servicios de reparación de autos',
  metaTitle: 'Servicios de reparación de autos en Capitol Heights, MD',
  metaDescription:
    'Diagnóstico, frenos, transmisión, sistema eléctrico, llantas, aire acondicionado y carrocería en un solo taller en Capitol Heights, MD. Llame al (202) 455-3822.'
};

categories.forEach((c) => { c.url = `/es/servicios/${c.slug}/`; });
roadsideHub.url = `/es/${roadsideHub.slug}/`;
roadside.forEach((r) => { r.url = `/es/${roadsideHub.slug}/${r.slug}/`; });

/** English URL -> Spanish URL, for hreflang on both sides and the language switch. */
const EN_TO_ES = Object.fromEntries(
  [home, servicesHub, contact, faqPage, roadsideHub, ...categories, ...roadside].map((p) => [p.en, p.url])
);
const ES_TO_EN = Object.fromEntries(Object.entries(EN_TO_ES).map(([en, es]) => [es, en]));

module.exports = { LANG_NOTE, PLACE, categories, roadsideHub, roadside, faqs, home, contact, faqPage, servicesHub, EN_TO_ES, ES_TO_EN };
