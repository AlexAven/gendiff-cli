import { jsonParse } from '../src/parsers.js';

test('jsonParse', () => {
  const file = '{ "1": "one", "3": "three", "2": "two", "6": "six"}';

  expect(jsonParse(file)).toEqual(JSON.parse(file));
});
