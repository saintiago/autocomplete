import backend from './backendFake'

export default function (method, url, body) {

  return new Promise(function(resolve, reject) {
    try {
      const request = {method, url, body};
      /** @var {{error: ?Error, data: Object}} response */
      const response = backend.processRequest(request);
      if (response.error != null) { // implicit coercion intended: undefined == null
        reject(response.error);
      }
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}