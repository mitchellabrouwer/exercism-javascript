const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];
const KEY = 25;
const SIZE = 5;

const cipher = (match) => ALPHABET[KEY - ALPHABET.indexOf(match)];
const toChunks = (string) => string.match(new RegExp(`.{1,${SIZE}}`, 'g')).join(' ');
const parse = (string) => string.toLowerCase().replace(/[^a-z1-9]/g, '');

export const encode = (string) => toChunks(parse(string).replace(/[a-z]/g, cipher));

export const decode = (string) => string.replace(/[a-z]/g, cipher).replace(/\s/g, '');
