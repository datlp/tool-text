export const sliceText = (text = '', size = 15) =>
  text && text.length > size ? `${text.slice(0, size)}...` : text;

export const minutesTohhmm = number => {
  const num = parseInt(number) || 0;

  const mod = num % 60;

  return `${formatNumber(num / 60)}:${formatNumber(mod)}`;
};

export const formatNumber = number => {
  const num = parseInt(number) || 0;
  return num > 10 ? num : `0${num}`;
};
