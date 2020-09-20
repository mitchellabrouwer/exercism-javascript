const isPrime = num => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return true;
};

export const prime = nth => {
  if (nth === 0) throw new Error('there is no zeroth prime');

  let n = 1;
  let count = 0;
  while (count < nth) {
    n += 1;
    if (isPrime(n)) count += 1;
  }

  return n;
};
