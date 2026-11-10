/**
 * Lightweight utility to join class names conditionally without external dependencies.
 * @param  {...any} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
