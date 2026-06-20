// Compressed site images are stored in the public `images` bucket on Supabase
// Storage and served over its CDN. See scripts/compress-images.mjs for how the
// WebP files in this bucket are generated from the originals in public/images.
const STORAGE_BASE =
  "https://lxmbetmjyfagmmuoragm.supabase.co/storage/v1/object/public/images";

/** Resolve a stored image filename (e.g. "hero-student.webp") to its CDN URL. */
export function img(file: string): string {
  return `${STORAGE_BASE}/${file}`;
}
