export const encode = (string) =>
  string.replace(/([a-zA-Z\s])\1+/g, (repeats, letter) => repeats.length + letter);

export const decode = (string) =>
  string.replace(/(\d+)([a-zA-Z\s])/g, (_, repeats, letter) => letter.repeat(repeats));
