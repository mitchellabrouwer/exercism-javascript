const RAIN_MAP = new Map([[3, "Pling"], [5, "Plang"], [7, "Plong"]]);
const FACTOR = (number, factor) => number % factor === 0;

export const convert = number => {
  let rainSpeak = [];
  for (let factor of RAIN_MAP.keys()) {
    if (FACTOR(number, factor)) rainSpeak.push(RAIN_MAP.get(factor));
  }
  return rainSpeak.length > 0 ? rainSpeak.join("") : number.toString();
};
