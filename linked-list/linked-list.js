class Node {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
  }
}

const head = Symbol('head');
const tail = Symbol('tail');

export class LinkedList {
  constructor() {
    this[head] = null;
    this[tail] = null;
  }

  reset(value) {
    this[head] = value;
    this[tail] = value;
  }

  push(data) {
    const node = new Node(data);
    if (!this[head]) {
      this.reset(node);
    } else {
      node.prev = this[tail];
      this[tail].next = node;
      this[tail] = node;
    }
    return data;
  }

  unshift(data) {
    const node = new Node(data);
    if (!this[head]) {
      this.reset(node);
    } else {
      node.next = this[head];
      this[head].prev = node;
      this[head] = node;
    }
    return data;
  }

  pop() {
    const removed = this[tail];
    if (this[tail] === this[head]) {
      this.reset(null);
    } else {
      this[tail] = this[tail].prev;
      this[tail].next = null;
    }
    return removed.data;
  }

  shift() {
    const removed = this[head];
    if (this[head] === this[tail]) {
      this.reset(null);
    } else {
      this[head] = this[head].next;
      this[head].prev = null;
    }
    return removed.data;
  }

  count() {
    let element = this[head];
    let counter = 0;
    while (element) {
      counter += 1;
      element = element.next;
    }
    return counter;
  }

  find(value) {
    let element = this[head];
    while (element) {
      if (element.data === value) return element;
      element = element.next;
    }
    return false;
  }

  delete(value) {
    const element = this.find(value);
    const { next, prev } = element;

    switch (element) {
      case false:
        return 'not found';
      case this[tail]:
        return this.pop();
      case this[head]:
        return this.shift();
      default: {
        if (next) next.prev = prev;
        if (prev) prev.next = next;
        return value;
      }
    }
  }
}
