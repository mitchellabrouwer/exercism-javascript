export const accumulate = (xs, f, acc = [], i = 0) =>
  i === xs.length ? acc : accumulate(xs, f, [...acc, f(xs[i])], (i += 1));
