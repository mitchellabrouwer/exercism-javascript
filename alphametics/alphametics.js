const BASE = 10;

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const divide = (n, d) => ({ quot: Math.floor(n / d), rem: n % d });

// const permute = (index, length) => {
//   let { quot, rem } = divide(index, NUMBERS.length);
//   let perm = [NUMBERS[rem]];

//   while (--length) {
//     ({ quot, rem } = divide(quot, NUMBERS.length));
//     perm.push(NUMBERS[rem]);
//   }

//   return perm;
// };

const toObject = (keys, vals) =>
  Object.assign(...keys.map((key, i) => ({ [key]: vals[i] })));

const expand = string =>
  string
    .split(' + ')
    .map(word =>
      [...word]
        .reverse()
        .map((char, i) => (i > 0 ? `${char}*${BASE ** i}` : char))
        .join('+')
    )
    .join('+');

const buildSolver = (left, right, leading, uniques) => {
  const isValid = `${expand(left)} == ${expand(right)}`;
  const hasNoLeadingZero = leading.map(val => `${val}!==0`).join('&&');
  // const isUnique = uniques.map(val => `${val}!)

  return new Function(
    `${uniques.toString()}`,
    `return ${isValid} && ${hasNoLeadingZero}`
  );
};

export const solve = puzzle => {
  const [left, right] = puzzle.split(/ == /);
  const leading = [...new Set(puzzle.match(/[A-Z]+/g).map(w => w[0]))];
  const uniques = [...new Set([right[0], ...puzzle.match(/[A-Z]/g)])];

  const solver = buildSolver(left, right, leading, uniques);

  let length = uniques.length;
  for (let index = 0; index < BASE ** uniques.length; index += 1) {
    let { quot, rem } = divide(index, NUMBERS.length);
    let perm = [NUMBERS[rem]];

    while (--length) {
      ({ quot, rem } = divide(quot, NUMBERS.length));
      perm.push(NUMBERS[rem]);
    }

    const isSolved = solver(...perm);
    if (isSolved) return toObject(uniques, perm);

    length = uniques.length;
  }

  return null;
};

// const puzzle = 'I + BB == ILL';
// // const expected = {
// //   I: 1,
// //   B: 9,
// //   L: 0
// // };
// console.log(solve(puzzle)); //.toEqual(expected);
