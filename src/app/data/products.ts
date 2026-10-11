export type ProductCategory = 'maquinaria' | 'herramientas' | 'accesorios';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  priceLabel: string;
  featured: boolean;
  specs: string[];
  /** Gallery images; first entry is the primary catalog/card image. */
  images: string[];
}

/** Primary image helper for cards, SEO and listings. */
export function productImage(product: Product): string {
  return product.images[0] ?? '/assets/logo-nav-light.png';
}

export const PRODUCTS: Product[] = [
  {
    slug: 'plana-mecatronica-ks8800dh',
    name: 'Plana mecatrónica KS 8800D H',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Kansew Special para costura pesada: potencia, panel digital y ritmo de taller.',
    description:
      'Plana mecatrónica Kansew Special KS 8800D H pensada para materiales medios y pesados. Motor direct drive, panel digital integrado y bajo consumo para producción diaria en taller.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: [
      'Motor direct drive',
      'Panel digital integrado',
      'Bajo consumo de energía',
      'Alta velocidad',
      'Ideal para costura pesada',
    ],
    images: [
      '/assets/products/plana-mecatronica-ks8800dh-01.jpg',
      '/assets/products/plana-mecatronica-ks8800dh-02.jpg',
    ],
  },
  {
    slug: 'collarin-mecatronica-union-un500d-02bb',
    name: 'Collarín mecatrónica UNION UN-500D-02BB',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Precisión y tecnología para acabados profesionales en tejido de punto.',
    description:
      'Collarín mecatrónico UNION UN-500D-02BB con motor servo direct drive, alta velocidad y costuras uniformes. Ideal para la confección de camisetas, ropa deportiva, ropa interior y prendas en tejido de punto.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: [
      'Motor servo direct drive',
      'Alta velocidad',
      'Costuras uniformes',
      'Bajo consumo de energía',
      'Construcción industrial para trabajo continuo',
    ],
    images: [
      '/assets/products/collarin-union-un500d-02bb-01.jpg',
      '/assets/products/collarin-union-un500d-02bb-02.jpg',
    ],
  },
  {
    slug: 'plana-electronica-jack-a4c',
    name: 'Plana electrónica JACK A4C',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Tecnología electrónica, corte de hilo automático y bajo ruido para todo tipo de tela.',
    description:
      'Plana electrónica JACK A4C con control preciso y estable, alta velocidad y bajo nivel de ruido. Panel digital intuitivo, corte de hilo automático, posicionador de aguja, prensatelas automático, luz LED y lubricación automática. Trabaja telas livianas, medianas y pesadas con puntadas precisas y uniformes.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: [
      'Tecnología electrónica',
      'Corte de hilo automático',
      'Posicionador de aguja',
      'Prensatelas automático',
      'Panel digital intuitivo',
      'Bajo nivel de ruido',
      'Luz LED',
      'Lubricación automática',
      'Para telas livianas, medianas y pesadas',
    ],
    images: [
      '/assets/products/plana-electronica-jack-a4c-01.jpg',
      '/assets/products/plana-electronica-jack-a4c-02.jpg',
    ],
  },
  {
    slug: 'bordadora-industrial-anysew-2-cabezas',
    name: 'Bordadora industrial ANYSEW 2 cabezas',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: '15 agujas por cabezote y área de bordado de 50 × 90 cm para duplicar su producción.',
    description:
      'Bordadora industrial ANYSEW de 2 cabezas con 15 agujas por cabezote y cambios de color automáticos. Pantalla táctil intuitiva, área de bordado de 50 × 90 cm, hasta 1.200 puntadas por minuto, corte de hilo automático y detector de hilo superior e inferior. Ideal para gorras, uniformes, camisetas, toallas, chaquetas y más.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: [
      '2 cabezas · 15 agujas por cabezote',
      'Área de bordado de 50 × 90 cm',
      'Hasta 1.200 puntadas por minuto',
      'Pantalla táctil intuitiva',
      'Corte de hilo automático',
      'Detector de hilo superior e inferior',
      'Compatible con DST, DSB, EXP, PES y más',
      'Estructura robusta para trabajo continuo',
    ],
    images: [
      '/assets/products/bordadora-anysew-2-cabezas-01.jpg',
      '/assets/products/bordadora-anysew-2-cabezas-02.jpg',
    ],
  },
  {
    slug: 'fileteadora-kansew-ks504',
    name: 'Fileteadora KANSEW Special KS504',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Fileteadora de 4 hilos: precisión que hace la diferencia en cada acabado.',
    description:
      'Fileteadora KANSEW Special KS504 de 4 hilos para acabados perfectos en todo tipo de telas. Alta velocidad para trabajar con eficiencia, máxima versatilidad y resistencia en cada costura, y un diseño robusto y moderno que garantiza durabilidad y rendimiento. Con repuestos y servicio técnico disponibles.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      '4 hilos: versatilidad y resistencia',
      'Costuras profesionales en todo tipo de telas',
      'Alta velocidad y productividad',
      'Diseño robusto y moderno',
      'Repuestos y servicio técnico',
    ],
    images: [
      '/assets/products/fileteadora-kansew-ks504-01.jpg',
      '/assets/products/fileteadora-kansew-ks504-02.jpg',
    ],
  },
  {
    slug: 'cortadora-vertical-jack',
    name: 'Cortadora vertical JACK',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Corte rápido y limpio de varias capas de tela con motor de alta potencia.',
    description:
      'Cortadora vertical JACK con motor de alta potencia y cuchilla de acero afilada para un corte rápido, preciso y limpio en todo tipo de telas. Corta varias capas a la vez, con diseño robusto, estable y ergonómico, protecciones integradas para su seguridad y fácil mantenimiento. Ideal para talleres de confección, tapicería e industria textil.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Motor de alta potencia',
      'Cuchilla de acero afilada',
      'Corta varias capas de tela',
      'Diseño robusto y estable',
      'Protecciones de seguridad integradas',
      'Fácil mantenimiento y repuestos disponibles',
    ],
    images: [
      '/assets/products/cortadora-vertical-jack-01.jpg',
      '/assets/products/cortadora-vertical-jack-02.jpg',
    ],
  },
  {
    slug: 'cortadora-vertical-kansew',
    name: 'Cortadora vertical KANSEW',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Corte estable y preciso con motor de alto rendimiento y control digital.',
    description:
      'Cortadora vertical KANSEW con motor de alto rendimiento, cuchilla de larga duración y caja de control digital. Ofrece un corte estable y preciso en varias capas de tela, con calidad y resistencia profesional, diseño ergonómico y protecciones integradas. Ideal para talleres de confección, tapicería e industria textil.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Motor de alto rendimiento',
      'Cuchilla de larga duración',
      'Control digital',
      'Corta varias capas de tela',
      'Protecciones de seguridad integradas',
      'Fácil mantenimiento y repuestos disponibles',
    ],
    images: [
      '/assets/products/cortadora-vertical-kansew-01.jpg',
      '/assets/products/cortadora-vertical-kansew-02.jpg',
    ],
  },
  {
    slug: 'recubridora-plana-pegasus-w600pc',
    name: 'Recubridora plana PEGASUS W600 PC',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Calidad japonesa en cada puntada, ideal para ropa deportiva y lencería.',
    description:
      'Máquina recubridora plana PEGASUS W600 PC con puntada recubridora de alta calidad y acabados profesionales. Alta velocidad y rendimiento superior, diseño robusto y duradero, y la confianza de la calidad japonesa. Ideal para prendas deportivas, lencería y ropa en general. Con garantía y soporte especializado.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Puntada recubridora de alta calidad',
      'Ideal para ropa deportiva y lencería',
      'Alta velocidad y rendimiento superior',
      'Diseño robusto y duradero',
      'Calidad japonesa',
      'Garantía y soporte especializado',
    ],
    images: [
      '/assets/products/recubridora-pegasus-w600pc-01.jpg',
      '/assets/products/recubridora-pegasus-w600pc-02.jpg',
    ],
  },
  {
    slug: 'fileteadora-mecatronica-union-una-5',
    name: 'Fileteadora mecatrónica UNION UNA-5 5 hilos',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Sistema mecatrónico de 5 hilos para acabados profesionales con bajo ruido.',
    description:
      'Fileteadora mecatrónica UNION UNA-5 con sistema de alta precisión y 5 hilos para acabados profesionales. Alta velocidad y rendimiento superior, bajo nivel de ruido y vibración, y puntadas limpias, uniformes y resistentes. Ideal para telas livianas y medianas, de fácil ajuste y mantenimiento. Cada puntada, un acabado perfecto.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Sistema mecatrónico de alta precisión',
      '5 hilos para acabados profesionales',
      'Alta velocidad y rendimiento superior',
      'Bajo nivel de ruido y vibración',
      'Ideal para telas livianas y medianas',
      'Fácil ajuste y mantenimiento',
      'Durabilidad y confianza garantizada',
    ],
    images: [
      '/assets/products/fileteadora-union-una5-01.jpg',
      '/assets/products/fileteadora-union-una5-02.jpg',
    ],
  },
  {
    slug: 'fileteadora-electronica-jack-c5c-5-03',
    name: 'Fileteadora electrónica JACK C5C-5-03',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: '5 hilos, corta hilo automático y posicionador de aguja para producción.',
    description:
      'Fileteadora electrónica JACK C5C-5-03 con sistema electrónico de alta precisión y 5 hilos para acabados profesionales. Corta hilo automático, posicionador de aguja y sistema de arranque suave. Alta velocidad, bajo nivel de ruido y vibración, y estructura robusta y duradera. Ideal para talleres y producción.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Sistema electrónico de alta precisión',
      '5 hilos para acabados profesionales',
      'Corta hilo automático',
      'Posicionador de aguja',
      'Sistema de arranque suave',
      'Bajo nivel de ruido y vibración',
      'Estructura robusta y duradera',
    ],
    images: [
      '/assets/products/fileteadora-jack-c5c-01.jpg',
      '/assets/products/fileteadora-jack-c5c-02.jpg',
    ],
  },
  {
    slug: 'collarin-mecatronica-kingter-kt500-02-ddi',
    name: 'Collarín mecatrónica KINGTER KT500-02-DDI',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Puntadas firmes y uniformes para ropa deportiva, interior y en general.',
    description:
      'Collarín mecatrónica KINGTER KT500-02-DDI con sistema mecatrónico de alta precisión. Puntadas firmes y uniformes, alta velocidad y rendimiento superior, y estructura robusta y duradera. Ideal para prendas deportivas, ropa interior y ropa en general. Con garantía, soporte especializado, refacciones y servicio técnico.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Sistema mecatrónico de alta precisión',
      'Puntadas firmes y uniformes',
      'Alta velocidad y rendimiento superior',
      'Estructura robusta y duradera',
      'Ideal para ropa deportiva e interior',
      'Garantía, refacciones y servicio técnico',
    ],
    images: [
      '/assets/products/collarin-kingter-kt500-01.jpg',
      '/assets/products/collarin-kingter-kt500-02.jpg',
    ],
  },
  {
    slug: 'botonadora-mecatronica-jack-jk-t1377-g',
    name: 'Botonadora mecatrónica JACK JK-T1377-G',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Pega botones con precisión, corte de hilo automático y alta velocidad.',
    description:
      'Botonadora mecatrónica JACK JK-T1377-G con tecnología de alta precisión y compatible con una amplia gama de botones. Alta velocidad y mayor eficiencia, corte de hilo automático, posicionamiento preciso y estable, y estructura robusta y duradera. Para todo tipo de prendas, ideal para producción industrial y de fácil operación y mantenimiento.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      'Tecnología mecatrónica de alta precisión',
      'Amplia gama de botones compatibles',
      'Alta velocidad y mayor eficiencia',
      'Corte de hilo automático',
      'Posicionamiento preciso y estable',
      'Estructura robusta y duradera',
    ],
    images: [
      '/assets/products/botonadora-jack-jk-t1377g-01.jpg',
      '/assets/products/botonadora-jack-jk-t1377g-02.jpg',
    ],
  },
  {
    slug: 'maquina-familiar-union-un-350',
    name: 'Máquina de coser familiar UNION UN-350',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: '12 tipos de puntadas, fácil de usar e ideal para principiantes.',
    description:
      'Máquina de coser familiar UNION UN-350 con 12 tipos de puntadas decorativas y funcionales, selección de puntada ajustable, enhebrado fácil y rápido y luz LED integrada. Diseño compacto, moderno y resistente. Ideal para ropa, arreglos, manualidades y más. La compañera perfecta para cada proyecto.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      '12 tipos de puntadas',
      'Selección de puntada ajustable',
      'Enhebrado fácil y rápido',
      'Luz LED integrada',
      'Diseño compacto, moderno y resistente',
      'Ideal para principiantes',
    ],
    images: [
      '/assets/products/maquina-familiar-union-un350-01.jpg',
      '/assets/products/maquina-familiar-union-un350-02.jpg',
    ],
  },
  {
    slug: 'maquina-familiar-brother-sm-1400',
    name: 'Máquina de coser familiar Brother SM 1400',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: '14 puntadas, ojal automático en 4 pasos, liviana y portátil.',
    description:
      'Máquina de coser familiar Brother SM 1400 con 14 puntadas incorporadas, ojal automático en 4 pasos y dial selector de puntadas fácil de usar. Enhebrado fácil y rápido, sistema de bobinado automático, luz LED para mejor visibilidad y accesorios incluidos. Liviana y portátil, ideal para ropa, arreglos, manualidades y más.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: [
      '14 puntadas incorporadas',
      'Ojal automático en 4 pasos',
      'Dial selector de puntadas',
      'Bobinado automático',
      'Luz LED para mejor visibilidad',
      'Liviana y portátil',
      'Accesorios incluidos',
    ],
    images: [
      '/assets/products/maquina-familiar-brother-sm1400-01.jpg',
      '/assets/products/maquina-familiar-brother-sm1400-02.jpg',
    ],
  },
];

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: ProductCategory): Product[] {
  if (!category) {
    return PRODUCTS;
  }
  return PRODUCTS.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  ).slice(0, limit);
}

