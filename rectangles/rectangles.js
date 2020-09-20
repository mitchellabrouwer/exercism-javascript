const CORNER = '+';
const VERTICAL = /\||\+/;
const HORIZONTAL = /^\+(-|\+)*\+$/;

export class Rectangles {
  static count(grid) {
    let count = 0;
    grid.forEach((row, y) =>
      [...row].forEach((elm, x) =>
        elm === CORNER ? count += this.countFromLocation(grid, y, x) : count
      )
    );
    return count;
  }

  static countFromLocation(grid, y1, x1) {
    return grid
      .slice(y1)
      .map((row) => row.slice(x1))
      .map((line, y2) =>
        [...line].reduce(
          (sum, elm, x2) =>
            x2 > 0 && y2 > 0 && elm === CORNER
              ? sum + isValid(getRectangle(grid, x1, x2, y1, y2))
              : sum,
          0
        )
      )
      .reduce((a, b) => a + b);
  }
}

const getRectangle = (arr, x1, x2, y1, y2) => arr.slice(y1, y1 + y2 + 1).map((val) => val.slice(x1, x2 + x1 + 1));
const isValid = (arr) => (hasHorizontals(arr) && hasVerticals(arr) ? 1 : 0);
const hasHorizontals = (arr) => HORIZONTAL.test(first(arr)) && HORIZONTAL.test(last(arr));
const hasVerticals = (arr) => arr.every((row) => VERTICAL.test(first(row)) && VERTICAL.test(last(row)));
const first = (value) => value[0];
const last = (value) => value[value.length - 1];