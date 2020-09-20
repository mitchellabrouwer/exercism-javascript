export const flatten = (arr, acc = []) => {
  if (!arr) return acc;

  Object.keys(arr).forEach(key => {
    typeof arr[key] !== 'object' && arr[key] !== undefined
      ? acc.push(arr[key])
      : flatten(arr[key], acc);
  });

  return acc;
};
