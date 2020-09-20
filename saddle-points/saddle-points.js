const validColumn = (idx, arr) => arr.every(val => val >= arr[idx]);
const validRow = (idx, arr) => arr.every(val => val <= arr[idx]);

export const saddlePoints = grid => {
  let saddlePoints = [];
  grid.forEach((line, y) => [...line]
    .forEach((num, x) => {
      if (validColumn(y, grid.map(arr => arr[x])) && validRow(x, grid[y])) {
        saddlePoints.push({ row: y + 1, column: x + 1 })
      }
    })
  );
  return saddlePoints;
};