const BRANDS = ['KANSEW', 'JACK', 'UNION', 'ANYSEW', 'PEGASUS', 'KINGTER', 'Brother'];

export function productBrand(product: Product): string | undefined {
  const find = (text: string) =>
    BRANDS.find((brand) => new RegExp(`\\b${brand}\\b`, 'i').test(text));
  return find(product.name) ?? find(product.description);
}

/** Public site origin used for canonical URLs, sitemap and structured data. */
export const SITE_URL = 'https://costurasprogramadas.web.app';
export const SITE_NAME = 'Costuras Programadas';

export const WHATSAPP_NUMBER = '573193399817';
export const CONTACT_PHONE_DISPLAY = '319 339 9817';
export const CONTACT_EMAIL = 'costurasprogramadas4@gmail.com';
export const CONTACT_ADDRESS = 'Barrio La Alquería, Bogotá, Colombia';
export const CONTACT_HOURS = 'Lunes a sábado · 8:00 a. m. – 6:00 p. m.';

export function whatsappProductUrl(productName: string): string {
  const text = encodeURIComponent(
    `Hola Costuras Programadas, me interesa cotizar: ${productName}`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappGeneralUrl(): string {
  const text = encodeURIComponent(
    'Hola Costuras Programadas, quiero información sobre sus productos.',
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappQuoteUrl(need: string, city: string): string {
  const text = encodeURIComponent(
    `Hola Costuras Programadas,\n\nNecesito: ${need.trim()}\nCiudad: ${city.trim()}\n\nQuedo atenta a su cotización.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
