import fs from 'fs';
import gendiff from '../index.js';

let resultStylish; // eslint-disable-line
let resultPlain; // eslint-disable-line

beforeAll(() => {
  resultStylish = fs.readFileSync('./__fixtures__/resultStylish.txt'); // eslint-disable-line
  resultPlain = fs.readFileSync('./__fixtures__/resultPlain.txt'); // eslint-disable-line
});

describe('get different from two files', () => {
  test.each([
    ['yml'],
    ['json'],

  ])('files format - %p', (extension) => {
    const fileOneFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
    const FileTwoFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
    expect(gendiff(fileOneFullPath, FileTwoFullPath, 'stylish')).toEqual(resultStylish.toString());
    expect(gendiff(fileOneFullPath, FileTwoFullPath, 'plain')).toEqual(resultPlain.toString());
    expect(gendiff(fileOneFullPath, FileTwoFullPath)).toEqual(resultStylish.toString());
  });
});
