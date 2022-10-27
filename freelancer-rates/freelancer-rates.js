// @ts-check

const DAY_HOURS = 8;
const MONTH_DAYS = 22;
/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
  return DAY_HOURS * ratePerHour;
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget: the total budget
 * @param {number} ratePerHour: the rate per hour
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour) {
  return Math.floor(budget / ratePerHour / DAY_HOURS);
}

/**
 * Calculates the discounted rate for large projects, rounded up
 *
 * @param {number} ratePerHour
 * @param {number} numDays: number of days the project spans
 * @param {number} discount: for example 20% written as 0.2
 * @returns {number} the rounded up discounted rate
 */
export function priceWithMonthlyDiscount(ratePerHour, numDays, discount) {
  const [months, days] = [Math.floor(numDays / MONTH_DAYS), numDays % MONTH_DAYS];
  const dayRate = ratePerHour * DAY_HOURS;
  const monthRate = dayRate * MONTH_DAYS;

  return Math.ceil(months * monthRate * (1 - discount) + days * dayRate);
}
