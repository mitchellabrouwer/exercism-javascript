const YACHT = 50;
const STRAIGHT = 30;

const GET_SCORE = {
  ones: (dice) => sum(dice.filter((die) => die === 1)),
  twos: (dice) => sum(dice.filter((die) => die === 2)),
  threes: (dice) => sum(dice.filter((die) => die === 3)),
  fours: (dice) => sum(dice.filter((die) => die === 4)),
  fives: (dice) => sum(dice.filter((die) => die === 5)),
  sixes: (dice) => sum(dice.filter((die) => die === 6)),
  full: (dice) => (set(dice).length === 2 ? fromCount(2, dice) * 2 + fromCount(3, dice) * 3 : 0),
  four: (dice) => (set(dice).length <= 2 ? (fromCount(4, dice) || fromCount(5, dice)) * 4 : 0),
  little: (dice) => (set(dice).length === 5 && sum(dice) === 15 ? STRAIGHT : 0),
  big: (dice) => (set(dice).length === 5 && sum(dice) === 20 ? STRAIGHT : 0),
  yacht: (dice) => (set(dice).length === 1 ? YACHT : 0),
  choice: (dice) => sum(dice),
};

const sum = (dice) => (dice.length ? dice.reduce((a, b) => a + b) : 0);
const fromCount = (count, dice) => dice.find((die) => frequency(die, dice) === count) || null;
const frequency = (die, dice) => dice.filter((d) => d === die).length;
const set = (dice) => [...new Set(dice)];
const parseCategory = (category) => category.split(' ').slice(0, 1).toString();

export const score = (dice, category) => GET_SCORE[parseCategory(category)](dice);
