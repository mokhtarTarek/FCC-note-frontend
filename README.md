# jsonserver : 
npm install -g json-server
start server : 
npx json-server --port 3001 --watch db.db.json

# json-server as dev dependencies : 
npm install json-server --save -dev

# axios
npm install axios

**A Promise** is an object representing the eventual completion or failure of an asynchronous operation.

A promise can have three distinct states:

1-The promise is *pending*: It means that the final value (one of the following two) is not available yet.

2-The promise is *fulfilled*: It means that the operation has completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.

The promise is *rejected*: It means that an error prevented the final value from being determined, which generally represents a failed operation.

The *response* object contains all the essential data related to the response of an HTTP GET request, which would include the returned **data, status code, and headers**.


