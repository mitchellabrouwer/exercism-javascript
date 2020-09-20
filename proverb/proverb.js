const line = (previous, current) =>
  `For want of a ${previous} the ${current} was lost.\n`;

const finish = (qualifier, option) =>
  `And all for the want of a ${option ? option.qualifier + ' ' : ''}${qualifier}.`;

const verses = (qualifier, [previous, current, ...rest], output = '') =>
  !current || typeof current === 'object'
    ? output.concat(finish(qualifier, current))
    : verses(qualifier, [current, ...rest], output.concat(line(previous, current)));

export const proverb = (...inputs) => verses(inputs.slice(0, 1), inputs);
