class CircularBuffer {
  constructor(size) {
    this.size = size;
    this.setDefaults();
  }

  setDefaults() {
    this.queue = [...Array(this.size)];
    this.begin = 0;
    this.end = 0;
  }

  isEmpty() {
    return this.queue.every((val) => val === undefined);
  }

  isFull() {
    return !this.queue.includes(undefined);
  }

  increment(property) {
    return (property + 1) % this.size;
  }

  write(data) {
    if (this.isFull()) throw new BufferFullError('Buffer Full');
    if (data === null || data === undefined) return;

    this.queue[this.end] = data;
    this.end = this.increment(this.end);
  }

  read() {
    if (this.isEmpty()) throw new BufferEmptyError('Buffer Empty');

    const current = this.queue[this.begin];
    this.queue[this.begin] = undefined;
    this.begin = this.increment(this.begin);

    return current;
  }

  forceWrite(data) {
    if (this.isFull()) {
      this.queue[this.begin] = data;
      this.begin = this.increment(this.begin);
    } else {
      this.queue[this.end] = data;
      this.end = this.increment(this.end);
    }
  }

  clear() {
    this.setDefaults();
  }
}

export default CircularBuffer;

class BufferFullError extends Error {
  constructor(message) {
    super(message);
  }
}

class BufferEmptyError extends Error {
  constructor(message) {
    super(message);
  }
}
