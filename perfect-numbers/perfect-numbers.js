const factors = n => [
  ...new Set(
    [...Array(Math.floor(Math.sqrt(n)) + 1)]
      .map((_, i) => i)
      .filter(x => n % x === 0)
      .map(x => [x, n / x])
      .reduce((arr, n) => arr.concat(n), [])
  )
]

export const classify = num => {
  if (num < 1) throw new Error('Classification is only possible for natural numbers.')
  const alquiot = factors(num).reduce((a, b) => a + b) - num
  return alquiot === num ? 'perfect' : alquiot < num ? 'deficient' : 'abundant'
}
