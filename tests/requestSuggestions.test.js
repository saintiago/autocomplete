const createRequest = require('../src/helpers/createRequest').default;
const Backend = require('../src/helpers/Backend').default;
const createRequestSuggestions = require('../src/logic/createRequestSuggestions').default;

const fakeDB = ['cat', 'dog', 'apple', 'google', 'application'];
const backend = new Backend(fakeDB);
const request = createRequest(backend);

const requestSuggestions = createRequestSuggestions(request);

describe('Request suggestions helper', () => {
  it('returns resolved promise with suggestions for given input', () => {
    const input = 'app';
    const expectedSuggestions = ['apple', 'application'];
    return expect(requestSuggestions(input)).resolves.toEqual(expectedSuggestions);
  });

  it('returns rejected promise for non-string input', () => {
    const input = null;
    const expectedError = new Error('Invalid request');
    return expect(requestSuggestions(input)).rejects.toEqual(expectedError);
  });

  it('caches once requested suggestions', () => {
    const request = jest.fn(() => Promise.resolve('42'));
    const requestSuggestions = createRequestSuggestions(request);
    const input = 'app';

    return Promise.resolve()
      .then(() => requestSuggestions(input))
      .then(() => requestSuggestions(input))
      .then(() => requestSuggestions(input))
      .then(() => { expect(request.mock.calls.length).toBe(1) });
  });
});