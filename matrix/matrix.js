export class Matrix {
  constructor(matrix) {
    this.matrix = matrix;
  }

  createMatrix(string) {
    return string.split('\n').map((arr) => arr.split(' ').map((n) => Number(n)));
  }

  transposeMatrix(string) {
    const matrix = this.createMatrix(string);
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  }

  get rows() {
    if (!this._rows) this._rows = this.createMatrix(this.matrix);
    return this._rows;
  }

  get columns() {
    if (!this._columns) this._columns = this.transposeMatrix(this.matrix);
    return this._columns;
  }
}
