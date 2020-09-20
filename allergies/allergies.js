let BITMASKS = new Map([
  ['eggs', 1],
  ['peanuts', 2],
  ['shellfish', 4],
  ['strawberries', 8],
  ['tomatoes', 16],
  ['chocolate', 32],
  ['pollen', 64],
  ['cats', 128]
]);

export class Allergies {
  constructor(bitmask) {
    this.allergies = bitmask;
  }

  list() {
    let list = [];
    for (const [allergen, flag] of BITMASKS.entries()) {
      if (this.allergies & flag) {
        list.push(allergen);
      }
    }
    return list;
  }

  allergicTo(allergen) {
    return this.allergies & BITMASKS.get(allergen) ? true : false;
  }
}
