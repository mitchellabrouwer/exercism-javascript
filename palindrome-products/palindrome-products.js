const isPalindrome = num => num === reverse(num);

const reverse = num => {
  let reversed = 0;
  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor((num /= 10));
  }
  return reversed;
};

export class Palindromes {
  static generate({ maxFactor, minFactor }) {
    if (minFactor > maxFactor) throw new Error('min must be <= max');

    let smallest = { value: Number.MAX_SAFE_INTEGER, factors: [] };
    let largest = { value: 0, factors: [] };

    for (let i = minFactor; i <= maxFactor; i += 1) {
      for (let j = i; j <= maxFactor; j += 1) {
        const product = i * j;
        if (product < smallest.value && isPalindrome(product)) {
          smallest = { value: product, factors: [[i, j]] };
        } else if (product > largest.value && isPalindrome(product)) {
          largest = { value: product, factors: [[i, j]] };
        } else if (product === smallest.value && isPalindrome(product)) {
          smallest.factors.push([i, j]);
        } else if (product === largest.value && isPalindrome(product)) {
          largest.factors.push([i, j]);
        }
      }
    }

    if (smallest.value === Number.MAX_SAFE_INTEGER) smallest.value = null;
    if (largest.value === 0) largest.value = null;

    return { smallest, largest };
  }
}
