const ALPHABET_LENGTH = 26;

export const isPangram = (string) =>
  new Set(string.toLowerCase().match(/[a-z]/g)).size === ALPHABET_LENGTH;
