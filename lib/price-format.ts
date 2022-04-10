/**
 * Formats number with a . as a thousand operator and appends 'kr.'
 * @param x number to format
 * @returns formatted number in string
 */
export function formatPrice(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' kr.';
}
