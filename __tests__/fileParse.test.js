import fileParse from '../src/fileParse.js';

test('fileParse', () => {
  const file = '{ "1": "one", "3": "three", "2": "two", "6": "six"}';

  expect(fileParse(file)).toEqual(JSON.parse(file));
});
