const PRESENTS = [
  'a Partridge in a Pear Tree',
  'two Turtle Doves, ',
  'three French Hens, ',
  'four Calling Birds, ',
  'five Gold Rings, ',
  'six Geese-a-Laying, ',
  'seven Swans-a-Swimming, ',
  'eight Maids-a-Milking, ',
  'nine Ladies Dancing, ',
  'ten Lords-a-Leaping, ',
  'eleven Pipers Piping, ',
  'twelve Drummers Drumming, ',
];

const ORDINAL = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
];

const line = (day) => `On the ${ORDINAL[day]} day of Christmas my true love gave to me: `;

const presents = (day) => PRESENTS.slice(1, day + 1).reverse().join('');

const last = (day) => `${day > 0 ? 'and ' : ''}${PRESENTS[0]}.\n`;

export const recite = (start, end = start) =>
  [...Array(end + 1 - start)]
    .map((_, i) => start - 1 + i)
    .map((day) => line(day) + presents(day) + last(day))
    .join('\n');

