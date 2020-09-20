export const find = (array, target) => {
  let start = 0;
  let end = array.length - 1;
  let middle;

  while (start <= end) {
    middle = Math.floor((start + end) / 2);
    if (target === array[middle]) {
      return middle;
    } else if (target < array[middle]) {
      end = middle - 1;
    } else if (target > array[middle]) {
      start = middle + 1;
    }
  }

  throw new Error('Value not in array');
};
