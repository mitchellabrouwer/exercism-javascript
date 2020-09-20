const INSTRUCTIONS = { L: 'turnLeft', R: 'turnRight', A: 'advance' };
const DIRECTIONS = ['north', 'east', 'south', 'west'];
const DELTAS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

export class InvalidInputError extends Error {
  constructor(message) {
    super(message);
  }
}

export class Robot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
  }

  orient(direction) {
    if (DIRECTIONS.indexOf(direction) < 0)
      throw new InvalidInputError('invalid bearing');
    this.direction = DIRECTIONS.indexOf(direction);
  }

  get bearing() {
    return DIRECTIONS[this.direction];
  }

  get coordinates() {
    return [this.x, this.y];
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  turnLeft() {
    this.direction = (this.direction - 1 + 4) % 4;
  }

  at(x, y) {
    [this.x, this.y] = [x, y];
  }

  advance() {
    const [dx, dy] = DELTAS[this.direction];
    [this.x, this.y] = [this.x + dx, this.y + dy];
  }

  static instructions(letters) {
    return [...letters].map(letter => INSTRUCTIONS[letter]);
  }

  place(inputs) {
    ({ x: this.x, y: this.y, direction: this.direction } = inputs);
    this.direction = DIRECTIONS.indexOf(inputs.direction);
  }

  evaluate(letters) {
    [...letters].forEach(val => this[INSTRUCTIONS[val]]());
  }
}
