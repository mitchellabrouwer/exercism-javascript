const MATCHING = { ']': '[', '}': '{', ')': '(' }

export const isPaired = ([...str]) => {
  let stack = []
  for (let char of str) {
    if (Object.values(MATCHING).includes(char)) stack.push(char)
    else if (char in MATCHING && stack.pop() !== MATCHING[char]) return false
  }
  return stack.length === 0
}
