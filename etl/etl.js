export const transform = old => {
  const arrOfOld = Object.entries(old);
  let updated = {};

  for (const [score, letters] of arrOfOld) {
    letters.forEach(letter => {
      updated[letter.toLowerCase()] = Number(score);
    });
  }

  return updated;
};
