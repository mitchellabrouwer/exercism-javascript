const head = Symbol('head');
const count = Symbol('count');

export class Element {
  constructor(value, next) {
    this.value = value || null;
    this.next = next || null;
  }
}

export class List {
  constructor(xs = []) {
    this[head] = null;
    this[count] = 0;
    xs.forEach(val => this.add(new Element(val)));
  }

  add(nextValue) {
    if (this[head]) nextValue.next = this[head];
    this[head] = nextValue;
    this[count]++;
  }

  get length() {
    return this[count];
  }

  get head() {
    return this[head];
  }

  toArray(xs = [], elm = this[head]) {
    return xs.length < this.length ? this.toArray(xs.concat(elm.value), elm.next) : xs;
  }

  reverse() {
    return new List([this.toArray().reverse()]);
  }
}
