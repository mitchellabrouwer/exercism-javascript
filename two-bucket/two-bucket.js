export class TwoBucket {
  constructor(buckOne, buckTwo, target, start) {
    this._capacity = start === 'one' ? [buckOne, buckTwo] : [buckTwo, buckOne];
    this._target = target;
    this._goalBucket = start;
  }

  transfer(a, b, B) {
    let available = B - b;
    if (available > a) return [0, b + a];
    return [a - available, b + available];
  }

  moves() {
    let [A, B] = this._capacity;
    let [a, b] = [A, 0];
    let moves = 1;

    while (a !== this._target) {
      if (b === B) {
        b = 0;
        moves += 1;
      }
      if (a === 0) {
        a = A;
        moves += 1;
      }
      [a, b] = this.transfer(a, b, B);
      moves += 1;
    }

    this._otherBucket = b;
    return moves;
  }

  get goalBucket() {
    return this._goalBucket;
  }

  get otherBucket() {
    return this._otherBucket;
  }
}
