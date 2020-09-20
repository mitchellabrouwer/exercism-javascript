export const transpose = arr =>
  arr
    .map(row => [...row])
    .reduce((a, b) => (a.length > b.length ? a : b), [])
    .map((_, i) => arr.map(row => (row[i] ? row[i] : ' ')))
    .map((row, i, arr) => (i === arr.length - 1 ? row.join('').trimEnd() : row.join('')));
