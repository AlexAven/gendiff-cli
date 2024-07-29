#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import fileParse from '../src/fileParse.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(cwd(), filepath1);
    const absolutePath2 = path.resolve(cwd(), filepath2);

    const file1Content = readFileSync(absolutePath1);
    const file2Content = readFileSync(absolutePath2);

    const file1Parsed = fileParse(file1Content);
    const file2Parsed = fileParse(file2Content);

    console.log(file1Parsed);
    console.log(file2Parsed);
  });

program.parse(process.argv);
