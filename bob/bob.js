const hasLower = message => /[a-z]/.test(message);
const hasUpper = message => /[A-Z]/.test(message);
const isYell = message => hasUpper(message) && !hasLower(message);
const isQuestion = message => /^.+\?$/.test(message);
const isSilence = message => message === '';

export const hey = message => {
  const msg = message.trim();
  if (isSilence(msg)) return 'Fine. Be that way!';
  if (isYell(msg) && isQuestion(msg)) return "Calm down, I know what I'm doing!";
  if (isYell(msg)) return 'Whoa, chill out!';
  if (isQuestion(msg)) return 'Sure.';
  return 'Whatever.';
};
