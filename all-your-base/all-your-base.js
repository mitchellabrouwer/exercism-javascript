const hasValidBase = base => Number.isInteger(base) && base > 1;

const hasValidDigits = (digits, base) =>
  (digits[0] === 0 && digits.length === 1) ||
  (digits[0] !== 0 && digits.length > 0 && digits.every(dig => dig > -1 && dig < base));

const toDecimal = (digits, inputBase) =>
  digits.reverse().reduce((total, dig, idx) => total + dig * inputBase ** idx, 0);

export const convert = (inputDigits, inputBase, outputBase) => {
  if (!hasValidBase(inputBase)) throw Error('Wrong input base');
  if (!hasValidBase(outputBase)) throw Error('Wrong output base');
  if (!hasValidDigits(inputDigits, inputBase)) throw Error('Input has wrong format');

  const outputDigits = [];
  let quotent = toDecimal(inputDigits, inputBase);
  while (quotent > 0) {
    outputDigits.unshift(quotent % outputBase);
    quotent = Math.floor(quotent / outputBase);
  }

  return outputDigits.length === 0 ? [0] : outputDigits;
};
