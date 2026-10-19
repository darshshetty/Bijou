// Shared by the builder (client) and the checkout API (server).
// The server always recomputes the price from the design, never trusting the browser.

export const SHAPES = [
  ['round', 'Round'], ['oval', 'Oval'], ['emerald', 'Emerald'], ['pear', 'Pear'], ['cushion', 'Cushion'],
  ['princess', 'Princess'], ['radiant', 'Radiant'], ['marquise', 'Marquise'], ['asscher', 'Asscher'], ['heart', 'Heart'],
].map(([id, name]) => ({ id, name }));

export const CARATS = ['0.5', '0.75', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'];

export const COLORS = [
  ['D', 'D — colorless'], ['E', 'E — colorless'], ['F', 'F — colorless'], ['G', 'G — near colorless'],
].map(([id, name]) => ({ id, name }));

export const CLARITIES = ['VVS1', 'VVS2', 'VS1', 'VS2'];

export const SETTINGS = [
  ['solitaire', 'Solitaire'], ['hidden', 'Hidden halo'], ['halo', 'Halo'], ['cathedral', 'Cathedral'],
  ['three', 'Three-stone'], ['five', 'Five-stone'], ['cluster', 'Side cluster'], ['toi', 'Toi et Moi'], ['bezel', 'Bezel'],
].map(([id, name]) => ({ id, name }));

export const PRONGS = [{ id: '4', name: '4 prongs' }, { id: '6', name: '6 prongs' }];

export const BANDS = [
  ['plain', 'Plain'], ['pave', 'Pavé'], ['knife', 'Knife-edge'], ['tapered', 'Tapered'], ['twisted', 'Twisted'], ['rope', 'Rope'],
].map(([id, name]) => ({ id, name }));

export const METALS = [
  { id: 'platinum', name: 'Platinum', c: '#BFC4CA' },
  { id: 'white', name: '18k White Gold', c: '#CDD0D4' },
  { id: 'yellow', name: '18k Yellow Gold', c: '#C9A24A' },
  { id: 'rose', name: '18k Rose Gold', c: '#C98A74' },
];

export const SIZES = ['Not sure yet', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'];

export const DEFAULT_DESIGN = {
  shape: 'oval', carat: '3.0', color: 'E', clarity: 'VS1', setting: 'solitaire', prongs: '4',
  band: 'pave', metal: 'yellow', size: 'Not sure yet',
};

export const MODEL_PRICE = 100;

// Ballpark retail pricing benchmarked against VRAI complete rings (Oct 2026).
const BASE_BY_CARAT = { '0.5': 1600, '0.75': 1950, '1.0': 2350, '1.5': 3000, '2.0': 3850, '2.5': 4800, '3.0': 5900, '3.5': 7100, '4.0': 8400, '4.5': 9700, '5.0': 11000 };
const COLOR_MULT = { D: 1.1, E: 1.06, F: 1.03, G: 1 };
const CLARITY_MULT = { VVS1: 1.08, VVS2: 1.05, VS1: 1.02, VS2: 1 };
const SETTING_ADD = { solitaire: 0, hidden: 250, halo: 700, cathedral: 100, three: 1500, five: 1100, cluster: 450, toi: 1200, bezel: 150 };
const BAND_ADD = { plain: 0, pave: 350, knife: 100, tapered: 50, twisted: 150, rope: 100 };

const ids = (list) => list.map((x) => (typeof x === 'string' ? x : x.id));

/** Returns a clean design object containing only known values (falls back to defaults). */
export function sanitizeDesign(input = {}) {
  const pick = (key, allowed) => (ids(allowed).includes(String(input[key])) ? String(input[key]) : DEFAULT_DESIGN[key]);
  return {
    shape: pick('shape', SHAPES),
    carat: pick('carat', CARATS),
    color: pick('color', COLORS),
    clarity: pick('clarity', CLARITIES),
    setting: pick('setting', SETTINGS),
    prongs: pick('prongs', PRONGS),
    band: pick('band', BANDS),
    metal: pick('metal', METALS),
    size: pick('size', SIZES),
  };
}

export function price(design) {
  const d = sanitizeDesign(design);
  const base = BASE_BY_CARAT[d.carat] * COLOR_MULT[d.color] * CLARITY_MULT[d.clarity];
  const extras = SETTING_ADD[d.setting] + BAND_ADD[d.band] + (d.metal === 'platinum' ? 250 : 0);
  return Math.round((base + extras) / 50) * 50;
}

export const usd = (n) => '$' + (Math.round(n / 50) * 50).toLocaleString('en-US');
export const usdExact = (n) => '$' + Math.round(n).toLocaleString('en-US');

export function estimateRange(design) {
  const p = price(design);
  return usd(p * 0.92) + '–' + usd(p * 1.08);
}

const nameOf = (list, id) => (list.find((x) => x.id === id) || {}).name || id;

export function describe(design) {
  const d = sanitizeDesign(design);
  const setting = d.setting === 'bezel' ? 'Bezel' : `${nameOf(SETTINGS, d.setting)}, ${d.prongs}-prong`;
  return {
    shape: nameOf(SHAPES, d.shape),
    carat: d.carat,
    colorClarity: `${d.color} / ${d.clarity}`,
    setting,
    band: nameOf(BANDS, d.band),
    metal: nameOf(METALS, d.metal),
    size: /^\d/.test(d.size) ? `Size ${d.size}` : 'Size to be confirmed',
    line: `${nameOf(SHAPES, d.shape)} ${d.carat} ct · ${d.color} / ${d.clarity} · ${setting} · ${nameOf(BANDS, d.band)} band · ${nameOf(METALS, d.metal)}`,
  };
}
