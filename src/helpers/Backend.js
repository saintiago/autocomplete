import config from '../config/config'

/**
 * @typedef {Object} RequestSchema
 * @property {String} input
 */

/**
 * @param {String[]} db
 */
export default function(db) {

  let database = db;

  /**
   * @param {{url: String, method: String, body: RequestSchema}} request
   * @returns {{data: Object, error: ?Error}}
   */
  this.processRequest = function (request) {
    const input = request.body.input;
    return isRequestValid(request) ? {
      data: database.filter(entry => input && ~entry.toLowerCase().indexOf(input.toLowerCase())),
      error: null
    } : {
      data: null,
      error: new Error('Invalid request')
    }
  };

  /** @return {String} */
  this.getDatabase = function () {
    return database.join(', ');
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