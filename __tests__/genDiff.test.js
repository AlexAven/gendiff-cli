import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';

test('genDiff', () => {
  const jsonFile1 = JSON.parse(readFileSync(path.resolve(cwd(), './__fixtures__/file1.json'), 'utf8'));
  const jsonFile2 = JSON.parse(readFileSync(path.resolve(cwd(), './__fixtures__/file2.json'), 'utf8'));

  const ymlFile1 = yaml.load(readFileSync(path.resolve(cwd(), './__fixtures__/file1.yml'), 'utf8'));
  const ymlFile2 = yaml.load(readFileSync(path.resolve(cwd(), './__fixtures__/file2.yml'), 'utf8'));

  const yamlFile1 = yaml.load(readFileSync(path.resolve(cwd(), './__fixtures__/file1.yaml'), 'utf8'));
  const yamlFile2 = yaml.load(readFileSync(path.resolve(cwd(), './__fixtures__/file2.yaml'), 'utf8'));

  const resultExpected = readFileSync(path.resolve(cwd(), './__fixtures__/diffResult'), 'utf8');

  expect(genDiff(jsonFile1, jsonFile2)).toEqual(resultExpected);
  expect(genDiff(ymlFile1, ymlFile2)).toEqual(resultExpected);
  expect(genDiff(yamlFile1, yamlFile2)).toEqual(resultExpected);
});
