const parse = str => str.toLowerCase().replace(/[-\s]/g, '');

export const isIsogram = str =>
  new Set([...parse(str)]).size === parse(str).length;
