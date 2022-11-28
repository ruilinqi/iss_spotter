// Require function from another file
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

// Call fetchMyIP function
// Since fetchMyIP function returns a promise, we call .then  on its return value.
// This then call should take in a callback which accepts the response body and, for now, prints it to the screen
fetchMyIP()
  .then(fetchCoordsByIP)// after run fetchMyIP, then run fetchCoordsByIP
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));
  
  // Copied from index_chaining.js
  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };

  // Call 
nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});