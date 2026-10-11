// Genera public/sitemap.xml, public/robots.txt y public/llms.txt a partir de los datos reales.
import { writeFileSync } from 'node:fs';
import { loadData, loadProducts, root } from './load-products.mjs';

const {
  PRODUCTS,
  SITE_URL,
  SITE_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_HOURS,
  CONTACT_PHONE_DISPLAY,
  productBrand,
} = await loadProducts();
const { SOLUTIONS } = await loadData('solutions');
const today = new Date().toISOString().slice(0, 10);

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// --- sitemap.xml ---
const pages = [
  { path: '/' },
  { path: '/catalogo' },
  { path: '/soluciones' },
  ...SOLUTIONS.map((solution) => ({ path: `/soluciones/${solution.slug}` })),
  { path: '/nosotros', images: [{ src: '/assets/equipo-createx-2026.jpg', title: 'Equipo de Costuras Programadas en la Feria CREATEX 2026' }] },
  { path: '/contacto' },
  ...PRODUCTS.map((product) => ({
    path: `/catalogo/${product.slug}`,
    images: product.images.map((src) => ({ src, title: product.name })),
  })),
];

const urls = pages
  .map(({ path, images = [] }) => {
    const imageTags = images
      .map(
        (image) =>
          `    <image:image>\n      <image:loc>${SITE_URL}${image.src}</image:loc>\n      <image:title>${escape(image.title)}</image:title>\n    </image:image>`,
      )
      .join('\n');
    return [
      '  <url>',
      `    <loc>${SITE_URL}${path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      imageTags,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

// --- robots.txt: buscadores y asistentes de IA bienvenidos ---
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Meta-ExternalAgent',
];

const robots = `User-agent: *
Allow: /
Disallow: /api/

${aiCrawlers.map((bot) => `User-agent: ${bot}`).join('\n')}
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

// --- llms.txt: resumen para asistentes de IA (https://llmstxt.org) ---
const llms = `# ${SITE_NAME}

> Tienda de máquinas de coser industriales y familiares en Bogotá, Colombia (barrio La Alquería). Vende planas, fileteadoras, collarines, recubridoras, cortadoras verticales, botonadoras y bordadoras de marcas como JACK, KANSEW, UNION, PEGASUS, KINGTER, ANYSEW y Brother. Ofrece asesoría para elegir máquina, servicio técnico, mantenimiento, repuestos y envíos a todo Colombia.

- Dirección: ${CONTACT_ADDRESS}
- WhatsApp y teléfono: +57 ${CONTACT_PHONE_DISPLAY}
- Correo: ${CONTACT_EMAIL}
- Horario: ${CONTACT_HOURS}
- Precios: se cotizan por WhatsApp; no están publicados en la web.

## Páginas principales

- [Inicio](${SITE_URL}/): presentación de la tienda y productos destacados.
- [Catálogo](${SITE_URL}/catalogo): todas las máquinas disponibles.
- [Soluciones a fallas de máquinas de coser](${SITE_URL}/soluciones): guías paso a paso para los problemas más comunes.
- [Nosotros](${SITE_URL}/nosotros): historia, misión y equipo.
- [Contacto](${SITE_URL}/contacto): ubicación, horario y cotizaciones.

## Problemas frecuentes y soluciones

${SOLUTIONS.map((s) => `- [${s.question}](${SITE_URL}/soluciones/${s.slug}): ${s.answer}`).join('\n')}

## Catálogo

${PRODUCTS.map((p) => {
  const brand = productBrand(p);
  return `- [${p.name}](${SITE_URL}/catalogo/${p.slug})${brand ? ` — marca ${brand}` : ''}: ${p.summary}`;
}).join('\n')}
`;

writeFileSync(`${root}public/sitemap.xml`, sitemap);
writeFileSync(`${root}public/robots.txt`, robots);
writeFileSync(`${root}public/llms.txt`, llms);
console.log(`sitemap.xml: ${pages.length} páginas · robots.txt · llms.txt`);
