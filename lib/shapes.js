// SVG outline for each diamond shape (used for the shape picker icons).
export function shapePath(shape, cx, cy, r) {
  const f = (n) => Math.round(n * 10) / 10;
  const P = (pts) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
  if (shape === 'round') return { d: 'M' + f(cx - r) + ' ' + f(cy) + 'A' + f(r) + ' ' + f(r) + ' 0 1 0 ' + f(cx + r) + ' ' + f(cy) + 'A' + f(r) + ' ' + f(r) + ' 0 1 0 ' + f(cx - r) + ' ' + f(cy) + 'Z', w: r, h: r };
  if (shape === 'oval') { const a = r * 0.78, b = r * 1.15; return { d: 'M' + f(cx - a) + ' ' + f(cy) + 'A' + f(a) + ' ' + f(b) + ' 0 1 0 ' + f(cx + a) + ' ' + f(cy) + 'A' + f(a) + ' ' + f(b) + ' 0 1 0 ' + f(cx - a) + ' ' + f(cy) + 'Z', w: a, h: b }; }
  if (shape === 'emerald' || shape === 'radiant') {
    const em = shape === 'emerald';
    const w = em ? r * 0.8 : r * 0.88, h = em ? r * 1.15 : r * 1.05, c = em ? r * 0.28 : r * 0.2;
    return { d: P([[cx - w + c, cy - h], [cx + w - c, cy - h], [cx + w, cy - h + c], [cx + w, cy + h - c], [cx + w - c, cy + h], [cx - w + c, cy + h], [cx - w, cy + h - c], [cx - w, cy - h + c]]), w: w, h: h };
  }
  if (shape === 'princess') { const s = r * 0.9; return { d: P([[cx - s, cy - s], [cx + s, cy - s], [cx + s, cy + s], [cx - s, cy + s]]), w: s, h: s }; }
  if (shape === 'cushion') {
    const s = r * 0.92, k = r * 0.4;
    return { d: 'M' + f(cx - s + k) + ' ' + f(cy - s) + 'H' + f(cx + s - k) + 'Q' + f(cx + s) + ' ' + f(cy - s) + ' ' + f(cx + s) + ' ' + f(cy - s + k) + 'V' + f(cy + s - k) + 'Q' + f(cx + s) + ' ' + f(cy + s) + ' ' + f(cx + s - k) + ' ' + f(cy + s) + 'H' + f(cx - s + k) + 'Q' + f(cx - s) + ' ' + f(cy + s) + ' ' + f(cx - s) + ' ' + f(cy + s - k) + 'V' + f(cy - s + k) + 'Q' + f(cx - s) + ' ' + f(cy - s) + ' ' + f(cx - s + k) + ' ' + f(cy - s) + 'Z', w: s, h: s };
  }
  if (shape === 'pear') {
    const b = r * 0.82, top = cy - r * 1.2, mid = cy + r * 0.25;
    return { d: 'M' + f(cx) + ' ' + f(top) + 'C' + f(cx + r * 0.35) + ' ' + f(cy - r * 0.7) + ' ' + f(cx + b) + ' ' + f(cy - r * 0.25) + ' ' + f(cx + b) + ' ' + f(mid) + 'A' + f(b) + ' ' + f(b) + ' 0 0 1 ' + f(cx - b) + ' ' + f(mid) + 'C' + f(cx - b) + ' ' + f(cy - r * 0.25) + ' ' + f(cx - r * 0.35) + ' ' + f(cy - r * 0.7) + ' ' + f(cx) + ' ' + f(top) + 'Z', w: b, h: r * 1.12 };
  }
  if (shape === 'asscher') { const s = r * 0.88, c = r * 0.3; return { d: P([[cx - s + c, cy - s], [cx + s - c, cy - s], [cx + s, cy - s + c], [cx + s, cy + s - c], [cx + s - c, cy + s], [cx - s + c, cy + s], [cx - s, cy + s - c], [cx - s, cy - s + c]]), w: s, h: s }; }
  if (shape === 'heart') return { d: 'M' + f(cx) + ' ' + f(cy + r) + 'C' + f(cx - r * 1.3) + ' ' + f(cy + r * 0.05) + ' ' + f(cx - r * 0.95) + ' ' + f(cy - r * 1.15) + ' ' + f(cx) + ' ' + f(cy - r * 0.45) + 'C' + f(cx + r * 0.95) + ' ' + f(cy - r * 1.15) + ' ' + f(cx + r * 1.3) + ' ' + f(cy + r * 0.05) + ' ' + f(cx) + ' ' + f(cy + r) + 'Z', w: r, h: r };
  const h = r * 1.35;
  return { d: 'M' + f(cx) + ' ' + f(cy - h) + 'Q' + f(cx + r * 1.3) + ' ' + f(cy) + ' ' + f(cx) + ' ' + f(cy + h) + 'Q' + f(cx - r * 1.3) + ' ' + f(cy) + ' ' + f(cx) + ' ' + f(cy - h) + 'Z', w: r * 0.65, h: h };
}
