const reduce = (xs, acc, f, i = 0) =>
  i == xs.length ? acc : reduce(xs, f(acc, xs[i]), f, (i += 1));

export class List {
  constructor(values) {
    this._values = values || [];
  }

  get values() {
    return [...this._values];
  }

  length() {
    return this._values.length;
  }

  append(list) {
    return new List([...this._values, ...list._values]);
  }

  concat({ _values }) {
    return new List(
      reduce(_values, [...this._values], (acc, el) => [...acc, ...el._values])
    );
  }

  filter(f) {
    return new List(
      reduce(this._values, [], (acc, el) => (f(el) ? [...acc, el] : [...acc]))
    );
  }

  reverse() {
    return new List(reduce(this._values, [], (acc, el) => [el, ...acc]));
  }

  map(f) {
    return new List(reduce(this._values, [], (acc, el) => [...acc, f(el)]));
  }

  foldr(f, acc) {
    return reduce(this.reverse(this._values)._values, acc, f);
  }

  foldl(f, acc) {
    return reduce(this._values, acc, f);
  }
}
