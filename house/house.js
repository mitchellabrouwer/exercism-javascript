const SENTENCE = 'This is the house that Jack built.';
const INSERT = 8;
const PHRASES = [
  { noun: 'malt', verb: 'lay in' },
  { noun: 'rat', verb: 'ate' },
  { noun: 'cat', verb: 'killed' },
  { noun: 'dog', verb: 'worried' },
  { noun: 'cow with the crumpled horn', verb: 'tossed' },
  { noun: 'maiden all forlorn', verb: 'milked' },
  { noun: 'man all tattered and torn', verb: 'kissed' },
  { noun: 'priest all shaven and shorn', verb: 'married' },
  { noun: 'rooster that crowed in the morn', verb: 'woke' },
  { noun: 'farmer sowing his corn', verb: 'kept' },
  { noun: 'horse and the hound and the horn', verb: 'belonged to' }
];

const insert = (str, idx, val) => str.substr(0, idx) + val + str.substr(idx);
const phrase = idx => `the ${PHRASES[idx].noun}\nthat ${PHRASES[idx].verb} `;
const getVerse = (num, str = SENTENCE, idx = 0) =>
  idx === num ? str : getVerse(num, insert(str, INSERT, phrase(idx)), (idx += 1));

export class House {
  static verse(num) {
    return getVerse(num - 1).split('\n');
  }

  static verses(start, end) {
    return [...Array(end - start + 1)]
      .map((_, idx) => [...this.verse(idx + start), ''])
      .reduce((a, b) => a.concat(b), [])
      .slice(0, -1);
  }
}
