const FEWEST_COINS_STORE = {};

export class Change {
  #maxAtSubValue;

  pickBestPath(coinValues, total) {
    let index = coinValues.length - 1;
    let result = [];

    if (coinValues[index] === -1) {
      throw new Error(`The total ${total} cannot be represented in the given currency.`);
    }

    while (index !== 0) {
      let next = coinValues[index];
      result.push(coinValues[next]);
      index = index - coinValues[next];
    }

    return result.reverse();
  }

  analyseBySubValue(coins, total) {
    const coinTally = [...Array(total + 1)].map((_, i) => (i === 0 ? 0 : Infinity));
    const coinValue = [...Array(total + 1)].map((_) => -1);

    for (let coin of coins) {
      for (let index = 1; index <= total; index++) {
        if (coin <= index) {
          let previous = coinTally[index - coin];

          if (previous + 1 < coinTally[index]) {
            coinTally[index] = 1 + previous;
            coinValue[index] = coin;
          }
        }
      }
    }

    return coinValue;
  }

  calculate(coins, total) {
    const coinsKey = coins.sort((a, b) => a - b).toString() + "#" + total;
    const fewest = FEWEST_COINS_STORE[coinsKey];

    if (total === 0) {
      return [];
    }

    if (total < 0) {
      throw new Error(`Negative totals are not allowed.`);
    }

    if (Math.max(coins) > total) {
      throw new Error(`The total ${total} cannot be represented in the given currency.`);
    }

    if (fewest) {
      return fewest;
    }

    this.#maxAtSubValue = this.analyseBySubValue(coins, total);

    FEWEST_COINS_STORE[coinsKey] = this.pickBestPath(this.#maxAtSubValue, total);

    return FEWEST_COINS_STORE[coinsKey];
  }
}
