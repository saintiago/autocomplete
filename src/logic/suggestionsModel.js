import createRequest from '../helpers/createRequest'
import Backend from '../helpers/Backend'
import createRequestSuggestions from '../logic/createRequestSuggestions'

export default (function () {

  function initRequestSuggestions(db) {
    const backend = new Backend(db);
    const request = createRequest(backend);
    return {
      getDatabase: backend.getDatabase,
      requestSuggestions: createRequestSuggestions(request)
    };
  }

  function replaceDatabase(db) {
    if (typeof db === 'string') {
      const database = db.split(',').map(item => item.trim()).filter(item => item !== '');
      const {getDatabase, requestSuggestions} = initRequestSuggestions(database);
      suggestionsModel.getDatabase = getDatabase;
      suggestionsModel.requestSuggestions = requestSuggestions;
      console.log('Database updated', database);
      console.log('Cache deleted.');
    }
  }

  const {getDatabase, requestSuggestions} = initRequestSuggestions(['cat', 'dog', 'apple', 'google', 'application']);

  let suggestionsModel = {
    requestSuggestions,
    getDatabase: getDatabase,
    setDatabase: replaceDatabase
  };

  return suggestionsModel;

})();