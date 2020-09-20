const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];
const KEY_LEN = 100;

const random = max => Math.floor(Math.random() * (max + 1));
const alph = char => ALPHABET.indexOf(char);
const mod = (num, mod) => (num + mod) % mod;

export class Cipher {
  constructor(key) {
    this._key = key || Cipher.generateKey();
  }

  static generateKey() {
    return [...Array(KEY_LEN)].map(() => ALPHABET[random(ALPHABET.length)]).join('');
  }

  transform(str, key, dir = 1) {
    return [...str].map(
      (char, idx) =>
        ALPHABET[mod(alph(char) + alph(key[mod(idx, key.length)]) * dir, ALPHABET.length)]
    );
  }

  encode(secret) {
    return this.transform(secret, this._key).join('');
  }

  decode(encoded) {
    return this.transform(encoded, this._key, -1).join('');
  }

  get key() {
    return this._key;
  }
}
