const DELTAS = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0]
];

export class WordSearch {
  constructor(grid) {
    this.grid = grid.map(str => str.split(''));
  }

  validSquare(y, x) {
    return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length;
  }

  hasWord(word, row, col, grid) {
    const found = {};
    const letters = [...word];

    DELTAS.forEach(([dy, dx]) => {
      let [y, x] = [row, col];
      let cursor = 0;

      while (this.validSquare(y, x, grid) && grid[y][x] === letters[cursor]) {
        if (cursor === word.length - 1)
          found[word] = { start: [row + 1, col + 1], end: [y + 1, x + 1] };
        [y, x] = [y + dy, x + dx];
        cursor += 1;
      }
    });

    return found;
  }

  find(words) {
    return words.reduce((found, word) => {
      this.grid.forEach((line, y) =>
        [...line].forEach((num, x) =>
          Object.assign(found, this.hasWord(word, y, x, this.grid))
        )
      );
      return found;
    }, {});
  }
}

export default WordSearch;
