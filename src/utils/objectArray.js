export const splitObjectByField = (obj = [], field, rmDuplicate) => {
  if (obj && field && typeof field === 'string') {
    const result = obj.map(item => item[field]);
    let tmp = [];
    return Boolean(rmDuplicate)
      ? result.filter((item, index) => {
          if (tmp.indexOf(item) === -1) {
            tmp.push(item);
            return true;
          } else return false;
        })
      : result;
  }
  return [];
};
