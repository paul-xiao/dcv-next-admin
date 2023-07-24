export function emptyObjectItemFillter(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value !== 'undefined') {
      acc[key] = value;
    }
    return acc;
  }, {});
}
