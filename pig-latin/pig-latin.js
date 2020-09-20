const vowel = /^(?=yt)|^(?=xr)|^(?=[aeiou])/g;
const consonant = /(^[bcdfghfjklmpqrstvwxyz]{1})(qu)?/g;
const clusters = /^thr|^sch|^sh|^ch|^th|^qu|^rh/g;
const regexs = [clusters, vowel, consonant];

const append = (sub, str) => (sub ? str.slice(sub[0].length) + sub[0] + 'ay' : null);

export class translator {
  static translate(str) {
    return str
      .split(' ')
      .map(word => regexs.map(val => append(word.match(val), word)).find(val => val))
      .join(' ');
  }
}
