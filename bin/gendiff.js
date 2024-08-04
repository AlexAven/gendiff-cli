#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import getParser from '../src/parsers.js';
import genDiff from '../src/genDiff.js';
import stylish from '../src/formatters/stylish.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const absolutePath1 = path.resolve(cwd(), filepath1);
    const absolutePath2 = path.resolve(cwd(), filepath2);

    const file1ExtensionName = path.extname(absolutePath1).slice(1);
    const file2ExtensionName = path.extname(absolutePath2).slice(1);

    const file1Content = readFileSync(absolutePath1, 'utf8');
    const file2Content = readFileSync(absolutePath2, 'utf8');

    const file1Parsed = getParser(file1ExtensionName, file1Content);
    const file2Parsed = getParser(file2ExtensionName, file2Content);

    const diff = genDiff(file1Parsed, file2Parsed);
    const format = options.format === 'stylish' ? stylish : stylish;

    console.log(format(diff));
  });

program.parse(process.argv);
