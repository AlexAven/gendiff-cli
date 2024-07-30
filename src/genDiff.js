import _ from 'lodash';

const genDiff = (file1, file2) => {
  const file1KeysList = Object.keys(file1);
  const file2KeysList = Object.keys(file2);
  const summaryKeysList = _.sortBy(_.union(file1KeysList, file2KeysList));

  const fileDifferences = summaryKeysList.reduce((acc, key) => {
    if (key in file1 && key in file2) {
      if (file1[key] === file2[key]) {
        acc.push(`    ${key}: ${file1[key]}`);
      } else {
        acc.push(`  - ${key}: ${file1[key]}`);
        acc.push(`  + ${key}: ${file2[key]}`);
      }
    } else if (key in file1) {
      acc.push(`  - ${key}: ${file1[key]}`);
    } else if (key in file2) {
      acc.push(`  + ${key}: ${file2[key]}`);
    }

    return acc;
  }, []);

  return `{\n${fileDifferences.join('\n')}\n}`;
};

export default genDiff;
