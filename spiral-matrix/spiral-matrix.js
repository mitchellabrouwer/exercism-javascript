const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];
const UP = [0, -1];
const MOVE = [RIGHT, DOWN, LEFT, UP];

export class SpiralMatrix {
  constructor(size) {
    this.matrix = this.buildMatrix(size);
    this.squares = size * size;
  }

  buildMatrix(size) {
    return [...Array(size)].map((_) => [...Array(size)].map((_) => null));
  }

  peekNextSquare(x, y, moveCursor) {
    const [dx, dy] = MOVE[moveCursor];
    return this.matrix[y + dy] && this.matrix[y + dy][x + dx];
  }

  turn(moveCursor) {
    return (moveCursor + 1) % MOVE.length;
  }

  moveInDirection(x, y, moveCursor) {
    const [dx, dy] = MOVE[moveCursor];
    return [x + dx, y + dy];
  }

  createSpiral() {
    let x = 0;
    let y = 0;
    let moveCursor = 0;
    let squareCounter = 0;

    while (squareCounter++ < this.squares) {
      this.matrix[y][x] = squareCounter;
      if (this.peekNextSquare(x, y, moveCursor) !== null) {
        moveCursor = this.turn(moveCursor);
      }
      [x, y] = this.moveInDirection(x, y, moveCursor);
    }
  }

  static ofSize(size) {
    const spiral = new SpiralMatrix(size);
    spiral.createSpiral();
    return spiral.matrix;
  }
}
