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

export const change_alias = alias => {
  if (!alias) return alias;
  var str = `${alias}`;
  str = str.toLowerCase();
  str = str.replace(/[<].*?[>]/g, '');
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[^0-9a-zA-Z ]/gi, '');
  str = str.replace(/[<].*?[>]|&gt|&lt/g, '');
  str = str.replace(/[ ]{1,}/g, '-');
  return str;
};

export function splitByEnter(text) {
  return (text && typeof text === 'string' && text.split(/\n/)) || [];
}

export const convertTextToTime = (str = '') => {
  if (str) {
    if (str.match(/[^0-9:]/)) return str;
    const times = [1, 60, 3600];
    str = str.replace(/[^(0-9/:/)]/g, '');
    let sum = 0;
    const arr = str.split(':');
    if (arr.length === 0) return -1;
    if (arr.length === 1) return parseInt(arr[0]) * 60;
    arr.forEach((item, index) => {
      sum = sum + parseInt(item) * times[arr.length - index - 1];
    });
    return sum;
  }
  return str;
};
