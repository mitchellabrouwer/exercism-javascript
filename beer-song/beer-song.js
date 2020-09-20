const getVerse = (bottles) => {
  if (bottles === 0)
    return [
      'No more bottles of beer on the wall, no more bottles of beer.',
      'Go to the store and buy some more, 99 bottles of beer on the wall.',
    ];
  if (bottles === 1)
    return [
      '1 bottle of beer on the wall, 1 bottle of beer.',
      'Take it down and pass it around, no more bottles of beer on the wall.',
    ];
  if (bottles === 2)
    return [
      '2 bottles of beer on the wall, 2 bottles of beer.',
      'Take one down and pass it around, 1 bottle of beer on the wall.',
    ];
  else
    return [
      `${bottles} bottles of beer on the wall, ${bottles} bottles of beer.`,
      `Take one down and pass it around, ${bottles - 1} bottles of beer on the wall.`,
    ];
};

const getSong = (bottles, count, song = []) => {
  if (count === 0) return song.slice(0, -1);
  return getSong(bottles - 1, count - 1, song.concat(getVerse(bottles), ['']));
};

export const recite = (bottles, count) => {
  if (count === 1) return bottles === 0 ? getVerse(bottles).slice(0, -1) : getVerse(bottles);
  return getSong(bottles, count);
};
