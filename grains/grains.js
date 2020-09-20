import BigInt from './lib/big-integer';

export const square = n => {
  if (n < 1 || n > 64) throw new Error('square must be between 1 and 64');
  return (BigInt(2).pow(n - 1).toString());
};

export const total = () =>
  (BigInt(2).pow(64).minus(1).toString());
