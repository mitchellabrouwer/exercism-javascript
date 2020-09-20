export const compute = (l, r) => {
  if (l.length === 0 && r.length > 0)
    throw new Error("left strand must not be empty");
  if (r.length === 0 && l.length > 0)
    throw new Error("right strand must not be empty");
  if (l.length !== r.length)
    throw new Error("left and right strands must be of equal length");

  return [...l].reduce(
    (total, next, i) => (next !== [...r][i] ? (total += 1) : total),
    0
  );
};
