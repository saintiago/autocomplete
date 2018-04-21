const Backend = require('../src/helpers/backendFake').default;

const fakeDB = ['cat', 'dog', 'apple', 'google', 'application'];
const backend = new Backend(fakeDB);

describe('Fake backend', () => {
  it('returns suggestions for given input if request valid', () => {
    const givenInput = 'app';
    const fakeRequest = {
      method: 'POST',
      url: 'https://give.me.suggestions.please',
      body: {
        input: givenInput
      }
    };

    const expectedResponse = {
      data: ['apple', 'application'],
      error: null
    };

    expect(backend.processRequest(fakeRequest)).toEqual(expectedResponse);
  });

  it('throws error if request invalid', () => {
    const fakeRequest1 = {
      method: 'GET',
      url: 'https://give.me.suggestions.please',
      body: {
        input: ''
      }
    };
    const fakeRequest2 = {
      method: 'POST',
      url: 'https://incorrect.url',
      body: {
        input: ''
      }
    };
    const expectedResponse = {
      data: null,
      error: new Error('Invalid request')
    };
    expect(backend.processRequest(fakeRequest1)).toEqual(expectedResponse);
    expect(backend.processRequest(fakeRequest2)).toEqual(expectedResponse);
  });
});