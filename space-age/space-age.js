const EARTH_SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60;
const ORBITAL_PERIOD = new Map([
  ["mercury", 0.2408467],
  ["venus", 0.61519726],
  ["earth", 1],
  ["mars", 1.8808158],
  ["jupiter", 11.862615],
  ["saturn", 29.447498],
  ["uranus", 84.016846],
  ["neptune", 164.79132]
]);

export const age = (planet, seconds) =>
  Math.round(
    (seconds / (EARTH_SECONDS_PER_YEAR * ORBITAL_PERIOD.get(planet))) * 1e2
  ) / 1e2;
