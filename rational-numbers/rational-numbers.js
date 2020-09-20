export class Rational {
  constructor(a, b) {
    const gcf = this.greatestCommonFactor(a, b) * Math.sign(b);
    this.a = a / gcf;
    this.b = b / gcf;
  }

  greatestCommonFactor(a, b) {
    return !b ? a : Math.abs(this.greatestCommonFactor(b, a % b));
  }

  reduce() {
    return new Rational(this.a, this.b);
  }

  abs() {
    return new Rational(Math.abs(this.a), Math.abs(this.b)).reduce();
  }

  add({ a: a2, b: b2 }) {
    return new Rational(this.a * b2 + a2 * this.b, this.b * b2).reduce();
  }

  sub({ a: a2, b: b2 }) {
    return new Rational(this.a * b2 - a2 * this.b, this.b * b2).reduce();
  }

  mul({ a: a2, b: b2 }) {
    return new Rational(this.a * a2, this.b * b2).reduce();
  }

  div({ a: a2, b: b2 }) {
    return new Rational(this.a * b2, a2 * this.b).reduce();
  }

  exprational(x) {
    return new Rational(this.a ** Math.abs(x), this.b ** Math.abs(x));
  }

  expreal(x) {
    return Math.round(Math.pow(x ** this.a, 1 / this.b) * 100) / 100;
  }
}
