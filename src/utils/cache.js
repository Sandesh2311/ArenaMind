/**
 * Build a stable cache key from request dimensions.
 * @param {...string} parts Cache key parts.
 * @returns {string} Lower-cased cache key.
 */
export function buildCacheKey(...parts) {
  return parts.map((part) => String(part).toLowerCase()).join(':');
}
