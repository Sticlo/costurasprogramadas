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
    slug: 'recta-industrial-stitchpro',
    name: 'Recta industrial StitchPro',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Máquina de coser recta para producción diaria en taller.',
    description:
      'Diseñada para confeccionistas que necesitan ritmo constante y puntada estable. Ideal para prendas en serie, con mesa reforzada y motor de bajo consumo.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: ['Puntada recta', 'Uso industrial', 'Motor servo opcional', 'Garantía local'],
    images: [
      '/assets/products/recta-industrial-stitchpro-01.png',
      '/assets/products/recta-industrial-stitchpro-02.jpg',
    ],
  },
  {
    slug: 'overlock-4-hilos-pro',
    name: 'Overlock 4 hilos Pro',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Acabados limpios y elastizados para tejidos planos y stretch.',
    description:
      'Overlock profesional de 4 hilos para bordes definidos y costuras elásticas. Perfecta para moda urbana, deportiva y prendas de punto.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: ['4 hilos', 'Diferencial ajustable', 'Cortador integrado', 'Uso intensivo'],
    images: [
      '/assets/products/overlock-4-hilos-pro-01.png',
      '/assets/products/overlock-4-hilos-pro-02.png',
    ],
  },
  {
    slug: 'fileteadora-collarless',
    name: 'Fileteadora Collarless',
    category: 'maquinaria',
    categoryLabel: 'Maquinaria',
    summary: 'Unión y remate de cuellos, puños y costados con precisión.',
    description:
      'Equipo versátil para talleres que buscan remates limpios sin sacrificar velocidad. Compatible con telas livianas y medias.',
    priceLabel: 'Consultar precio',
    featured: true,
    specs: ['Remate profesional', 'Alimentación diferencial', 'Ajuste fino de tensión'],
    images: [
      '/assets/products/fileteadora-collarless-01.jpg',
      '/assets/products/fileteadora-collarless-02.png',
    ],
  },
  {
    slug: 'tijeras-precision-oro',
    name: 'Tijeras de precisión',
    category: 'herramientas',
    categoryLabel: 'Herramientas',
    summary: 'Corte limpio en telas finas y densas, con filo de larga duración.',
    description:
      'Tijeras de taller con balance ergonómico y filo templado. Pensadas para corte de patrones, forros y tejidos técnicos.',
    priceLabel: 'Desde $189.000',
    featured: true,
    specs: ['Acero templado', 'Empuñadura ergonómica', 'Filo resharpable'],
    images: [
      '/assets/products/tijeras-precision-oro-01.jpg',
      '/assets/products/tijeras-precision-oro-02.jpg',
    ],
  },
  {
    slug: 'kit-agujas-alfileres',
    name: 'Kit de agujas y alfileres',
    category: 'herramientas',
    categoryLabel: 'Herramientas',
    summary: 'Set esencial para marcado, armado y costura a máquina.',
    description:
      'Selección de agujas industriales y alfileres de cabeza fina para un armado seguro y una puntada limpia en distintos gramajes.',
    priceLabel: 'Desde $45.000',
    featured: false,
    specs: ['Múltiples calibres', 'Estuche organizado', 'Uso doméstico e industrial'],
    images: [
      '/assets/products/kit-agujas-alfileres-01.jpg',
      '/assets/products/kit-agujas-alfileres-02.jpg',
    ],
  },
  {
    slug: 'regla-patronaje-60',
    name: 'Regla de patronaje 60 cm',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    summary: 'Medición clara y marcado estable para patrones al milímetro.',
    description:
      'Regla transparente con guías de costura y curvas suaves. Ideal para trazado de patrones y ajustes en mesa de corte.',
    priceLabel: 'Desde $62.000',
    featured: false,
    specs: ['60 cm', 'Marcas de costura', 'Material rígido'],
    images: ['/assets/products/regla-patronaje-60-01.jpg'],
  },
  {
    slug: 'pie-prensatelas-universal',
    name: 'Set de prensatelas',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    summary: 'Accesorios para ampliar el alcance de su máquina recta.',
    description:
      'Incluye pies para cierre, dobladillo y zig-zag básico. Compatible con la mayoría de rectas industriales estándar.',
    priceLabel: 'Desde $78.000',
    featured: false,
    specs: ['3 pies incluidos', 'Montaje rápido', 'Acero inoxidable'],
    images: ['/assets/products/pie-prensatelas-universal-01.jpg'],
  },
  {
    slug: 'mesa-corte-plegable',
    name: 'Mesa de corte plegable',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    summary: 'Superficie amplia y estable para cortar y armar.',
    description:
      'Mesa reforzada con altura de taller y sistema plegable para espacios reducidos. Superficie lisa para marcado preciso.',
    priceLabel: 'Consultar precio',
    featured: false,
    specs: ['Estructura reforzada', 'Plegable', 'Altura de taller'],
    images: ['/assets/products/mesa-corte-plegable-01.jpg'],
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
