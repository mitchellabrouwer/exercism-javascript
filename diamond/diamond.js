const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export const rows = input => {
  const mid = alphabet.indexOf(input);
  const size = mid + mid + 1;

  return [...Array(size)]
    .map(_ => ' '.repeat(size).split(''))
    .map((row, i, { length }) => {
      if (i >= mid) i = length - 1 - i;
      row[mid + i] = alphabet[i];
      row[mid - i] = alphabet[i];
      return row.join('');
    });
};
