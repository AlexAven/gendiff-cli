import _ from 'lodash';

const makeIndent = (depth = 0, marker = null) => {
  const indentStep = 4;
  const actualIndent = ' '.repeat(depth * indentStep);
  return marker === null ? actualIndent : `${actualIndent.slice(2)}${marker} `;
};

const formatValue = (values, depth) => {
  if (_.isObject(values)) {
    const objectIndent = makeIndent(depth + 1);
    const objectContent = Object.entries(values)
      .map(([key, value]) => `${objectIndent}${key}: ${formatValue(value, depth + 1)}`)
      .join('\n');
    return `{\n${objectContent}\n${makeIndent(depth)}}`;
  }
  return `${values}`;
};

const renderNode = (node, depth, indentMarker = null) => {
  const indent = makeIndent(depth, indentMarker);
  const formattedValue = formatValue(node.value, depth);
  return `${indent}${node.key}: ${formattedValue}`;
};

const renderChangedNode = (node, depth) => {
  const deleteIndent = makeIndent(depth, '-');
  const addedIndent = makeIndent(depth, '+');
  const formattedOldValue = formatValue(node.oldValue, depth);
  const formattedNewValue = formatValue(node.newValue, depth);
  return [
    `${deleteIndent}${node.key}: ${formattedOldValue}`,
    `${addedIndent}${node.key}: ${formattedNewValue}`,
  ];
};

const iter = (node, depth) => {
  switch (node.state) {
    case 'added':
      return renderNode(node, depth, '+');
    case 'deleted':
      return renderNode(node, depth, '-');
    case 'unchanged':
      return renderNode(node, depth);
    case 'changed':
      return renderChangedNode(node, depth);
    default: {
      const indent = makeIndent(depth);
      const innerTree = node.children.flatMap((child) => iter(child, depth + 1)).join('\n');
      return `${indent}${node.key}: {\n${innerTree}\n${indent}}`;
    }
  }
};

const renderStylish = (content) => {
  const tree = content.flatMap((node) => iter(node, 1)).join('\n');
  return `{\n${tree}\n${makeIndent()}}`;
};

export default renderStylish;
