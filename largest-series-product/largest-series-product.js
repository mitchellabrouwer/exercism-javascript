const product = arr => arr.reduce((a, b) => a * b)

export const largestProduct = (str, span) => {
  if (span === 0) return 1
  if (span < 0) throw new Error('Span must be greater than zero')
  if (span > str.length) throw new Error('Span must be smaller than string length')
  if (!/^\d+$/.test(str)) throw new Error('Digits input must only contain digits')

  return [...str].reduce((acc, num, idx, arr) => {
    const prod = product(arr.slice(idx, idx + span))
    return acc < prod && idx + span - 1 < arr.length ? prod : acc
  }, 0)
}
