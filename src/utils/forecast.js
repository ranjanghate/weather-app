const request = require('request');

const forecast = ({latitude, longitude}, callback) => {
  const url = 'http://api.weatherapi.com/v1/current.json?key=a22c3eacfeab4e26bbb171110211811&q='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&aqi=no';

  request({url, json: true}, (error, response) => {
    const data = response.body;
    if(error) {
      callback('Unable to connect', undefined);
    } else if(data.error) {
      callback(data.error.message, undefined);
    } else {
      callback(undefined, `It is currently ${data.current.temp_c} degrees out.`);
    }
  });
};

module.exports = forecast
