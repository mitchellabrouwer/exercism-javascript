const WHITE = 'W';
const BLACK = 'B';
const BOARD_WIDTH = 8;
const EMPTY_SQUARE = '_';

class Board {
  static build(pieceOn) {
    let board = '';
    for (let rank = 0; rank < BOARD_WIDTH; rank++) {
      for (let file = 0; file < BOARD_WIDTH; file++) {
        board += `${pieceOn(new Square([rank, file]))} `;
      }
      board = board.trim() + '\n';
    }
    return board;
  }
}

class Square {
  constructor([rank, file]) {
    this.rank = rank;
    this.file = file;
  }

  sameSquare(square) {
    return this.file === square.file && this.rank === square.rank;
  }

  sameRow(square) {
    return this.rank === square.rank;
  }

  sameColumn(square) {
    return this.file === square.file;
  }

  inDiagonal(square) {
    return Math.abs(this.file - square.file) === Math.abs(this.rank - square.rank);
  }
}

class Piece extends Square {
  constructor(square, icon) {
    super(square);
    this.icon = icon;
  }
}

export class QueenAttack {
  constructor({ white = [0, 3], black = [7, 3] } = {}) {
    this.white = white;
    this.black = black;
    this.whiteQueen = new Piece(white, WHITE);
    this.blackQueen = new Piece(black, BLACK);

    if (this.whiteQueen.sameSquare(this.blackQueen)) {
      throw new Error(`Queens cannot share the same space`);
    }
  }

  toString() {
    return Board.build((square) => this.pieceOn(square));
  }

  pieceOn(square) {
    for (const queen of [this.blackQueen, this.whiteQueen]) {
      if (square.sameSquare(queen)) return queen.icon;
    }
    return EMPTY_SQUARE;
  }

  canAttack() {
    return (
      this.whiteQueen.sameRow(this.blackQueen) ||
      this.whiteQueen.sameColumn(this.blackQueen) ||
      this.whiteQueen.inDiagonal(this.blackQueen)
    );
  }
}
