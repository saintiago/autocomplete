import config from '../config/config'

/**
 * @typedef {Object} RequestSchema
 * @property {String} input
 */

/**
 * @param {String[]} database
 */
export default function(database) {
  /**
   * @param {{url: String, method: String, body: RequestSchema}} request
   * @returns {{data: Object, error: ?Error}}
   */
  this.processRequest = function (request) {
    const input = request.body.input;
    return isRequestValid(request) ? {
      data: database.filter(entry => input && ~entry.indexOf(input)),
      error: null
    } : {
      data: null,
      error: new Error('Invalid request')
    }
  };
};

function isRequestValid(request) {
  return request &&
    request.method &&
    request.method === config.suggestions_request.METHOD &&
    request.url &&
    request.url === config.suggestions_request.URL &&
    request.body &&
    typeof request.body.input === 'string';
}