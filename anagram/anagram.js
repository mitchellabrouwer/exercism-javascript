export class Anagram {
  constructor(subject) {
    this.subject = subject;
  }

  alphabetise(word) {
    return word.toLowerCase().split('').sort().join();
  }

  isAnagram(subject, match) {
    return (
      subject.toLowerCase() !== match.toLowerCase() &&
      this.alphabetise(subject) === this.alphabetise(match)
    );
  }

  matches(matches) {
    return matches.filter(word => this.isAnagram(this.subject, word));
  }
}
