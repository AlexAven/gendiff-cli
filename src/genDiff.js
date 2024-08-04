import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const formatValue = (value, depth) => {
    if (_.isObject(value)) {
      const indentSize = depth * 4;
      const currentIndent = ' '.repeat(indentSize);
      const bracketIndent = ' '.repeat(indentSize - 4);
      const entries = Object.entries(value);
      const formattedEntries = entries.map(([key, val]) => `${currentIndent}${key}: ${formatValue(val, depth + 1)}`);
      return `{\n${formattedEntries.join('\n')}\n${bracketIndent}}`;
    }
    return value;
  };

  const iter = (currentValue1, currentValue2, depth) => {
    const keys = _.union(Object.keys(currentValue1), Object.keys(currentValue2));
    const sortedKeys = _.sortBy(keys);

    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 4);
    const reducedIndent = ' '.repeat(indentSize - 2);

    const result = sortedKeys.map((key) => {
      if (!Object.hasOwn(currentValue2, key)) {
        return `${reducedIndent}- ${key}: ${formatValue(currentValue1[key], depth + 1)}`;
      }
      if (!Object.hasOwn(currentValue1, key)) {
        return `${reducedIndent}+ ${key}: ${formatValue(currentValue2[key], depth + 1)}`;
      }
      if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
        return `${currentIndent} ${key}: ${iter(currentValue1[key], currentValue2[key], depth + 1)}`;
      }
      if (currentValue1[key] !== currentValue2[key]) {
        return `${reducedIndent}- ${key}: ${formatValue(currentValue1[key], depth + 1)}\n${reducedIndent}+ ${key}: ${formatValue(currentValue2[key], depth + 1)}`;
      }
      return `${currentIndent}${key}: ${formatValue(currentValue1[key], depth + 1)}`;
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  const depth = 1;
  return `\n${iter(obj1, obj2, depth)}`;
};

export default genDiff;
