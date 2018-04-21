import config from '../config/config'

export default function (request) {

  let cache = {};

  return function (input) {
    if (input in cache) {
      return Promise.resolve(cache[input]);
    } else {
      const suggestionsPromise = request(config.suggestions_request.METHOD, config.suggestions_request.URL, {input});
      suggestionsPromise.then(suggestions => { cache[input] = suggestions });
      return suggestionsPromise;
    }
  }
}