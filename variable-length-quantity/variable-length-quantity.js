const CONTINUATION = 0x80; // 128
const SEVEN_ONES = 0x7f; // 127
const GROUP = 7;

export const encode = integers => {
  let result = [];
  for (let value of integers) {
    let uintvar = [value & SEVEN_ONES];
    while ((value = value >>> GROUP)) {
      uintvar.unshift((value & SEVEN_ONES) | CONTINUATION);
    }
    result.push(...uintvar);
  }
  return result;
};

export const decode = bytes => {
  if (bytes[bytes.length - 1] & CONTINUATION)
    throw new Error('Incomplete sequence');

  return bytes
    .reverse()
    .reduce((acc, byte) => {
      if (!(byte & CONTINUATION)) acc.push([]);
      acc[acc.length - 1].unshift(byte);
      return acc;
    }, [])
    .map(uintvar =>
      uintvar
        .reverse()
        .map((val, idx) => ((val & SEVEN_ONES) << (idx * GROUP)) >>> 0)
        .reduce((acc, byte) => (acc |= byte) >>> 0, 0)
    )
    .reverse();
};
