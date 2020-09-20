const pipe = (...funcs) => args => funcs.reduce((arg, fn) => fn(arg), args);
const removeSpace = str => str.replace(/\s/g, '');
const toArray = str => str.split('');
const doubleOddIdx = idx => digit => digit * (isOdd(idx) ? 2 : 1);
const isOdd = num => num % 2 !== 0;
const toMinusNine = num => (num > 9 ? num - 9 : num);
const getLuhn = arr =>
  [...arr]
    .reverse()
    .reduce((sum, digit, idx) => pipe(doubleOddIdx(idx), toMinusNine)(digit) + sum, 0);

export const valid = str => {
  if (removeSpace(str).length <= 1) return false;
  return pipe(removeSpace, toArray, getLuhn)(str) % 10 === 0;
};
