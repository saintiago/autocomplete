const createRequest = require('../src/helpers/createRequest').default;
const Backend = require('../src/helpers/Backend').default;

const fakeDB = ['cat', 'dog', 'apple', 'google', 'application'];
const backend = new Backend(fakeDB);
const request = createRequest(backend);

describe('Request helper returns a promise that', () => {
  it('resolves with suggestions for valid request', () => {
    const requestBody = {input: 'goo'};
    const expectedSuggestions = ['google'];
    return expect(request('POST', 'https://give.me.suggestions.please', requestBody)).resolves.toEqual(expectedSuggestions);
  });

  it('rejects with an error for invalid request', () => {
    const requestBody = {input: 'goo'};
    const expectedError = new Error('Invalid request');
    return expect(request('POST', 'https://invalid.url', requestBody)).rejects.toEqual(expectedError);
  });
});