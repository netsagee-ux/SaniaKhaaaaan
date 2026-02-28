export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/[^\w-]+/g, "")    // remove special chars
    .replace(/--+/g, "-");      // no double hyphens
}
