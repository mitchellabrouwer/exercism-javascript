const map = new Map([["G", "C"], ["C", "G"], ["T", "A"], ["A", "U"]]);

export const toRna = dna => {
  if (dna.length === 0) return "";
  return dna
    .split("")
    .map(dna => map.get(dna))
    .join("");
};
