const strain = (xs, fn, acc = [], i = 0) =>
  xs.length === i ? acc : strain(xs, fn, fn(xs[i]) ? [...acc, xs[i]] : acc, i + 1);

const not = (predicate) => (element) => !predicate(element);

export const keep = (xs, cb) => strain(xs, cb);

export const discard = (xs, cb) => strain(xs, not(cb));
