const PROTEINS = {
  AUG: 'Methionine',
  UUU: 'Phenylalanine',
  UUC: 'Phenylalanine',
  UUA: 'Leucine',
  UUG: 'Leucine',
  UCU: 'Serine',
  UCC: 'Serine',
  UCA: 'Serine',
  UCG: 'Serine',
  UAU: 'Tyrosine',
  UAC: 'Tyrosine',
  UGU: 'Cysteine',
  UGC: 'Cysteine',
  UGG: 'Tryptophan',
};

class Codon {
  constructor(codon) {
    this.codon = codon;
    this.terminate = ['UAA', 'UAG', 'UGA'];
  }

  static size() {
    return 3;
  }

  toProtein() {
    return PROTEINS[this.codon];
  }

  stop() {
    return this.terminate.includes(this.codon);
  }

  invalid() {
    if (!PROTEINS[this.codon]) throw new Error('Invalid codon');
  }
}

export class RNAStrand {
  constructor(rnaStrand) {
    this.rnaStrand = rnaStrand;
  }

  toCodons() {
    const codons = new RegExp(`\\w{1,${Codon.size()}}`, 'g');
    return this.rnaStrand.match(codons);
  }

  toProteins() {
    let proteins = [];
    for (const codon of this.toCodons() || []) {
      const co = new Codon(codon);
      if (co.stop()) break;
      else if (co.invalid()) throw new Error('Invalid codon');
      proteins.push(co.toProtein());
    }
    return proteins;
  }
}
