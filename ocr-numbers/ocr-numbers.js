const HEIGHT = 4;
const WIDTH = 3;
const SPLIT = new RegExp(`.{1,${WIDTH}}`, 'g');
const NUMBERS = [
  [' _ ', '| |', '|_|', '   '],
  ['   ', '  |', '  |', '   '],
  [' _ ', ' _|', '|_ ', '   '],
  [' _ ', ' _|', ' _|', '   '],
  ['   ', '|_|', '  |', '   '],
  [' _ ', '|_ ', ' _|', '   '],
  [' _ ', '|_ ', '|_|', '   '],
  [' _ ', '  |', '  |', '   '],
  [' _ ', '|_|', '|_|', '   '],
  [' _ ', '|_|', ' _|', '   ']
];

const search = arr => NUMBERS.findIndex(val => val.every((v, idx) => v === arr[idx]));

const chunk = str => str.split(/\n/g).map(line => line.match(SPLIT));

const findNumber = (row, grid, y) =>
  row
    .map((_, x) => search(grid.slice(y, y + HEIGHT).map(line => line[x])))
    .map(val => (val === -1 ? '?' : val));

export const convert = str =>
  chunk(str)
    .reduce(
      (acc, row, y, grid) =>
        y % HEIGHT === 0 ? acc.concat([findNumber(row, grid, y)]) : acc,
      []
    )
    .map(line => line.join(''))
    .toString();
