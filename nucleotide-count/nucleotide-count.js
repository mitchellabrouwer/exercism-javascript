const DNA = ['A', 'C', 'G', 'T'];

export class NucleotideCounts {
  static parse(dna) {
    return dna
      .split('')
      .reduce(
        (tally, nt) => {
          if (DNA.indexOf(nt) < 0) throw new Error('Invalid nucleotide in strand');
          tally[DNA.indexOf(nt)] += 1;
          return tally;
        },
        [0, 0, 0, 0]
      )
      .join(' ');
  }
}
