export class Words {
  count(string) {
    return string
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .reduce((tally, string) => {
        tally[string] = (tally[string] || 0) + 1;
        return tally;
      }, Object.create(null));
  }
}
