const pipe = (...fns) => (nums, len) => fns.forEach(fn => fn(nums, len));

const assertLength = (nums, len) => {
  if (len > 11) throw new Error('More than 11 digits');
  if (len < 10) throw new Error('Incorrect number of digits');
  if (len === 11 && nums[0] !== '1') throw new Error('11 digits must start with 1');
};

const assertCodes = (nums, len) => {
  if (nums[len - 10] === '0') throw new Error('Area code cannot start with zero');
  if (nums[len - 10] === '1') throw new Error('Area code cannot start with one');
  if (nums[len - 7] === '0') throw new Error('Exchange code cannot start with zero');
  if (nums[len - 7] === '1') throw new Error('Exchange code cannot start with one');
};

export const clean = str => {
  if (/[A-Za-z]/g.test(str)) throw new Error('Letters not permitted');
  if (/[?@:!,;]/g.test(str)) throw new Error('Punctuations not permitted');

  const nums = str.match(/\d+/g).join('');
  pipe(assertLength, assertCodes)(nums, nums.length);

  return nums.slice(-10);
};
