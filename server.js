const express = require('express');
const app = express();
const axios = require('axios');

const settings = {
  mapboxToken: process.env.MAPBOX_TOKEN,
  visualCrossingToken: process.env.VISUAL_CROSSING_TOKEN,
};

app.use(express.static(`${__dirname}/src`));
app.use('/athlete', express.static(`${__dirname}/src/athlete.html`));
// Expose dependencies to front-end modules
app.use('/deps', express.static(`${__dirname}/node_modules/axios/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/mapbox-gl/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/vue/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/v-calendar/lib/`));
app.use('/deps', express.static(`${__dirname}/node_modules/d3/dist/`));

app.get('/settings', (req, res) => {
  if (req.headers.skeleton == process.env.SKELETON) {
    res.send(settings);
  } else {
    res.send('Not Authorised');
  }
});

app.get('/oauth2-redirect', (req, res) => {
  console.log(`${req.query} __authorised`);
  const auth_code = req.query.code;
  axios({
    method: 'post',
    url: `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${auth_code}&grant_type=authorization_code`,
    headers: { accept: 'application/json' },
  }).then((response) => {
    const accessToken = response.data.access_token;
    return res.redirect(`/athlete?access_token=${accessToken}`);
  });
});

// Heroku specifies port in .env (if running locally default to port:8080)
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`server listening on port:${port}`);
});
