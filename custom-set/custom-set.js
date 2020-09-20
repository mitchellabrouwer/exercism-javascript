export class CustomSet {
  constructor(set = []) {
    this._set = this.uniques(set);
  }

  get size() {
    return this._set.length;
  }

  uniques(arr) {
    return [...arr].filter((val, idx) => arr.indexOf(val) === idx);
  }

  empty() {
    return this.size === 0;
  }

  contains(item) {
    return this._set.includes(item);
  }

  eql({ _set }) {
    return _set.length === this.size && _set.every(val => this._set.includes(val));
  }

  add(item) {
    this._set = this.uniques([...this._set, item]);
    return this;
  }

  subset({ _set }) {
    return this._set.every(val => _set.includes(val));
  }

  disjoint({ _set }) {
    return this._set.every(val => !_set.includes(val));
  }

  intersection({ _set }) {
    return new CustomSet(this._set.filter(val => _set.includes(val)));
  }

  difference({ _set }) {
    return new CustomSet(this._set.filter(val => !_set.includes(val)));
  }

  union({ _set }) {
    return new CustomSet([..._set, ...this._set]);
  }
}
