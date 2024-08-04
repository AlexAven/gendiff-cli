import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';
import getParser from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const jsonInput1 = getParser('json', readFixtureFile('file3.json'));
const jsonInput2 = getParser('json', readFixtureFile('file4.json'));
const yamlInput1 = getParser('yaml', readFixtureFile('file3.yaml'));
const yamlInput2 = getParser('yaml', readFixtureFile('file4.yaml'));
const ymlInput1 = getParser('yaml', readFixtureFile('file3.yml'));
const ymlInput2 = getParser('yaml', readFixtureFile('file4.yml'));
const jsonInput3 = getParser('json', readFixtureFile('file5.json'));
const jsonInput4 = getParser('json', readFixtureFile('file6.json'));
const yamlInput3 = getParser('yaml', readFixtureFile('file5.yaml'));
const yamlInput4 = getParser('yaml', readFixtureFile('file6.yaml'));

const expectedOutput = readFixtureFile('expectedOutput.txt');
const expectedAdditional = readFixtureFile('expectedAdditional.txt');

describe('genDiff with JSON, YML, YAML', () => {
  test('genDiff for objects in JSON', () => {
    expect(stylish(genDiff(jsonInput1, jsonInput2))).toBe(expectedOutput);
  });

  test('genDiff for objects in YAML', () => {
    expect(stylish(genDiff(yamlInput1, yamlInput2))).toBe(expectedOutput);
  });

  test('genDiff for objects in YML', () => {
    expect(stylish(genDiff(ymlInput1, ymlInput2))).toBe(expectedOutput);
  });

  test('genDiff additional test for objects in JSON', () => {
    expect(stylish(genDiff(jsonInput3, jsonInput4))).toBe(expectedAdditional);
  });

  test('genDiff additional test for objects in YAML', () => {
    expect(stylish(genDiff(yamlInput3, yamlInput4))).toBe(expectedAdditional);
  });
});
