const sumMultiples = (a, b) => a + b;
const removeDuplicates = (num, index, array) => array.indexOf(num) === index;
const multiples = (num, limit, i = 1) =>
  !num || num * i >= limit ? [0] : [num * i].concat(multiples(num, limit, (i += 1)));

export const sum = (numbers, limit) =>
  numbers
    .reduce((result, number) => result.concat(multiples(number, limit)), [0])
    .filter(removeDuplicates)
    .reduce(sumMultiples);
