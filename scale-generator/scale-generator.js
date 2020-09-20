const SHARPS_SCALE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const FLATS_SCALE = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
const USE_FLATS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb'];
const CHROMATIC_INTERVALS = 'm'.repeat(12);
const INTERVALS = { m: 1, M: 2, A: 3 };

export class Scale {
  constructor(tonic) {
    this.tonic = tonic;
  }

  chromatic() {
    return this.interval(CHROMATIC_INTERVALS);
  }

  interval(intervals) {
    const notes = USE_FLATS.includes(this.tonic) ? FLATS_SCALE : SHARPS_SCALE;

    let i = notes.indexOf(`${this.tonic[0].toUpperCase()}${this.tonic[1] || ''}`);

    return [...intervals].map((interval) => {
      const note = notes[i];
      i = (i + INTERVALS[interval]) % SHARPS_SCALE.length;
      return note;
    });
  }
}
