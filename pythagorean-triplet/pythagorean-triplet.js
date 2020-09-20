export class Triplet {
  constructor(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
  }

  sum() {
    return this.a + this.b + this.c
  }

  product() {
    return this.a * this.b * this.c
  }

  isPythagorean() {
    return this.a ** 2 + this.b ** 2 === this.c ** 2
  }

  static where({ maxFactor, minFactor, sum }) {
    return [...generateTriplets(maxFactor, minFactor, sum)]
  }
}

function* generateTriplets(maxFactor, minFactor = 2, sum) {
  if (!maxFactor) throw new Error('max factor required')
  for (let a = minFactor; a < maxFactor + 1; a++) {
    for (let b = a + 1; b < maxFactor; b++) {
      let c = Math.sqrt(a ** 2 + b ** 2)
      const triplet = new Triplet(a, b, c)
      if (c % 1 === 0 && triplet.isPythagorean() && (!sum || sum === triplet.sum()))
        yield triplet
    }
  }
}
