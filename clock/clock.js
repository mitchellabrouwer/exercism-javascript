const DAY_HRS = 24;
const HR_MINS = 60;

export class Clock {
  constructor(hrs = 0, mins = 0) {
    [this.hrs, this.mins] = this.validTime(hrs, mins);
  }

  modulo(num, mod) {
    return ((num % mod) + mod) % mod;
  }

  validTime(hrs, mins) {
    return [
      this.modulo(hrs + Math.floor(mins / HR_MINS), DAY_HRS),
      this.modulo(mins, HR_MINS)
    ];
  }

  plus(mins) {
    [this.hrs, this.mins] = this.validTime(this.hrs, this.mins + mins);
    return this;
  }

  minus(mins) {
    [this.hrs, this.mins] = this.validTime(this.hrs, this.mins - mins);
    return this;
  }

  equals(clock) {
    return this.hrs === clock.hrs && this.mins === clock.mins;
  }

  padZero(num) {
    return num.toString().padStart(2, "0");
  }

  toString() {
    return `${this.padZero(this.hrs)}:${this.padZero(this.mins)}`;
  }
}
