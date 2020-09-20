export class Triangle {
  constructor(a, b, c) {
    this.sides = [a, b, c];
  }

  isValid() {
    const total = this.sides.reduce((a, b) => a + b);
    return this.sides.every(side => total - side >= side && side > 0);
  }

  isDegenerate() {
    const [a, b, c] = this.sides;
    return a + b === c || b + c === a || c + a === b;
  }

  matchingSides() {
    const [a, b, c] = this.sides;
    if (a === b && b === c && c === a) return 3;
    if (a === b || b === c || c === a) return 2;
    return 0;
  }

  kind() {
    if (!this.isValid()) throw "must be a valid triangle";
    if (this.isDegenerate()) return "degenerate";

    switch (this.matchingSides()) {
      case 3:
        return "equilateral";
      case 2:
        return "isosceles";
      case 0:
        return "scalene";
    }
  }
}
