import _ from 'lodash';

const genDiff = (file1, file2) => {
  const fileDifferences = {};
  const file1KeysList = Object.keys(file1);
  const file2KeysList = Object.keys(file2);
  const summaryKeysList = _.sortBy(_.union(file1KeysList, file2KeysList));

  summaryKeysList.forEach((key) => {
    if (key in file1 && key in file2) {
      if (file1[key] === file2[key]) {
        fileDifferences[` ${key}`] = file1[key];
      } else {
        fileDifferences[`- ${key}`] = file1[key];
        fileDifferences[`+ ${key}`] = file2[key];
      }
    } else if (key in file1) {
      fileDifferences[`- ${key}`] = file1[key];
    } else if (key in file2) {
      fileDifferences[`+ ${key}`] = file2[key];
    }
  });

  return fileDifferences;
};

export default genDiff;
