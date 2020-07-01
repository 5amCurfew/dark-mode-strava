const express = require('express');
const app = express();
const axios = require('axios');

const settings = {
  client_id: '49531',
  client_secret: 'cbadaecd9d626826962ddde695f7067f52eb2da2',
  mapboxToken: 'pk.eyJ1Ijoic2tzdHVkaW8iLCJhIjoiY2syMmF6cmp2MWg2eDNjbXY3am14ZzNlYyJ9.6o1_m77WQE0hY8orwGldUg',
};

app.use(express.static(`${__dirname}/src`));
// Expose dependencies to front-end modules
app.use('/deps', express.static(`${__dirname}/node_modules/axios/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/mapbox-gl/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/vue/dist/`));
app.use('/deps', express.static(`${__dirname}/node_modules/v-calendar/lib/`));

app.get('/oauth2-redirect', (req, res) => {
  console.log(req.url);
  console.log(`${req.query} __authorised`);
  const auth_code = req.query.code;
  const hostName = req.headers.host;
  axios({
    method: 'post',
    url: `https://www.strava.com/oauth/token?client_id=${settings.client_id}&client_secret=${settings.client_secret}&code=${auth_code}&grant_type=authorization_code`,
    headers: { accept: 'application/json' },
  }).then((response) => {
    const accessToken = response.data.access_token;
    return res.redirect(`http://${hostName}/athlete.html?access_token=${accessToken}`);
  });
});

// Heroku specifies port in .env (if running locally default to port:8080)
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`server listening on port:${port}`);
});
