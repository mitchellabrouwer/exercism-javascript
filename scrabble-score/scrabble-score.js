const SCORE = {};
SCORE.setScore = function(letters, score) {
  while (letters.length) this[letters.pop()] = score;
};
SCORE.setScore(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"], 1);
SCORE.setScore(["D", "G"], 2);
SCORE.setScore(["B", "C", "M", "P"], 3);
SCORE.setScore(["F", "H", "V", "W", "Y"], 4);
SCORE.setScore(["K"], 5);
SCORE.setScore(["J", "X"], 8);
SCORE.setScore(["Q", "Z"], 10);

const LETTER_BONUS = {
  symbol: "*",
  "*": 2,
  "**": 3
};

const WORD_BONUS = {
  symbol: "!",
  "!": 2,
  "!!": 3
};

const VALIDATE = {
  onlyLetters: "[A-Z]",
  inputOrder: `^[A-Z${LETTER_BONUS.symbol}]+(${WORD_BONUS.symbol}{2}$|${WORD_BONUS.symbol}$|$)`,
  letterBonus: `((?<!\\${LETTER_BONUS.symbol})\\${LETTER_BONUS.symbol}{1,2}(?!\\${LETTER_BONUS.symbol}))`
};

class ScrabbleScorer {
  constructor(word) {
    this.word = [...word.toUpperCase()];
    this.assertFormat(this.word);
  }

  assertFormat(word) {
    const string = word.join("");
    const inputOrder = new RegExp(VALIDATE.inputOrder, "g");
    const letterBonus = new RegExp(VALIDATE.letterBonus, "g");

    if (!inputOrder.test(string)) {
      throw Error("please check input order and symbols used");
    }

    if (string.includes(LETTER_BONUS.symbol) && !letterBonus.test(string)) {
      throw Error("please check * used for double letters");
    }
  }

  isLetter(input) {
    return input.match(new RegExp(VALIDATE.onlyLetters, "g"));
  }

  isSymbol(symbol) {
    return symbol in { ...LETTER_BONUS, ...WORD_BONUS };
  }

  getScore(letter) {
    return SCORE[letter];
  }

  getNextSymbols(array, index) {
    let nextSymbols = [];
    while ((++index, this.isSymbol(array[index]))) {
      nextSymbols.push(array[index]);
    }
    return nextSymbols.join("");
  }

  calculate() {
    return this.word.reduce((sum, current, index, array) => {
      const score = this.getScore(current);
      const next = this.getNextSymbols(array, index);
      const bonus = LETTER_BONUS[next] || WORD_BONUS[next] || 1;
      if (next.length > 0) array.splice(index + 1, next.length);
      if (next in WORD_BONUS) return (sum = (sum + score) * bonus);
      return (sum += score * bonus);
    }, 0);
  }
}

export const score = word => {
  if (word === "") return 0;
  const scrabble = new ScrabbleScorer(word);
  return scrabble.calculate();
};
