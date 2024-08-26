import path from 'path';
import fs from 'fs';
import parse from './parsers/parsers.js'; // eslint-disable-line
import buildDiff from './compare.js'; // eslint-disable-line
import format from './formatters/index.js'; // eslint-disable-line

const gendiff = (firstPath, secondPath, formatName = 'stylish') => {
  const firstFilePath = path.resolve(process.cwd(), firstPath);
  const secondFilePath = path.resolve(process.cwd(), secondPath);
  const firstFileData = fs.readFileSync(firstFilePath, 'utf-8');
  const secondFileData = fs.readFileSync(secondFilePath, 'utf-8');
  const firstFileExtension = path.extname(firstFilePath).slice(1);
  const secondFileExtension = path.extname(secondFilePath).slice(1);
  const obj1 = parse(firstFileData, firstFileExtension);
  const obj2 = parse(secondFileData, secondFileExtension);
  const internalTree = buildDiff(obj1, obj2);
  const result = format(internalTree, formatName);
  return result;
};

export default gendiff;
