export class GradeSchool {
  #db = {}

  roster() {
    return Object.keys(this.#db).reduce((res, grade) => ({ ...res, [grade]: this.grade(grade) }), {})
  }

  add(name, grade) {
    this.#db[grade] = this.grade(grade).concat(name).sort()
  }

  grade(grade) {
    this.#db[grade] = this.#db[grade] ?? []
    return [...this.#db[grade]]
  }
}

//
// This is only a SKELETON file for the 'Grade School' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// export class GradeSchool {
//   constructor() {
//     this.schoolList = {}
//   }

//   roster() {
//     // take all the key/value pairs of the schoolList object (Object.entries)
//     // create an initial empty object "list", accumulator array of the grade and the students in that grade (reduce method)
//     // each loop, take all the previous grades and add another key/value pair with the values from accumulator variable (return object of reduce method)
//     return Object.entries(this.schoolList).reduce((list, [grade, students]) => {
//       return {
//         ...list,
//         [grade]: [...students],
//       }
//     }, {})
//   }

//   add(student, grade) {
//     if (this.schoolList[grade]) {
//       this.schoolList[grade].push(student)
//       this.schoolList[grade].sort()
//     } else {
//       this.schoolList[grade] = [student]
//     }
//   }

//   grade(grade) {
//     return this.roster()[grade] || []
//   }
// }

// export class GradeSchool {
//   constructor() {
//     this._db = {}
//   }

//   roster() {
//     return this.deepCopy(this._db)
//   }

//   add(name, grade) {
//     this._db[grade] ? this._db[grade].push(name) : (this._db[grade] = [name])
//     this._db[grade].sort()
//   }

//   grade(grade) {
//     return this._db[grade] ? this.deepCopy(this._db[grade]) : []
//   }

//   deepCopy(obj) {
//     if (!obj || obj === null) return obj
//     let copy = Array.isArray(obj) ? [...obj] : { ...obj }

//     Object.keys(copy).forEach((key) => {
//       if (typeof copy[key] === 'object') {
//         copy[key] = this.deepCopy(copy[key])
//       }
//     })

//     return copy
//   }
// }

// const school = new GradeSchool();

// school.add("Aimee", 2);
// const roster = school.roster();
// roster[2].push("Oops.");
// console.log(school.roster());

// school.add("Aimee", 2);
// school.grade(2).push("Oops.");
// console.log(school.roster());

// export default class GradeSchool {
//   private _db: Map<number, string[]>;

//   constructor() {
//     this._db = new Map();
//   }

//   studentRoster() {
//     const copy: Map<string, string[]> = new Map();
//     for (const [grade, names] of this._db.entries()) {
//       copy.set(String(grade), [...names]);
//     }
//     return copy;
//   }

//   addStudent(name: string, grade: number) {
//     this._db.set(grade, [...this.studentsInGrade(grade), name].sort());
//   }

//   studentsInGrade(grade: number) {
//     return [...(this._db.get(grade) || [])];
//   }
// }
