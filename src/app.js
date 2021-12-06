const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// setup paths
const assestsPath = path.join(__dirname, '../assets');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalsPath = path.join(__dirname, '../templates/partials');

// setup dynamic pages
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(paritalsPath);

// setup static assests

app.use(express.static(assestsPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Lokesh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Lokesh'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    });
  }

  geocode(req.query.address, (error, data) => {
    if(error) {
      return res.send({ error });
    }
    forecast(data, (error, forecastData) => {
      if(error) {
        return res.send({ error });
      }
      res.send({
        forecast: data.location,
        location: forecastData,
        address: req.query.address
      });
    });
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    author: 'Lokesh'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log('Server Started');
});
