const PO = 'O';
const PX = 'X';

const MOVES = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
  // [-1, -1], illegal
  // [1, 1], illegal
];

const PO_POSSIBLE = (val, i) => (val === PO ? [[0, i]] : false);
const PX_POSSIBLE = (val, i) => (val[0] === PX ? [[i, 0]] : false);

export class Board {
  constructor(board) {
    this.board = board.map((row) => [...row.replace(/\s/g, '')]);
  }

  inBoard(y, x) {
    return y > -1 && y < this.board.length && x > -1 && x < this.board[0].length;
  }

  inArray(superset, subset) {
    const [y, x] = subset;
    return superset.some(([py, px]) => y === py && x === px);
  }

  correctMove(my, mx, player, seen) {
    return (
      this.inBoard(my, mx) &&
      this.board[my][mx] === player &&
      !this.inArray(seen, [my, mx])
    );
  }

  move([y, x], player, seen = [[y, x]]) {
    if (player === PO && y === this.board.length - 1) return player;
    if (player === PX && x === this.board[0].length - 1) return player;

    for (const [dy, dx] of MOVES) {
      const [my, mx] = [y + dy, x + dx];
      if (this.correctMove(my, mx, player, seen)) {
        seen.push([my, mx]);
        return this.move([my, mx], player, seen);
      }
    }

    return null;
  }

  canWin(player, fn) {
    const board = player === PO ? this.board[0] : this.board;

    for (let [[py, px]] of board.map(fn).filter(Boolean)) {
      if (this.move([py, px], player)) return player;
    }

    return null;
  }

  winner() {
    return this.canWin(PO, PO_POSSIBLE) || this.canWin(PX, PX_POSSIBLE) || '';
  }
}
