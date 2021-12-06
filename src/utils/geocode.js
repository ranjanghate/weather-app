const request = require('request');

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYXBpLXVzZXIiLCJhIjoiY2t3aTJ4dWlpMTRxZjJ2cXZ3eDR6eHR2dSJ9.VIyZMxM9djQ12C7nTR_8Lw&limit=1`

  request( {url, json: true}, (error, response) => {
    const data = response.body;
    if (error) {
      callback('Unable to connect', undefined);
    } else if (!data.features.length) {
      callback('Invalid address', undefined);
    } else {
      const info = {
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        location: data.features[0].place_name
      }
      callback(undefined, info);
    }
  });
};

module.exports = geocode;
