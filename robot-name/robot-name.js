const LETTERS = [...'QWERTYUIOPASDFGHJKLZXCVBNM']
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const ALL_NAMES = []

LETTERS.forEach((a) => {
  LETTERS.forEach((b) => {
    NUMBERS.forEach((c) => {
      NUMBERS.forEach((d) => {
        NUMBERS.forEach((e) => {
          ALL_NAMES.push([a, b, c, d, e].join(''))
        })
      })
    })
  })
})

const shuffled = ALL_NAMES
let shuffledPointer = -1

// Fisher-Yates shuffle in order to randomly sort the current names. Normally
// you would return a new array, but this function can be used to re-shuffle.
function shuffleNames() {
  let j
  let x
  let i

  for (i = shuffled.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    x = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = x
  }
}

function generateName() {
  shuffledPointer += 1
  if (shuffledPointer > shuffled.length) {
    throw new Error('Can not generate another name because all the names have been used.')
  }
  return shuffled[shuffledPointer]
}

// Initial shuffle
shuffleNames()

export class Robot {
  constructor() {
    this._name = generateName()
  }

  get name() {
    return this._name
  }

  reset() {
    this._name = generateName()
  }
}

// const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
// const NUMBERS = [...'0246813579']
// const TOTAL_NAMES = ALPHABET.length ** 2 * NUMBERS.length ** 3

// const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
// const shuffle = (array) => {
//   const newArray = [...array]
//   array.forEach((_, i) => {
//     let j = random(0, i)
//     ;[newArray[j], newArray[i]] = [newArray[i], newArray[j]]
//   })
//   return newArray
// }

// const divide = (n, d) => ({ quotient: Math.floor(n / d), remainder: n % d })
// const getFromIndex = (index) => {
//   const { quotient: qc2, remainder: rc2 } = divide(index, ALPHABET.length)
//   const { quotient: qc1, remainder: rc1 } = divide(qc2, ALPHABET.length)
//   const { quotient: qn3, remainder: rn3 } = divide(qc1, NUMBERS.length)
//   const { quotient: qn2, remainder: rn2 } = divide(qn3, NUMBERS.length)
//   const { quotient: qn1, remainder: rn1 } = divide(qn2, NUMBERS.length)
//   return `${ALPHABET[rc1]}${ALPHABET[rc2]}${NUMBERS[rn1]}${NUMBERS[rn2]}${NUMBERS[rn3]}`
// }
// const setNameIndices = () => shuffle([...Array(TOTAL_NAMES)].map((_, i) => i))

// const nameIndices = setNameIndices()
// let cursor = -1

// export class Robot {
//   constructor() {
//     this.reset()
//   }

//   get name() {
//     return this._name
//   }

//   static releaseNames() {
//     cursor = -1
//   }

//   reset() {
//     cursor++
//     this._name = getFromIndex(nameIndices[cursor])
//   }
// }
