export class DiffieHellman {
  constructor(p, g) {
    [p, g].forEach((val) => this.assertPrime(val));
    this.p = p;
    this.g = g;
  }

  assertPrime(number) {
    for (let i = 2, max = Math.sqrt(number); i <= max; i++) {
      if (number % i === 0) throw new Error('Input not prime');
    }
    return number > 1;
  }

  getPublicKeyFromPrivateKey(privateKey) {
    if (privateKey <= 1 || privateKey >= this.p) throw new Error('Invalid private key');
    return this.g ** privateKey % this.p;
  }

  getSharedSecret(privateKey, publicKey) {
    return publicKey ** privateKey % this.p;
  }
}
