export const primes = (number) => {
  const indexes = [...Array(Math.floor(Math.sqrt(number)))].map((_, i) => i + 2);
  let marked = [...Array(number - 1)].map((_, i) => i + 2);

  indexes.forEach((index) => {
    if (marked.includes(index)) {
      for (let j = 2; j * index <= number; j += 1) {
        marked[marked.indexOf(j * index)] = false;
      }
    }
  });

  return marked.filter(Boolean);
};

console.log('hi');
