const PINS = 10;
const STRIKE = 10;
const SPARE = 10;
const NO_BONUS = 0;
const LAST_FRAME = 10;

export class Bowling {
  constructor() {
    this._frames = [];
    this._rolls = [];
    this._standing = PINS;
  }

  getFrame() {
    return this._frames.length;
  }

  getRoll() {
    return this._rolls.length;
  }

  getLastRoll() {
    return this._rolls[this._rolls.length - 1];
  }

  isLastFrame() {
    return this.getFrame() === LAST_FRAME;
  }

  sumFrame(frame) {
    return frame.reduce((a, b) => a + b, 0);
  }

  resetPins() {
    this._standing = PINS;
  }

  assertValidRoll(pins) {
    if (pins < 0) throw new Error('Negative roll is invalid');
    if (pins > this._standing) throw new Error('Pin count exceeds pins on the lane');
    if (this.gameOver()) throw new Error('Cannot roll after game is over');
  }

  roll(pins) {
    const frameTotal = this.sumFrame([...this._rolls, pins]);

    this.assertValidRoll(pins);
    this.addBonusToPrevious(pins);
    this._rolls.push(pins);

    if (this.isLastFrame() && this.strikeOrSpare(pins, frameTotal)) {
      this.resetPins();
    } else if (this.strikeOrSpare(pins, frameTotal)) {
      this.resetPins();
      this.goToNextFrame();
    } else if (this.secondThrowNoBonus()) {
      this._rolls.push(NO_BONUS);
      this.resetPins();
      this.goToNextFrame();
    } else {
      this._standing -= pins;
    }
  }

  strikeOrSpare(pins, frameTotal) {
    return pins === STRIKE || frameTotal === SPARE;
  }

  secondThrowNoBonus() {
    return this._standing > 0 && this.getRoll() === 2 && this.getFrame() !== LAST_FRAME;
  }

  addBonusToPrevious(pins) {
    this._frames
      .slice(-3)
      .forEach((frame) => (frame.length < 3 ? frame.push(pins) : frame));
  }

  goToNextFrame() {
    this._frames.push(this._rolls);
    this._rolls = [];
  }

  gameOver() {
    return this.getFrame() === LAST_FRAME && this._frames[LAST_FRAME - 1].length === 3;
  }

  score() {
    if (!this.gameOver())
      throw new Error('Score cannot be taken until the end of the game');

    return this.sumFrame(this._frames.map((frame) => this.sumFrame(frame)));
  }
}
