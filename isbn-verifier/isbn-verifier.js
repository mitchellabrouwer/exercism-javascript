const parse = string =>
  string
    .split('')
    .reverse()
    .filter((val, idx) => !isNaN(val) || (idx === 0 && val === 'X'));

export const isValid = string => {
  const isbn = parse(string);

  const sum = isbn
    .map((num, idx) => (num === 'X' ? 10 * (idx + 1) : num * (idx + 1)))
    .reduce((a, b) => a + b, 0);

  return isbn.length === 10 && sum % 11 === 0;
};
