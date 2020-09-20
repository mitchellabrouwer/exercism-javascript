const REVERSE = 0b10000;

const MASKS = ["wink", "double blink", "close your eyes", "jump"];

const reverse = (actions, mask) => (mask & REVERSE ? actions.reverse() : actions);

const filter = (mask) => MASKS.filter((_, i) => (1 << i) & mask);

export const commands = (mask) => reverse(filter(mask), mask);
