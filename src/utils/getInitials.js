import { change_alias } from './text';

export default (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join('');

export const obj_to_change_alias = ({ object, arr_str }) => {
  return arr_str.map(item => `${change_alias(object[item])}`).join(' ');
};
