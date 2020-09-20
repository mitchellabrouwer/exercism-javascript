const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const dieRoll = () => Math.floor(Math.random() * (6 - 1 + 1)) + 1;
const discardLowest = (array) => array.filter((val) => val !== Math.min(...array));
const sum = (array) => array.reduce((a, b) => a + b);

export const abilityModifier = (constitution) => {
  if (constitution < 3) throw new Error('Ability scores must be at least 3');
  if (constitution > 18) throw new Error('Ability scores can be at most 18');
  return Math.floor((constitution - 10) / 2);
};

export class Character {
  constructor() {
    ABILITIES.forEach((ability) => (this[`${ability}`] = Character.rollAbility()));
  }

  static rollAbility() {
    return sum(discardLowest([1, 2, 3, 4].map((_) => dieRoll())));
  }

  get hitpoints() {
    return 10 + abilityModifier(this.constitution);
  }
}
