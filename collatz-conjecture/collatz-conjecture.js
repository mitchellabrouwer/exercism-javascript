export const steps = n => {
  let steps = 0;
  const isEven = n => n % 2 === 0;

  if (n <= 0) throw new Error("Only positive numbers are allowed");

  while (n !== 1) {
    n = isEven(n) ? n / 2 : n * 3 + 1;
    steps++;
  }

  return steps;
};
