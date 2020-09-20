const CALCULATE = cell => cell.calculate();
const COMPLETE = cell => cell.changesComplete();

class Cell {
  constructor(value) {
    this._value = value;
    this._subscribers = new Set();
    this._callbacks = new Set();
  }

  get value() {
    return this._value;
  }

  addSubscriber(cell) {
    this._subscribers.add(cell);
  }

  fireSubscribers(cb) {
    this._subscribers.forEach(cb);
  }
}

export class InputCell extends Cell {
  constructor(value) {
    super();
    this.setValue(value);
  }

  setValue(value) {
    this._value = value;

    this.fireSubscribers(CALCULATE);
    this.fireSubscribers(COMPLETE);
  }
}

export class ComputeCell extends Cell {
  constructor(inputCells, fn) {
    super();

    this._fn = fn;
    this._inputs = inputCells;
    this._value = fn(inputCells);
    this._prev = this._value;

    inputCells.forEach(cell => cell.addSubscriber(this));
  }

  addCallback(cb) {
    this._callbacks.add(cb);
  }

  removeCallback(cb) {
    this._callbacks.delete(cb);
  }

  recalculate() {
    this._value = this._fn(this._inputs);
  }

  calculate() {
    this.recalculate();
    this.fireSubscribers(CALCULATE);
  }

  changesComplete() {
    if (this._prev !== this._value) {
      this._prev = this._value;
      this._callbacks.forEach(cell => cell.setValue(this));
      this.fireSubscribers(COMPLETE);
    }
  }
}

export class CallbackCell {
  constructor(fn) {
    this._fn = fn;
    this._values = [];
  }

  setValue(cell) {
    this._values.push(this._fn(cell));
  }

  get values() {
    return this._values;
  }
}
