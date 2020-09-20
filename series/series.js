export class Series {
  constructor(digits) {
    this._digits = [...digits].map(Number);
  }

  get digits() {
    return this._digits;
  }

  slices(num) {
    if (num > this._digits.length) throw new Error('Slice size is too big.');
    return [...this._digits].reduce(
      (acc, _, idx, arr) =>
        idx + num <= this._digits.length ? acc.concat([arr.slice(idx, idx + num)]) : acc,
      []
    );
  }
}
