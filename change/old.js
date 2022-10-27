class Change {
  validate(coins, target) {
    if (coins[coins.length - 1] > target) {
      throw new Error("The total 3 cannot be represented in the given currency.");
    }
    if (target < 0) {
      throw new Error();
    }
  }

  calculate(coinsArray, target) {
    let possible = [];
    console.log(target);
    const coins = coinsArray.reverse().filter((coin) => coin <= target);
    console.log(coins);
    coins.forEach((_, index) => {
      console.log(coins.slice(index));
      possible.push(this.count(coins.slice(index), target));
    });
    return this.smallest(possible);
  }

  count(coins, target) {
    let taken = [];
    let index = 0;
    console.log(coins);
    while (target > 0 && index < coins.length) {
      let coin = coins[index];
      if (coin <= target) {
        target = target - coin;
        taken.unshift(coin);
      } else {
        index += 1;
      }
    }
    return target === 0 ? taken : [];
  }

  smallest(possibles) {
    const p = possibles.reduce((accumulator, current) => {
      if (current.length < accumulator.length) {
        return current;
      }

      return accumulator;
    });
    return p;
  }
}
const change = new Change();
// const result = change.calculate([1, 4, 5, 20, 50], 23);
// const result = change.calculate([1, 5, 10, 25], 1);

const result = change.calculate([2, 5, 10, 20, 50], 21);
console.log(result);
