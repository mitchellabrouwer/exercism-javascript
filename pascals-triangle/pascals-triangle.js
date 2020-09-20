// export class Triangle {
//   constructor(height) {
//     this.height = height;
//   }

//   calculateEntry(prevRow, i) {
//     return prevRow[i - 1] + prevRow[i];
//   }

//   createRow(prevRow, length) {
//     return [...Array(length)].map((_entry, i) =>
//       i == 0 || i == length - 1 ? 1 : this.calculateEntry(prevRow, i)
//     );
//   }

//   createTriangle(height) {
//     let tri = [[1]];
//     while (tri.length < height) {
//       tri.push(this.createRow(tri[tri.length - 1], tri.length + 1));
//     }
//     return tri;
//   }

//   get lastRow() {
//     if (!this._lastRow) this._lastRow = this.rows[this.height - 1];
//     return this._lastRow;
//   }

//   get rows() {
//     if (!this._rows) this._rows = this.createTriangle(this.height);
//     return this._rows;
//   }
// }

// export const rows = (num) =>
//   [...Array(num).keys()].reduce((result, , rowIndex) => {
//     const prevRow = result[rowIndex - 1] || []

//     // const row = [...Array(rowIndex + 1)].map(
//     //   (_, columnIndex) =>
//     //     (prevRow[columnIndex - 1] || 0) + (prevRow[columnIndex] || 0) || 1
//     // )

//     const row = [...Array(rowIndex + 1)].map((_, columnIndex) => {
//       const left = prevRow[columnIndex - 1] || 0
//       const right = prevRow[columnIndex] || 0
//       return left + right || 1
//     })

//     return [...result, row]
//   }, [])


  constructor(n) {
    this.triangle = [...Array(n).keys()].map(this.pascal)
  }

  pascal(n) {
    return [...Array(n).keys()].reduce((acc, key) =>
      [...acc, acc[key] * (n- key) / (key + 1)], [1])
  }

  get lastRow() {
    return this.rows[this.rows.length -1]
  }

  get rows() {
    return this.triangle
  }