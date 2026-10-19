'use client';

import { DEFAULT_DESIGN, sanitizeDesign } from './pricing';

const KEY = 'bijou-design';

/** Saves the customer's current design (plus the preview photo) in this browser. */
export function saveDesign(design, img) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...sanitizeDesign(design), img: img || null }));
  } catch {
    /* storage can be unavailable (private mode); the flow still works with defaults */
  }
}

export function loadDesign() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (raw) return { design: sanitizeDesign(raw), img: raw.img || null };
  } catch {
    /* ignore */
  }
  return { design: { ...DEFAULT_DESIGN }, img: null };
}
