import { RNAStrand } from './protein-translation';

describe('ProteinTranslation', () => {
  test('Empty RNA has no proteins', () => {
    const rna = new RNAStrand();
    expect(rna.toProteins()).toEqual([]);
  });

  test('Methionine codon translates into protein', () => {
    const rna = new RNAStrand('AUG');
    expect(rna.toProteins()).toEqual(['Methionine']);
  });

  test('Phenylalanine codons translate into protein', () => {
    const rna = new RNAStrand('UUUUUC');
    expect(rna.toProteins()).toEqual(['Phenylalanine', 'Phenylalanine']);
  });

  test('Leucine codons translate into protein', () => {
    const rna = new RNAStrand('UUAUUG');
    expect(rna.toProteins()).toEqual(['Leucine', 'Leucine']);
  });

  test('Serine codons translate into protein', () => {
    const rna = new RNAStrand('UCUUCCUCAUCG');
    expect(rna.toProteins()).toEqual(['Serine', 'Serine', 'Serine', 'Serine']);
  });

  test('Tyrosine codons translate into protein', () => {
    const rna = new RNAStrand('UAUUAC');
    expect(rna.toProteins()).toEqual(['Tyrosine', 'Tyrosine']);
  });

  test('Cysteine codons translate into protein', () => {
    const rna = new RNAStrand('UGUUGC');
    expect(rna.toProteins()).toEqual(['Cysteine', 'Cysteine']);
  });

  test('Tryptophan codon translates into protein', () => {
    const rna = new RNAStrand('UGG');
    expect(rna.toProteins()).toEqual(['Tryptophan']);
  });

  test('Sequence starts with stop codon 1', () => {
    const rna = new RNAStrand('UAAUUUUUA');
    expect(rna.toProteins()).toEqual([]);
  });

  test('Sequence starts with stop codon 2', () => {
    const rna = new RNAStrand('UAGAUGUAU');
    expect(rna.toProteins()).toEqual([]);
  });

  test('Sequence starts with stop codon 3', () => {
    const rna = new RNAStrand('UGAUGU');
    expect(rna.toProteins()).toEqual([]);
  });

  test('Small RNA strand', () => {
    const rna = new RNAStrand('AUGUUUUCU');
    expect(rna.toProteins()).toEqual(['Methionine', 'Phenylalanine', 'Serine']);
  });

  test('Stop codon ends translation', () => {
    const rna = new RNAStrand('AUGUUUUCUUAAAUG');
    expect(rna.toProteins()).toEqual(['Methionine', 'Phenylalanine', 'Serine']);
  });

  test('Invalid codon throws error', () => {
    const rna = new RNAStrand('LOL');
    expect(() => rna.toProteins()).toThrow(new Error('Invalid codon'));
  });

  test('Invalid codon throws error', () => {
    const rna = new RNAStrand('AUGOO');
    expect(() => rna.toProteins()).toThrow(new Error('Invalid codon'));
  });
});
