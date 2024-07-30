import genDiff from '../src/genDiff.js';

test('genDiff', () => {
  const obj1 = {
    1: 'one',
    2: 'two',
    3: 'three',
    6: 'six',
  };
  const obj2 = {
    1: 'one',
    2: 'two',
    3: 'five',
    4: 'four',
    5: 'six',
  };

  expect(JSON.stringify(genDiff(obj1, obj2))).toEqual('"{\\n    1: one\\n    2: two\\n  - 3: three\\n  + 3: five\\n  + 4: four\\n  + 5: six\\n  - 6: six\\n}"');
  expect(genDiff(obj1, obj2).split('\n')).toHaveLength(9);
});
