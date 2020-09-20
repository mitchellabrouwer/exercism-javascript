class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Argument Error';
  }
}

class Wordy {
  constructor(question) {
    this._question = question.replace(/\?|(?<=\d+)th|st|nd|rd/g, '').split(' ');
  }

  answer() {
    return reduce(parse(assertQuestion(this._question.slice())));
  }
}

export { Wordy as WordProblem, ArgumentError };

const words = ['What', 'is', 'by', 'to', 'the', 'power']
const ops = {
  raised: (a, b) => a ** b,
  minus: (a, b) => a - b,
  plus: (a, b) => a + b,
  divided: (a, b) => a / b,
  multiplied: (a, b) => a * b,
};

const assertQuestion = arr => {
  if (!arr.every(val => ops[val] || words.indexOf(val) > -1 || !isNaN(val)))
    throw new ArgumentError('check format');
  return [...arr];
};

const parse = arr => arr.map(elm => !isNaN(elm) ? +elm : elm)
  .filter(elm => !isNaN(elm) || elm in ops)
const splice = (array, start = 0, deleteCount = 0, ...items) =>
  [...array.slice(0, start), ...items, ...array.slice(start + deleteCount)];
const calculate = (exp, idx) =>
  reduce(splice(exp, idx - 1, 3, ops[exp[idx]](exp[idx - 1], exp[idx + 1])))
const reduce = (exp, idx = 0) => {
  if (exp.length === 1) return exp[0];
  return !isNaN(exp[idx]) ? reduce([...exp], (idx += 1)) : calculate(exp, idx);
};

