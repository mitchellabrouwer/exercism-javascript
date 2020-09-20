const gigasecondValue = 1e9;
const convertToMilliseconds = seconds => seconds * 1000;

export const gigasecond = date =>
  new Date(date.getTime() + convertToMilliseconds(gigasecondValue));
