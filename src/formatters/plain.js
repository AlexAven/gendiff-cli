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
  const iter = (nodes, ancestry) => {
    const result = [];

    nodes.forEach((node) => {
      const nestedPath = [...ancestry, node.key];
      const path = nestedPath.join('.');

      switch (node.state) {
        case 'added':
          result.push(`Property '${path}' was added with value: ${formatValue(node.value)}`);
          break;
        case 'deleted':
          result.push(`Property '${path}' was removed`);
          break;
        case 'changed':
          result.push(`Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`);
          break;
        case 'unchanged':
          break;
        default:
          result.push(...iter(node.children, nestedPath));
          break;
      }
    });

    return result;
  };

  return iter(content, []).join('\n');
};

export default renderPlain;
