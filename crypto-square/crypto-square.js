export class Crypto {
  constructor(message) {
    this.message = message;
  }

  size() {
    return Math.ceil(Math.sqrt(this.normalizePlaintext().length));
  }

  normalizePlaintext() {
    return this.message.replace(/[\W\s]/g, '').toLowerCase();
  }

  chunkBySize(string, size) {
    const chunks = new RegExp(`\\w{1,${size}}`, 'g');
    return string.match(chunks);
  }

  transpose(array) {
    return [...array[0]]
      .map((col, i) => array.map((row) => row[i]))
      .map((row) => row.join(''));
  }

  plaintextSegments() {
    return this.chunkBySize(this.normalizePlaintext(), this.size());
  }

  ciphertext() {
    return this.transpose(this.plaintextSegments()).join('');
  }
}
