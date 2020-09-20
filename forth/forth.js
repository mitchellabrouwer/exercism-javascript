export class Forth {
  constructor() {
    this._commands = this.defaultCommands();
    this._stack = [];
  }

  get stack() {
    return this._stack;
  }

  defaultCommands() {
    return {
      '-': (a, b) => [b - a],
      '+': (a, b) => [a + b],
      '*': (a, b) => [a * b],
      '/': (a, b) => {
        if (a === 0) throw new Error('Division by zero');
        return [Math.floor(b / a)];
      },
      dup: (a) => [a, a],
      drop: (_) => [],
      swap: (a, b) => [a, b],
      over: (a, b) => [b, a, b],
    };
  }

  isNumber(token) {
    return /^-?\d+/g.test(token);
  }

  isCustomCommand(token) {
    return token === ':';
  }

  endOfCommand(array, i) {
    return array.indexOf(';', i);
  }

  isValidCommand(name, operation) {
    return isNaN(name) || operation.includes((token) => isNaN(token));
  }

  addCommand(tokens, i) {
    const name = tokens[i + 1];
    const operation = tokens.slice(i + 2, this.endOfCommand(tokens, i));

    if (!this.isValidCommand(name, operation)) throw new Error('Invalid definition');
    this._commands[name] = this.evaluate.bind(this, operation.join(' '));
  }

  stackPop(count, shifted = []) {
    return count === 0
      ? shifted
      : this.stackPop(count - 1, shifted.concat(this._stack.pop()));
  }

  runCommand(name) {
    const operation = this._commands[name];
    const arity = operation.length;
    const parameters = this.stackPop(arity);

    if (parameters.includes(undefined)) throw new Error('Stack empty');

    return arity
      ? this._stack.push(...operation(...parameters))
      : operation(...parameters);
  }

  evaluate(program) {
    const tokens = program.toLowerCase().split(' ');
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];

      if (this.isNumber(token)) {
        this._stack.push(Number(token));
      } else if (this.isCustomCommand(token)) {
        i = this.addCommand(tokens, i) && this.endOfCommand(tokens, i);
      } else if (token in this._commands) {
        this.runCommand(token);
      } else {
        throw new Error('Unknown command');
      }
    }
  }
}
