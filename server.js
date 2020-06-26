const express = require('express');
const app = express();
const axios = require('axios');

const settings = {
  client_id: '49531',
  client_secret: 'cbadaecd9d626826962ddde695f7067f52eb2da2',
  mapboxToken: 'pk.eyJ1Ijoic2tzdHVkaW8iLCJhIjoiY2syMmF6cmp2MWg2eDNjbXY3am14ZzNlYyJ9.6o1_m77WQE0hY8orwGldUg',
};

app.use(express.static(`${__dirname}/src`));
app.use(express.static('js'));

app.get('/oauth2-redirect', (req, res) => {
  console.log(`${req.query} __authorised`);
  const auth_code = req.query.code;
  axios({
    method: 'post',
    url: `https://www.strava.com/oauth/token?client_id=${settings.client_id}&client_secret=${settings.client_secret}&code=${auth_code}&grant_type=authorization_code`,
    headers: { accept: 'application/json' },
  }).then((response) => {
    const accessToken = response.data.access_token;
    res.redirect(`/athlete.html?access_token=${accessToken}`);
  });
});

app.listen(8080, () => {
  console.log('server listening...');
});
