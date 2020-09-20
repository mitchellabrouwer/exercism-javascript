const WORDS = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand',
  1e6: 'million',
  1e9: 'billion'
};

export class Say {
  static chunk(num) {
    return String(num).match(/\d{1,3}(?=(\d{3})+(?!\d))|\d{1,3}$/g);
  }

  static toWord(chunk, exp) {
    if (!Number(chunk)) return '';
    const [one, ten = 0, hun = 0] = [...chunk].reverse().map(Number);

    const ones = ten === 1 ? `${WORDS[one + ten * 10] || ''}` : `${WORDS[one] || ''}`;
    const tens = ten >= 2 ? `${WORDS[ten * 10]}` : '';
    const huns = hun > 0 ? `${WORDS[hun]} ${WORDS[100]} ` : '';
    const scale = exp > 0 ? ` ${WORDS[1000 ** exp]} ` : '';
    const separator = one !== 0 && ten > 1 ? '-' : '';

    return huns + tens + separator + ones + scale;
  }

  inEnglish(number) {
    if (number === 0) return 'zero';
    if (number < 0 || number >= 1e12)
      throw new Error('Number must be between 0 and 999,999,999,999.');

    return this.chunk(number)
      .map((chunk, i, arr) => this.toWord(chunk, arr.length - 1 - i))
      .join('')
      .trim('');
  }
}
