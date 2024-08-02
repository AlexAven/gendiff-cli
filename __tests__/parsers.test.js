import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import getParser from '../src/parsers.js';

test('Parsing', () => {
  const jsonFile = readFileSync(path.resolve(cwd(), './__fixtures__/file1.json'), 'utf8');
  const ymlFile = readFileSync(path.resolve(cwd(), './__fixtures__/file1.yml'), 'utf8');
  const yamlFile = readFileSync(path.resolve(cwd(), './__fixtures__/file1.yaml'), 'utf8');

  const resultExpected = JSON.parse(readFileSync(path.resolve(cwd(), './__fixtures__/parseResult'), 'utf8'));

  expect(getParser('json', jsonFile)).toEqual(resultExpected);
  expect(getParser('yml', ymlFile)).toEqual(resultExpected);
  expect(getParser('yaml', yamlFile)).toEqual(resultExpected);
});
