import fs from 'fs';
import gendiff from '../index.js'; // eslint-disable-line

let resultStylish; // eslint-disable-line
let resultPlain; // eslint-disable-line

beforeAll(() => { // eslint-disable-line
  resultStylish = fs.readFileSync('./__fixtures__/resultStylish.txt'); // eslint-disable-line
  resultPlain = fs.readFileSync('./__fixtures__/resultPlain.txt'); // eslint-disable-line
});

describe('get different from two files', () => { // eslint-disable-line
  test.each([   // eslint-disable-line
    ['yml'],
    ['json'],

  ])('files format - %p', (extension) => {
    const fileOneFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
    const FileTwoFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
    expect(gendiff(fileOneFullPath, FileTwoFullPath, 'stylish')).toEqual(resultStylish.toString());  // eslint-disable-line
    expect(gendiff(fileOneFullPath, FileTwoFullPath, 'plain')).toEqual(resultPlain.toString());  // eslint-disable-line
    expect(gendiff(fileOneFullPath, FileTwoFullPath)).toEqual(resultStylish.toString());  // eslint-disable-line
  });
});
