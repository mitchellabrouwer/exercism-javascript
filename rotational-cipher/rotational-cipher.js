const LOWERCASE = [...'abcdefghijklmnopqrstuvwxyz'];
const UPPERCASE = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const shift = (array, token, key) =>
  array.includes(token) ? array[(array.indexOf(token) + key) % array.length] : token;

export class RotationalCipher {
  static rotate(string, key) {
    return [...string]
      .map((token) => shift(LOWERCASE, token, key))
      .map((token) => shift(UPPERCASE, token, key))
      .join('');
  }
}
