const formatValue = (value) => {
  if (value == null) {
    return String(null);
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderPlain = (content) => {
  const iter = (nodes, ancestry) => { // eslint-disable-line
    return nodes.reduce((acc, node) => {
      const nestedPath = [...ancestry, node.key];
      const path = nestedPath.join('.');

      switch (node.state) {
        case 'added':
          return acc.concat(`Property '${path}' was added with value: ${formatValue(node.value)}`);
        case 'deleted':
          return acc.concat(`Property '${path}' was removed`);
        case 'changed':
          return acc.concat(`Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`);
        case 'unchanged':
          return acc;
        default:
          return acc.concat(iter(node.children, nestedPath));
      }
    }, []);
  };

  return iter(content, []).join('\n');
};

export default renderPlain;
