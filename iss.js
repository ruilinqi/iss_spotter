// contain most of the logic for fetching the data from each API endpoint
const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

 const fetchMyIP = function(callback) { //callback has 2 parametes: error, ip
  // use request to fetch IP address from JSON API
  /*
  $ curl 'https://api.ipify.org?format=json'
  {"ip":"142.198.232.251"}
  */
 const ip = 'https://api.ipify.org?format=json';
  request(ip, (error, response, body) => {
    
    // error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error, null);
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body).ip; // Convert ip from object to string
    //console.log("Data:", typeof data);
    // if we get here, all's well and we got the data
    
    callback(null, data);
  });
}
// module.exports = { fetchMyIP };

const fetchCoordsByIP = function(ipNumber, callback) {
  ip = `http://ipwho.is/${ipNumber}`;
  request(ip, (error, response, body) => {
    if (error) return callback(error, null);


    const parsedBody = JSON.parse(body); // Convert ip from object to string

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } 

    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  //coords = { latitude: 45.4215296, longitude: -75.6971931 };
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  console.log(coords);
  request(url, (error, response, body) => {
    if (error)  return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    //const { risetime, duration } = data;

    callback(null, passes);
  });

};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes 
};