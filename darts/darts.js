export const score = (a, b) => {
  const c = Math.sqrt(a ** 2 + b ** 2);
  return c <= 1 ? 10 : c <= 5 ? 5 : c <= 10 ? 1 : 0;
};
