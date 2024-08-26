import stylish from './stylish.js'; // eslint-disable-line
import plain from './plain.js'; // eslint-disable-line

const formatter = (result, format) => {
  switch (format) {
    case 'stylish':
      return stylish(result);
    case 'plain':
      return plain(result);
    case 'json':
      return JSON.stringify(result);
    default:
      throw Error(`incorrect format "${format}"`);
  }
};

export default formatter;
