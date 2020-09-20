export class List {
  constructor(xs = []) {
    this._xs = xs;
  }

  get xs() {
    return this._xs;
  }

  isEqual(xsA, xsB) {
    return xsA.length === xsB.length && xsA.every((val, i) => val === xsB[i]);
  }

  contains(xsS, xsL) {
    return xsS.length === 0
      ? true
      : xsL.reduce(
          (acc, num, idx) =>
            num === xsS[0] && this.isEqual(xsL.slice(idx, idx + xsS.length), xsS)
              ? true
              : acc,
          false
        );
  }

  compare({ xs }) {
    if (this.isEqual(this.xs, xs)) return 'EQUAL';

    if (this.xs.length < xs.length && this.contains(this.xs, xs)) return 'SUBLIST';
    if (this.xs.length > xs.length && this.contains(xs, this.xs)) return 'SUPERLIST';

    return 'UNEQUAL';
  }
}
