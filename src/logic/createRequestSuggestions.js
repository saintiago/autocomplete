import config from '../config/config'

export default function (request) {

  let cache = {};

  return function (input) {
    if (input in cache) {
      console.log('Showing suggestions for "' + input + '" from cache.');
      return Promise.resolve(cache[input]);
    } else {
      console.log('Requesting suggestions for "' + input + '" from backend.');
      const suggestionsPromise = request(config.suggestions_request.METHOD, config.suggestions_request.URL, {input});
      suggestionsPromise.then(suggestions => { cache[input] = suggestions });
      return suggestionsPromise;
    }
  }
}