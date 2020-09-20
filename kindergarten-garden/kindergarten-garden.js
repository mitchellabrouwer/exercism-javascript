const PLANTS = { V: 'violets', C: 'clover', G: 'grass', R: 'radishes' };
const STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry'
];

export class Garden {
  constructor(diagram, students = STUDENTS) {
    students.sort().forEach((name, idx) => {
      Object.defineProperty(this, name.toLowerCase(), {
        get: function() {
          return diagram
            .split('\n')
            .map(row => [...row].slice((idx + 1) * 2 - 2, (idx + 1) * 2))
            .reduce((plants, [a, b]) => plants.concat(PLANTS[a], PLANTS[b]), []);
        }
      });
    });
  }
}
