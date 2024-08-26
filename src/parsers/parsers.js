import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getParsedContent = (fileData, extension) => parsers[extension](fileData);

export default getParsedContent;
