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

  function isRequestValid(request) {
    return request &&
           request.method &&
           request.method === 'POST' &&
           request.url &&
           request.url === 'https://give.me.suggestions.please';
  }
};