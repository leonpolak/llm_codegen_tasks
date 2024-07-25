///....Claude:

const crypto = require('crypto');

class CryptoRandomPrefetcher {
  constructor(bufSize, valueSize) {
    if (bufSize % valueSize !== 0) {
      throw new RangeError('buffer size must be a multiple of value size');
    }
    this.buf = Buffer.allocUnsafe(bufSize);
    crypto.randomFillSync(this.buf);
    this.pos = 0;
    this.vsz = valueSize;
    this.bufSize = bufSize;
  }

  next() {
    if (this.pos >= this.bufSize) {
      crypto.randomFillSync(this.buf);
      this.pos = 0;
    }
    const result = this.buf.readUInt32LE(this.pos);
    this.pos += this.vsz;
    return result;
  }

  [Symbol.iterator]() {
    return this;
  }
}

const BUFFER_SIZE = 4096;
const VALUE_SIZE = 4;
const UINT32_MAX = 0xffffffff;

const randPrefetcher = new CryptoRandomPrefetcher(BUFFER_SIZE, VALUE_SIZE);

const cryptoRandom = () => randPrefetcher.next() / (UINT32_MAX + 1);

module.exports = { cryptoRandom };

//....GPT-4o:

const crypto = require('crypto');

class CryptoRandomPrefetcher {
  constructor(bufSize, valueSize) {
    if (bufSize % valueSize !== 0) {
      throw new RangeError('buffer size must be a multiple of value size');
    }
    this.bufSize = bufSize;
    this.valueSize = valueSize;
    this.buf = Buffer.allocUnsafe(bufSize); // Use allocUnsafe for better performance
    this.pos = bufSize; // Start with position at bufSize to trigger initial fill
  }

  next() {
    if (this.pos >= this.bufSize) {
      crypto.randomFillSync(this.buf);
      this.pos = 0;
    }
    const value = this.buf.slice(this.pos, this.pos + this.valueSize);
    this.pos += this.valueSize;
    return value;
  }

  [Symbol.iterator]() {
    return {
      next: () => ({ value: this.next(), done: false }),
    };
  }
}

const cryptoPrefetcher = (bufSize, valueSize) => new CryptoRandomPrefetcher(bufSize, valueSize);

const randPrefetcher = cryptoPrefetcher(4096, 4);
const UINT32_MAX = 0xffffffff;

const cryptoRandom = () => randPrefetcher.next().readUInt32LE(0) / (UINT32_MAX + 1);

module.exports = { cryptoRandom };