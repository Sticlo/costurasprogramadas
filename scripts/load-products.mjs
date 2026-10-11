// Carga los datos de src/app/data desde Node (sin Angular) para los scripts de build.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const root = fileURLToPath(new URL('..', import.meta.url));
const dataDir = `${root}src/app/data/`;
const cache = new Map();

async function toDataUrl(name) {
  if (cache.has(name)) return cache.get(name);
  const source = readFileSync(`${dataDir}${name}.ts`, 'utf8');
  let { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  for (const [, dep] of outputText.matchAll(/from '\.\/([\w-]+)'/g)) {
    outputText = outputText.replaceAll(`from './${dep}'`, `from '${await toDataUrl(dep)}'`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  cache.set(name, url);
  return url;
}

export async function loadData(name) {
  return import(await toDataUrl(name));
}

export const loadProducts = () => loadData('products');
