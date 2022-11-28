// Require the module in our iss_promised.js file.
const request = require('request-promise-native');
/**
 * The request-promise-native library is promised-based. 
 * This means that it returns a promise for each async network request. 
 * By "chaining" these promises together, we were able to refactor our code 
 * and avoid nested callbacks or "callback hell".
 * 
 */

const fetchMyIP = function() {
  return request('http://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip; // convert to JSON
  return request(`http://ipwho.is/${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  console.log({ latitude, longitude });
  const url =  `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };