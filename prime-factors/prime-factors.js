const quotient = (dividend, divisor) => dividend / divisor;
const remainder = (dividend, divisor) => dividend % divisor;

export const primeFactors = (number) => {
  let primes = [];
  let divisor = 2;

  while (number > 1) {
    if (remainder(number, divisor) === 0) {
      number = quotient(number, divisor);
      primes.push(divisor);
    } else {
      divisor += 1;
    }
  }

  return primes;
};
