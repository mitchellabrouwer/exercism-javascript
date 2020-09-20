const animals = ['fly', 'spider', 'bird', 'cat', 'dog', 'goat', 'cow', 'horse'];

const pipe = (...fns) => (arr, animal) => fns.reduce((arg, fn) => fn(arg)(animal), arr);

const one = arr => animal => arr.concat(`I know an old lady who swallowed a ${animal}.`);

const two = arr => animal =>
  arr.concat({
    bird: 'How absurd to swallow a bird!',
    cat: 'Imagine that, to swallow a cat!',
    dog: 'What a hog, to swallow a dog!',
    goat: 'Just opened her throat and swallowed a goat!',
    cow: `I don't know how she swallowed a cow!`,
    spider: `It wriggled and jiggled and tickled inside her.`
  }[animal] || []);

const body = arr => animal =>
  arr.concat(animal !== 'horse' ? [...Array(animals.indexOf(animal))]
    .map((u, i) =>
      `She swallowed the ${animals[i + 1]} to catch the ${animals[i]}` +
      `${animals[i] === 'spider' ? ' that wriggled and jiggled and tickled inside her' : ''}.`)
    .reverse()
    : []);

const last = arr => animal =>
  arr.concat(animal !== 'horse'
    ? `I don't know why she swallowed the fly. Perhaps she'll die.`
    : `She's dead, of course!`
  );

export class Song {
  verse(number) {
    return pipe(one, two, body, last)([], animals[number - 1]).join('\n') + '\n';
  }

  verses(start, finish) {
    return [...Array(finish)].map((u, i) => this.verse(i + start)).join('\n') + '\n'
  }
}