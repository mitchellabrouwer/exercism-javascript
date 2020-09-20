const DAY = weekday =>
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    weekday.substring(0, 3)
  );
const ORDINAL = type => ['1st', '2nd', '3rd', '4th', '5th'].indexOf(type);

const getDaysCount = (dayOne, dayTwo) => (dayOne - dayTwo + 7) % 7;

const moveDate = (startDate, inputDay, ordinal = '1st') => {
  const day = startDate.getDay();
  if (ordinal === 'last') return getDaysCount(day, inputDay);
  return getDaysCount(inputDay, day) + ORDINAL(ordinal) * 7;
};

export const meetupDay = (y, m, day, type) => {
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const teen = new Date(y, m, 13);

  if (first.getDate() + moveDate(first, DAY(day), type) > last.getDate()) {
    throw new Error('nonexistent date');
  }

  switch (type) {
    case 'last':
      return new Date(y, m, last.getDate() - moveDate(last, DAY(day), type));
    case 'teenth':
      return new Date(y, m, teen.getDate() + moveDate(teen, DAY(day)));
    default:
      return new Date(y, m, first.getDate() + moveDate(first, DAY(day), type));
  }
};
