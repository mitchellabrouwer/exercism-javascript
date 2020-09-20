const OHMS_IN_KILOOHM = 1000;
const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export class ResistorColorTrio {
  constructor([a, b, c]) {
    this._one = COLORS.indexOf(a);
    this._two = COLORS.indexOf(b);
    this._exp = COLORS.indexOf(c);
  }

  get label() {
    if ([this._one, this._two, this._exp].includes(-1))
      throw new Error('invalid color');

    if (!this._val)
      this._val = Number(`${this._one}${this._two}`.padEnd(this._exp + 2, '0'));

    return this._val < OHMS_IN_KILOOHM
      ? `Resistor value: ${this._val} ohms`
      : `Resistor value: ${this._val / OHMS_IN_KILOOHM} kiloohms`;
  }
}
