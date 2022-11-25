const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// const fetchMyIP = myModule.fetchMyIP;
 //const fetchCoordsByIP = myModule.fetchCoordsByIP;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

let ipNumber = '142.198.232.251';
fetchCoordsByIP(ipNumber, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates:' , coordinates);

});

let coordinates = { latitude: 45.4215296, longitude: -75.6971931 };
fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover Times:' , passTimes);

});