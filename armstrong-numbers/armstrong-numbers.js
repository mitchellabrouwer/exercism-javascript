export const isArmstrongNumber = n =>
  String(n).split('').reduce((sum, n, _, arr) => sum + n ** arr.length, 0) === n;
