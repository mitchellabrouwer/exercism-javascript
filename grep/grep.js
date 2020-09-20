#!/usr/bin/env node

const fsPromises = require('fs').promises;
const FLAGS = {
  printLine: `-n`,
  printFileOnly: '-l',
  ignoreCase: '-i',
  matchLine: '-x',
  matchInvert: '-v',
};

class Input {
  constructor([...inputs]) {
    this.flags = [];
    this.pattern = [];
    this.files = [];
    this.sortInputs(inputs);
  }

  isFile(input) {
    return /^\/+/g.test(input);
  }

  isFlag(input) {
    return /^-+/g.test(input);
  }

  isPattern(input) {
    return /^[A-Za-z]+/g.test(input);
  }

  sortInputs(inputs) {
    for (const input of inputs) {
      if (this.isFlag(input)) this.flags.push(input);
      else if (this.isPattern(input)) this.pattern.push(input);
      else if (this.isFile(input)) this.files.push(input);
    }
  }
}

class Print {
  constructor(paths, found, data, flags) {
    this.paths = paths;
    this.found = found;
    this.data = data;
    this.flags = flags;
    this.result = [];
    this.print();
  }

  hasLineOn() {
    return this.flags.includes(FLAGS.printLine);
  }
  hasFileOn() {
    return this.flags.includes(FLAGS.printFileOnly);
  }

  print() {
    const numberOfPaths = this.paths.length;
    this.data.forEach((_, fileIdx) => {
      this.found[fileIdx].forEach((lineIdx) => {
        const path = this.paths[fileIdx];
        const line = this.data[fileIdx][lineIdx];

        let str = '';
        if (numberOfPaths > 1) str += path;
        if (this.hasLineOn()) str = str === '' ? `${lineIdx + 1}` : `${str}:${lineIdx + 1}`;
        str = str === '' ? line : `${str}:${line}`;

        this.result.push(this.hasFileOn() ? path : str);
      });
    });
    console.log([...new Set(this.result)].join('\n'));
  }
}

class Grep {
  constructor({ flags, pattern, files }) {
    this.flags = flags;
    this.pattern = pattern;
    this.files = files;
  }

  matchPattern(line, pattern) {
    return line.indexOf(pattern) > -1;
  }

  matchLine(line, pattern) {
    return line === pattern;
  }

  matchInvert(line, pattern) {
    return line.indexOf(pattern) === -1;
  }

  hasIgnoreCaseOn() {
    return this.flags.includes(FLAGS.ignoreCase);
  }

  hasInvertMatchOn() {
    return this.flags.includes(FLAGS.matchInvert);
  }

  hasMatchLineOn() {
    return this.flags.includes(FLAGS.matchLine);
  }

  findLineIndexes(arrayOfFiles, pattern) {
    let matchType = this.hasMatchLineOn() ? this.matchLine : this.matchPattern;

    if (this.hasInvertMatchOn()) matchType = this.matchInvert;
    if (this.hasIgnoreCaseOn()) pattern = pattern.toLowerCase();

    return arrayOfFiles.map((files) =>
      files
        .map((line) => (this.hasIgnoreCaseOn() ? line.toLowerCase() : line))
        .map((line, i) => (matchType(line, pattern) ? i : null))
        .filter((value) => value !== null)
    );
  }

  retrieveFiles(files) {
    return Promise.all(files.map((file) => fsPromises.readFile(file, 'utf8')));
  }

  searchFiles() {
    this.retrieveFiles(this.files)
      .then((found) => found.map((file) => file.split('\n')))
      .then((parsed) => [this.findLineIndexes(parsed, ...this.pattern), parsed])
      .then(([found, data]) => new Print(this.files, found, data, this.flags))
      .catch(console.log);
  }
}

new Grep(new Input(process.argv.slice(2))).searchFiles();
