import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const getParser = (extname, file) => parsers[extname](file);

export default getParser;
