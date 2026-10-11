// Exporta el catálogo de src/app/data/products.ts a functions/catalog.json
// para que el asistente responda solo con productos reales.
import { writeFileSync } from 'node:fs';
import { loadData, loadProducts, root } from './load-products.mjs';

const data = await loadProducts();
const { SOLUTIONS } = await loadData('solutions');

const catalog = {
  contact: {
    phone: data.CONTACT_PHONE_DISPLAY,
    email: data.CONTACT_EMAIL,
    address: data.CONTACT_ADDRESS,
    hours: data.CONTACT_HOURS,
  },
  products: data.PRODUCTS.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.categoryLabel,
    summary: p.summary,
    description: p.description,
    price: p.priceLabel,
    specs: p.specs,
  })),
  solutions: SOLUTIONS.map((s) => ({ slug: s.slug, problem: s.problem, answer: s.answer })),
};

writeFileSync(`${root}functions/catalog.json`, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(
  `catalog.json: ${catalog.products.length} productos, ${catalog.solutions.length} guías`,
);
