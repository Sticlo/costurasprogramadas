import { WHATSAPP_NUMBER } from './products';

export interface SolutionPoint {
  title: string;
  text: string;
}

export interface Solution {
  slug: string;
  /** Problem as the customer would type it in Google. */
  problem: string;
  /** Natural-language question answered by `answer`. */
  question: string;
  /** Short line used in lists and cards. */
  teaser: string;
  /** Direct 2–3 sentence answer; first thing search engines and AI assistants read. */
  answer: string;
  /** Other ways people search for the same problem. */
  searches: string[];
  pointsTitle: string;
  points: SolutionPoint[];
  stepsTitle: string;
  steps: string[];
  whenTitle?: string;
  whenToCall: string;
  /** Overrides for the side help card when the guide is not about a fault. */
  help?: { title: string; text: string };
  /** Catalog slugs that solve the problem for good. */
  products: string[];
  seoTitle: string;
  seoDescription: string;
}

const CAUSES = '¿Cuáles son las causas y cómo se resuelven?';
const TRY_FIRST = '¿Qué puede probar antes de llevarla al técnico?';
export const DEFAULT_WHEN_TITLE = '¿Cuándo es mejor llevarla al técnico?';

export const SOLUTIONS: Solution[] = [
  {
    slug: 'maquina-no-traspasa-dril-tela-gruesa',
    problem: 'Mi máquina de coser no traspasa el dril o la tela gruesa',
    question: '¿Por qué mi máquina de coser no traspasa el dril o la tela gruesa?',
    teaser: 'Se frena, parte agujas o no sube en las costuras dobles del jean.',
    answer:
      'Casi siempre es la aguja: para dril y jean necesita una aguja nueva tipo jean, calibre 100/16 o 110/18, y un hilo más grueso. Si con la aguja correcta la máquina se sigue frenando en las costuras dobles, no tiene la fuerza para ese material: una máquina familiar no está hecha para coser dril todos los días, una plana industrial sí.',
    searches: [
      'mi máquina no cose jean',
      'la máquina no pasa las costuras gruesas',
      'máquina de coser se traba con tela gruesa',
      'qué aguja usar para dril',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Aguja muy delgada o gastada',
        text: 'Una aguja 80/12 o 90/14 se dobla con el dril. Cámbiela por una aguja tipo jean 100/16 o 110/18; en industrial, del sistema que use su máquina.',
      },
      {
        title: 'Hilo que no corresponde',
        text: 'Use hilo para jean o poliéster grueso, de buena calidad, y el mismo tipo arriba y en la bobina.',
      },
      {
        title: 'Costuras cruzadas muy altas',
        text: 'En botas y pretinas el prensatelas queda inclinado y la tela no avanza. Nivélelo con un retazo doblado detrás del prensatelas y cosa despacio.',
      },
      {
        title: 'Falta de fuerza en la máquina',
        text: 'Las máquinas familiares tienen motores pequeños. Si cose dril a diario, lo indicado es una plana industrial con motor de buena potencia.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Cambie la aguja por una nueva tipo jean 100/16 o 110/18.',
      'Use hilo para jean o poliéster grueso, igual arriba y abajo.',
      'Alargue la puntada entre 3 y 4 mm.',
      'En las partes más gruesas cosa despacio y ayúdese girando el volante con la mano.',
      'Ponga un retazo doblado detrás del prensatelas para subir las costuras cruzadas.',
    ],
    whenToCall:
      'Si la aguja se sigue partiendo, el volante queda duro o la máquina suena forzada, puede estar desajustada. La revisamos y, si su trabajo es dril todos los días, le orientamos hacia la plana industrial adecuada.',
    products: ['plana-mecatronica-ks8800dh', 'plana-electronica-jack-a4c'],
    seoTitle: '¿Su máquina no traspasa el dril o la tela gruesa? Causas y solución',
    seoDescription:
      'Por qué la máquina de coser no pasa el dril o el jean: aguja, hilo, costuras gruesas o falta de fuerza. Soluciones fáciles y servicio técnico en Bogotá.',
  },
  {
    slug: 'maquina-salta-puntadas',
    problem: 'Mi máquina de coser salta puntadas',
    question: '¿Por qué mi máquina de coser salta puntadas?',
    teaser: 'La costura queda con huecos o puntadas que no se forman.',
    answer:
      'La causa más común es la aguja: gastada, doblada, mal puesta o del tipo equivocado para la tela. En licra y tejido de punto se usa aguja de punta bola. Si con una aguja nueva y bien puesta sigue saltando, la máquina probablemente está descalibrada y necesita servicio técnico.',
    searches: [
      'máquina de coser se salta puntadas',
      'la máquina no hace bien la puntada',
      'máquina salta puntadas en licra',
      'por qué mi máquina deja huecos en la costura',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Aguja gastada o doblada',
        text: 'Una aguja con la punta dañada no alcanza a formar la puntada. Cámbiela: es lo más barato y lo que más fallas resuelve.',
      },
      {
        title: 'Aguja mal instalada',
        text: 'Debe entrar hasta el tope y en la posición que indica el manual de su máquina. Unos milímetros de diferencia bastan para que salte.',
      },
      {
        title: 'Aguja equivocada para la tela',
        text: 'En licra, jersey y ropa deportiva use aguja de punta bola o stretch. La aguja normal atraviesa el tejido y se salta puntadas.',
      },
      {
        title: 'Máquina descalibrada',
        text: 'Si el gancho o la barra de aguja perdieron su punto, la puntada falla aunque todo lo demás esté bien. Esto lo ajusta un técnico.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Ponga una aguja nueva del grosor adecuado para su tela.',
      'Insértela hasta el tope y en la posición correcta.',
      'Vuelva a enhebrar todo con el prensatelas arriba.',
      'Si cose licra o tejido de punto, use aguja de punta bola.',
      'Pruebe en un retazo de la misma tela antes de seguir.',
    ],
    whenToCall:
      'Si con aguja nueva, bien puesta y del tipo correcto sigue saltando, la máquina necesita calibración. No intente mover el gancho sin experiencia: tráigala y la dejamos cosiendo como debe.',
    products: ['recubridora-plana-pegasus-w600pc', 'collarin-mecatronica-kingter-kt500-02-ddi'],
    seoTitle: '¿Su máquina de coser salta puntadas? Causas y cómo solucionarlo',
    seoDescription:
      'Por qué la máquina de coser salta puntadas: aguja gastada, mal puesta o equivocada para la tela, o máquina descalibrada. Solución y servicio técnico en Bogotá.',
  },
  {
    slug: 'se-revienta-el-hilo-maquina-de-coser',
    problem: 'Se me revienta el hilo de la máquina de coser',
    question: '¿Por qué se revienta el hilo de la máquina de coser?',
    teaser: 'El hilo de arriba se rompe a cada rato mientras cose.',
    answer:
      'Normalmente es la tensión superior demasiado alta, un enhebrado incorrecto o un hilo de mala calidad. También pasa cuando la aguja es muy delgada para el hilo o tiene una rebaba. Reenhebre con el prensatelas arriba, baje un poco la tensión y cambie la aguja.',
    searches: [
      'se rompe el hilo de la máquina de coser',
      'el hilo de arriba se revienta',
      'por qué se corta el hilo al coser',
      'máquina industrial revienta hilo',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Tensión superior muy alta',
        text: 'Si la perilla está muy apretada el hilo trabaja forzado y se rompe. Bájela de a un número y pruebe.',
      },
      {
        title: 'Enhebrado incorrecto',
        text: 'Un hilo que se saltó una guía o se enredó en el carrete se frena y se revienta. Enhebre todo de nuevo, paso a paso.',
      },
      {
        title: 'Hilo viejo o de mala calidad',
        text: 'El hilo reseco o muy barato tiene partes débiles. Pruebe con otro cono de buena calidad.',
      },
      {
        title: 'Aguja o piezas con rebaba',
        text: 'Una aguja muy delgada para el hilo, o una rebaba en la aguja, la placa o el gancho, corta el hilo en el mismo punto.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Suba el prensatelas y enhebre la máquina completa otra vez.',
      'Baje la tensión superior un número y cosa un retazo.',
      'Cambie la aguja por una nueva, un calibre más grueso si el hilo es grueso.',
      'Pruebe con otro cono de hilo de buena calidad.',
      'Verifique que el hilo salga libre del carrete o del portaconos.',
    ],
    whenToCall:
      'Si el hilo se revienta siempre en el mismo punto o sale deshilachado, hay una rebaba en el gancho o en la placa. Se pule o se cambia la pieza; tenemos repuestos y servicio técnico.',
    products: [],
    seoTitle: '¿Se le revienta el hilo de la máquina de coser? Causas y solución',
    seoDescription:
      'Por qué se revienta el hilo de la máquina de coser: tensión alta, mal enhebrado, hilo de mala calidad o rebabas. Pasos sencillos y servicio técnico en Bogotá.',
  },
  {
    slug: 'maquina-hace-nudos-hilo-debajo-de-la-tela',
    problem: 'Mi máquina hace nudos o un nido de hilo por debajo de la tela',
    question: '¿Por qué mi máquina hace nudos de hilo por debajo de la tela?',
    teaser: 'Por debajo queda una bola de hilo enredado.',
    answer:
      'Aunque el enredo aparece abajo, casi siempre el problema está arriba: el hilo superior no quedó dentro del disco de tensión. Esto pasa cuando se enhebra con el prensatelas abajo. Suba el prensatelas, enhebre de nuevo y el problema suele desaparecer.',
    searches: [
      'la máquina hace bolas de hilo abajo',
      'se enreda el hilo debajo de la tela',
      'máquina de coser hace nudos por debajo',
      'el hilo de abajo se enreda',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Enhebrado superior sin tensión',
        text: 'Con el prensatelas abajo los discos de tensión quedan cerrados y el hilo no entra. Siempre enhebre con el prensatelas arriba.',
      },
      {
        title: 'Bobina mal puesta',
        text: 'Si la bobina gira al revés o no es del modelo de su máquina, el hilo inferior sale flojo y se enreda.',
      },
      {
        title: 'Arranque sin sujetar los hilos',
        text: 'En las primeras puntadas sostenga los dos hilos hacia atrás para que no se metan debajo de la placa.',
      },
      {
        title: 'Pelusa acumulada',
        text: 'La mota bajo la placa y en la caja bobina altera la tensión. Límpiela con una brocha.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Suba el prensatelas y enhebre de nuevo el hilo superior.',
      'Saque la bobina y vuelva a ponerla en el sentido correcto.',
      'Use bobinas del modelo exacto de su máquina.',
      'Limpie la pelusa debajo de la placa.',
      'Sujete los dos hilos hacia atrás al empezar a coser.',
    ],
    whenToCall:
      'Si después de reenhebrar y limpiar sigue enredando, puede estar dañada la tensión de la caja bobina o el gancho. Lo revisamos y le cambiamos la pieza si hace falta.',
    products: [],
    seoTitle: '¿Su máquina hace nudos de hilo por debajo de la tela? Solución',
    seoDescription:
      'Por qué la máquina de coser hace nidos de hilo por debajo: enhebrado sin tensión, bobina mal puesta o pelusa. Cómo solucionarlo paso a paso.',
  },
  {
    slug: 'se-parte-la-aguja-maquina-de-coser',
    problem: 'Se me parte la aguja de la máquina de coser',
    question: '¿Por qué se parte la aguja de la máquina de coser?',
    teaser: 'Las agujas se doblan o se quiebran mientras cose.',
    answer:
      'La aguja se parte cuando es demasiado delgada para la tela, cuando se jala la tela mientras cose (la aguja se dobla y golpea la placa) o cuando la aguja o el prensatelas están mal puestos. Use el calibre correcto y deje que la máquina arrastre la tela sola.',
    searches: [
      'por qué se rompe la aguja de la máquina',
      'se quiebran las agujas al coser',
      'la aguja golpea la placa',
      'se parte la aguja con jean',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Jalar o empujar la tela',
        text: 'Al jalar la tela la aguja se dobla y choca con la placa. Guíe la tela con suavidad y deje que los dientes la lleven.',
      },
      {
        title: 'Aguja muy delgada',
        text: 'Para dril, jean o lona use calibre 100/16 o 110/18. Una aguja fina no aguanta ese material.',
      },
      {
        title: 'Aguja floja o mal puesta',
        text: 'Si el tornillo no está firme la aguja baja torcida. Apriételo bien después de ponerla hasta el tope.',
      },
      {
        title: 'Prensatelas o alfileres',
        text: 'Coser zigzag con prensatelas de puntada recta, o pasar por encima de alfileres, rompe la aguja al instante.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Use una aguja nueva del calibre correcto para su tela.',
      'Póngala hasta el tope y apriete bien el tornillo.',
      'Revise que el prensatelas sea el adecuado para la puntada.',
      'Retire los alfileres antes de que lleguen a la aguja.',
      'No jale la tela: solo guíela.',
    ],
    whenToCall:
      'Si la aguja se parte aun con el calibre correcto y sin jalar la tela, la barra de aguja o el gancho están desajustados. Tráigala antes de que se dañe la placa o el gancho.',
    products: ['plana-mecatronica-ks8800dh'],
    seoTitle: '¿Se le parte la aguja de la máquina de coser? Causas y solución',
    seoDescription:
      'Por qué se parte la aguja de la máquina de coser: calibre incorrecto, jalar la tela, aguja floja o prensatelas equivocado. Soluciones y servicio técnico en Bogotá.',
  },
  {
    slug: 'fileteadora-no-corta-bien',
    problem: 'Mi fileteadora no corta bien o deja la orilla con hilachas',
    question: '¿Por qué mi fileteadora no corta bien o deja hilachas?',
    teaser: 'La cuchilla mastica la tela o el filete queda desigual.',
    answer:
      'Lo más común es que las cuchillas estén desafiladas o desalineadas; la cuchilla inferior se gasta con el uso y se debe cambiar. Si el corte está bien pero el filete queda flojo o con bucles, el problema son las tensiones de los hilos de los lazadores.',
    searches: [
      'la fileteadora no corta la tela',
      'fileteadora deja hilachas',
      'cambiar cuchilla de fileteadora',
      'fileteadora hace bucles en la orilla',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Cuchillas gastadas',
        text: 'Con el tiempo pierden el filo y empiezan a masticar la tela. La cuchilla inferior es un repuesto de cambio frecuente.',
      },
      {
        title: 'Cuchilla superior mal ajustada',
        text: 'Si no baja completa o no roza bien con la inferior, el corte queda disparejo.',
      },
      {
        title: 'Pelusa bajo la placa',
        text: 'La mota acumulada frena el corte y el arrastre. Limpie cada vez que cambie de trabajo.',
      },
      {
        title: 'Tensiones desbalanceadas',
        text: 'Si los lazadores quedan flojos aparecen bucles en la orilla. Ajuste de a poco y pruebe en un retazo.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Desconecte la máquina y limpie la pelusa bajo la placa.',
      'Verifique que la cuchilla superior baje por completo.',
      'Pruebe en un retazo de la misma tela.',
      'Ajuste las tensiones de los lazadores de a medio número.',
      'Aceite los puntos que indica el manual.',
    ],
    whenToCall:
      'Si el corte sigue malo con la máquina limpia, hay que cambiar o afilar las cuchillas y revisar los lazadores. Tenemos repuestos y servicio técnico para fileteadoras.',
    products: [
      'fileteadora-electronica-jack-c5c-5-03',
      'fileteadora-kansew-ks504',
      'fileteadora-mecatronica-union-una-5',
    ],
    seoTitle: '¿Su fileteadora no corta bien o deja hilachas? Causas y solución',
    seoDescription:
      'Por qué la fileteadora no corta bien: cuchillas gastadas o desalineadas, pelusa o tensiones de lazadores. Repuestos y servicio técnico de fileteadoras en Bogotá.',
  },
  {
    slug: 'costura-queda-fruncida-o-arrugada',
    problem: 'La costura me queda fruncida o arrugada',
    question: '¿Por qué la costura queda fruncida o arrugada?',
    teaser: 'La tela se encoge o hace ondas a lo largo de la costura.',
    answer:
      'Suele ser la tensión del hilo demasiado alta, una puntada muy corta o una aguja e hilo muy gruesos para una tela delgada. Baje un poco la tensión, alargue la puntada y use una aguja fina, 70/10 u 80/12.',
    searches: [
      'la costura se frunce',
      'la tela se arruga al coser',
      'costura ondulada en tela delgada',
      'máquina de coser arruga la tela',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Tensión muy alta',
        text: 'El hilo apretado encoge la tela. Bájela de a un número hasta que la costura quede plana.',
      },
      {
        title: 'Puntada muy corta',
        text: 'En telas delgadas muchas puntadas juntas recogen la tela. Alargue la puntada a 2,5 o 3 mm.',
      },
      {
        title: 'Aguja o hilo muy gruesos',
        text: 'Para seda, chifón o dacrón use aguja 70/10 u 80/12 e hilo fino.',
      },
      {
        title: 'Presión del prensatelas',
        text: 'Una presión excesiva estira la tela de abajo. Si su máquina lo permite, bájela un poco.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Baje la tensión superior un número.',
      'Alargue la puntada.',
      'Cambie a una aguja fina y un hilo delgado.',
      'Guíe la tela sin jalarla ni frenarla.',
      'En telas muy finas, cosa sobre una tira de papel y retírela después.',
    ],
    whenToCall:
      'Si la costura sigue fruncida con todo bien ajustado, puede haber un problema en el arrastre de la máquina. La revisamos y, para producción en telas finas, le recomendamos la plana adecuada.',
    products: ['plana-electronica-jack-a4c'],
    seoTitle: '¿La costura le queda fruncida o arrugada? Causas y solución',
    seoDescription:
      'Por qué la costura se frunce o arruga la tela: tensión alta, puntada corta, aguja gruesa o presión del prensatelas. Cómo corregirlo paso a paso.',
  },
  {
    slug: 'maquina-no-arrastra-la-tela',
    problem: 'Mi máquina de coser no arrastra ni avanza la tela',
    question: '¿Por qué mi máquina de coser no arrastra la tela?',
    teaser: 'La aguja sube y baja, pero la tela se queda en el mismo sitio.',
    answer:
      'Revise tres cosas: que el prensatelas esté abajo, que el largo de puntada no esté en cero y que los dientes no estén bajados (modo zurcido o bordado libre). Si todo está bien, limpie la pelusa acumulada entre los dientes.',
    searches: [
      'la máquina de coser no avanza',
      'la tela no corre en la máquina',
      'la máquina cose en el mismo punto',
      'los dientes de la máquina no mueven la tela',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Prensatelas arriba',
        text: 'Sin el prensatelas abajo los dientes no tienen contra qué empujar la tela.',
      },
      {
        title: 'Largo de puntada en cero',
        text: 'Con el largo en cero la máquina cose siempre en el mismo punto. Póngalo entre 2,5 y 3.',
      },
      {
        title: 'Dientes bajados',
        text: 'Muchas máquinas tienen una palanca para bajar los dientes. Súbala y gire el volante para que vuelvan a salir.',
      },
      {
        title: 'Pelusa entre los dientes',
        text: 'La mota compacta rellena los dientes y dejan de agarrar. Retire la placa y límpielos.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Baje el prensatelas antes de coser.',
      'Ponga el largo de puntada entre 2,5 y 3.',
      'Suba los dientes con la palanca y gire el volante una vuelta.',
      'Retire la placa y limpie la pelusa.',
      'No frene la tela con la mano mientras cose.',
    ],
    whenToCall:
      'Si los dientes no suben o se mueven sin avanzar la tela, el mecanismo de arrastre necesita ajuste. Lo revisamos en el taller.',
    products: [],
    seoTitle: '¿Su máquina de coser no arrastra la tela? Causas y solución',
    seoDescription:
      'Por qué la máquina de coser no avanza la tela: prensatelas arriba, largo de puntada en cero, dientes bajados o pelusa. Solución rápida paso a paso.',
  },
  {
    slug: 'maquina-dura-pesada-o-ruidosa',
    problem: 'Mi máquina de coser está dura, pesada o hace mucho ruido',
    question: '¿Por qué mi máquina de coser está dura o hace ruido?',
    teaser: 'Cuesta moverla, suena a golpes o se calienta.',
    answer:
      'Casi siempre es falta de limpieza y lubricación: pelusa acumulada y aceite viejo o seco. Una máquina que estuvo guardada mucho tiempo suele quedar dura. Límpiela, aceítela solo con aceite para máquinas de coser y, si sigue dura o suena a golpes, llévela a mantenimiento.',
    searches: [
      'máquina de coser dura de mover',
      'la máquina de coser suena mucho',
      'cómo aceitar la máquina de coser',
      'máquina de coser pesada después de guardarla',
    ],
    pointsTitle: CAUSES,
    points: [
      {
        title: 'Pelusa acumulada',
        text: 'La mota se compacta en el gancho y los dientes y frena todo el mecanismo.',
      },
      {
        title: 'Aceite seco o equivocado',
        text: 'Use solo aceite para máquinas de coser. El aceite de cocina o de carro se pone pegajoso y endurece la máquina.',
      },
      {
        title: 'Hilo enredado en el gancho',
        text: 'Un pedazo de hilo atrapado en el gancho la frena y hace ruido. Retírelo con pinzas.',
      },
      {
        title: 'Piezas o motor desgastados',
        text: 'Golpes metálicos o calentamiento indican piezas gastadas o un motor que necesita revisión.',
      },
    ],
    stepsTitle: TRY_FIRST,
    steps: [
      'Desconecte la máquina de la corriente.',
      'Retire la placa y limpie la pelusa con una brocha.',
      'Aplique unas gotas de aceite para máquinas de coser en los puntos del manual.',
      'Gire el volante con la mano para repartir el aceite.',
      'Cosa un retazo para retirar el exceso antes de coser su prenda.',
    ],
    whenToCall:
      'Si sigue dura, suena a golpes o se calienta, necesita un mantenimiento completo. Hacemos mantenimiento especializado, y para talleres le mostramos planas con motor directo, más silenciosas y de bajo consumo.',
    products: ['plana-mecatronica-ks8800dh', 'plana-electronica-jack-a4c'],
    seoTitle: '¿Su máquina de coser está dura o hace ruido? Causas y solución',
    seoDescription:
      'Por qué la máquina de coser está dura, pesada o ruidosa: pelusa, aceite seco, hilo en el gancho o desgaste. Cómo limpiarla y mantenimiento en Bogotá.',
  },
  {
    slug: 'que-maquina-comprar-para-taller-de-confeccion',
    problem: 'No sé qué máquina comprar para empezar mi taller de confección',
    question: '¿Qué máquina de coser comprar para empezar un taller de confección?',
    teaser: 'Quiere emprender y no sabe por cuál máquina empezar.',
    answer:
      'Depende de lo que va a coser. Para la mayoría de talleres de ropa se empieza con una plana industrial para las costuras rectas y una fileteadora para las orillas. Si trabaja camisetas, licras o ropa deportiva, sume una collarín o una recubridora. Para arreglos o emprender en casa, una máquina familiar es suficiente.',
    searches: [
      'qué máquinas necesito para un taller de confección',
      'qué máquina de coser comprar para empezar',
      'máquinas para emprender en confección',
      'diferencia entre plana, fileteadora y collarín',
    ],
    pointsTitle: '¿Qué máquina necesita según su trabajo?',
    points: [
      {
        title: 'Jean, dril y camisería',
        text: 'Plana industrial para costura recta y fileteadora para las orillas. Si el volumen crece, una botonadora.',
      },
      {
        title: 'Camisetas, licras y ropa deportiva',
        text: 'Fileteadora de 4 o 5 hilos para armar, y collarín o recubridora para dobladillos y cuellos.',
      },
      {
        title: 'Arreglos y emprendimiento en casa',
        text: 'Una máquina familiar con varias puntadas: fácil de usar y sin necesidad de un espacio grande.',
      },
      {
        title: 'Producción con mucho corte o bordado',
        text: 'Cortadora vertical para cortar varias capas a la vez y bordadora para marcar sus prendas.',
      },
    ],
    stepsTitle: '¿Qué debe tener claro antes de comprar?',
    steps: [
      'Qué prendas va a hacer y en qué telas.',
      'Cuántas prendas espera hacer por semana.',
      'Qué espacio y qué tipo de conexión eléctrica tiene.',
      'Su presupuesto, para priorizar primero la máquina que más usará.',
      'Que haya repuestos y servicio técnico cerca de usted.',
    ],
    help: {
      title: '¿Quiere que le asesoremos?',
      text: 'Cuéntenos qué prendas hace y cuántas por semana. Le recomendamos por WhatsApp las máquinas justas para empezar.',
    },
    whenTitle: '¿Cómo le ayudamos a elegir?',
    whenToCall:
      'Escríbanos qué prendas hace y le recomendamos las máquinas justas para empezar, sin comprar de más. Le acompañamos también después de la compra, con repuestos y servicio técnico.',
    products: [
      'plana-mecatronica-ks8800dh',
      'fileteadora-electronica-jack-c5c-5-03',
      'collarin-mecatronica-union-un500d-02bb',
      'maquina-familiar-union-un-350',
    ],
    seoTitle: '¿Qué máquina de coser comprar para empezar un taller de confección?',
    seoDescription:
      'Guía sencilla para elegir máquinas para su taller: plana, fileteadora, collarín, recubridora o familiar según las prendas que hace. Asesoría gratis en Bogotá.',
  },
  {
    slug: 'donde-arreglar-maquina-de-coser-en-bogota',
    problem: 'Mi máquina de coser está fallando y no sé dónde repararla en Bogotá',
    question: '¿Dónde reparar una máquina de coser en Bogotá?',
    teaser: 'Necesita un técnico de confianza que la revise.',
    answer:
      'En Costuras Programadas, en el barrio La Alquería de Bogotá, hacemos servicio técnico y mantenimiento de máquinas de coser, con repuestos disponibles. Escríbanos por WhatsApp con un video corto de la falla y la marca de su máquina, y le decimos cómo resolverla.',
    searches: [
      'servicio técnico de máquinas de coser en Bogotá',
      'reparación de máquinas de coser Bogotá',
      'mantenimiento de máquina de coser industrial',
      'técnico de máquinas de coser cerca de mí',
    ],
    pointsTitle: '¿Qué revisamos en su máquina?',
    points: [
      {
        title: 'Fallas de puntada',
        text: 'Saltos de puntada, hilo que se revienta, nudos por debajo y costuras fruncidas.',
      },
      {
        title: 'Calibración',
        text: 'Ajuste del gancho, la barra de aguja, el arrastre y las tensiones.',
      },
      {
        title: 'Fileteadoras y collarines',
        text: 'Cuchillas, lazadores y tensiones para que el acabado vuelva a quedar parejo.',
      },
      {
        title: 'Mantenimiento y repuestos',
        text: 'Limpieza, lubricación y cambio de piezas gastadas para alargar la vida de su máquina.',
      },
    ],
    stepsTitle: '¿Cómo pedir el servicio?',
    steps: [
      'Grabe un video corto donde se vea la falla.',
      'Anote la marca y el modelo de su máquina.',
      'Envíenos todo por WhatsApp al 319 339 9817.',
      'Le decimos si se resuelve con un ajuste sencillo o si conviene revisarla.',
    ],
    whenTitle: '¿Dónde y cuándo atendemos?',
    whenToCall:
      'Atendemos de lunes a sábado, de 8:00 a. m. a 6:00 p. m., en La Alquería, Bogotá, y enviamos máquinas y repuestos a todo Colombia.',
    products: [],
    seoTitle: 'Servicio técnico y reparación de máquinas de coser en Bogotá',
    seoDescription:
      'Reparación, mantenimiento y repuestos para máquinas de coser en La Alquería, Bogotá. Envíe un video de la falla por WhatsApp al 319 339 9817.',
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getOtherSolutions(solution: Solution, limit = 4): Solution[] {
  const index = SOLUTIONS.indexOf(solution);
  return [...SOLUTIONS.slice(index + 1), ...SOLUTIONS.slice(0, index)].slice(0, limit);
}

export function whatsappSolutionUrl(solution: Solution): string {
  const text = encodeURIComponent(
    `Hola Costuras Programadas, vi su guía "${solution.problem}" y necesito ayuda.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
