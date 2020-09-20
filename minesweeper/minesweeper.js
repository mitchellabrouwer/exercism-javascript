class MineGrid {
  constructor(grid) {
    this.grid = grid.map(row => row.split(""));
  }

  isMine(elm) {
    return elm === "*" ? true : false;
  }

  isValidRow(x) {
    return x >= 0 && x < this.grid.length;
  }

  updateRowLength(row, y) {
    return row.slice(y === 0 ? 0 : y - 1, y + 2);
  }

  countRow(row, y) {
    return this.updateRowLength(row, y).reduce(
      (acc, next) => (this.isMine(next) ? (acc += 1) : acc),
      0
    );
  }

  countGrid(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      count += this.isValidRow(x + i) ? this.countRow(this.grid[x + i], y) : 0;
    }
    return count === 0 ? " " : count;
  }

  visitEachSquare(callback) {
    return this.grid.forEach((row, x) =>
      row.forEach((content, y) => callback(x, y, content))
    );
  }
}

export const annotate = textGrid => {
  let game = new MineGrid(textGrid);

  game.visitEachSquare(
    (x, y, content) =>
      (content = game.isMine(content)
        ? "*"
        : (game.grid[x][y] = game.countGrid(x, y)))
  );

  return game.grid.map(row => row.join(""));
};
