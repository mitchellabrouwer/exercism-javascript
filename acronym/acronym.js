export const parse = str =>
  str
    .replace(/[^A-Za-z\s-]/g, '')
    .match(/\b[a-zA-Z]/g)
    .join('')
    .toUpperCase();
