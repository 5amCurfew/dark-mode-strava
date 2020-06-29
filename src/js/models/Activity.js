import * as polyline from '../models/polyline.js';

export default class Activity {
  constructor(id) {
    this.id = id;
  }

  ///////////////////////////////////////////////
  //// FETCH Activity details
  ///////////////////////////////////////////////
  async getActivityDetails(token) {
    try {
      let res = await axios({
        method: 'get',
        url: `https://www.strava.com/api/v3/activities/${this.id}?access_token=${token}`,
        headers: { accept: 'application/json' },
      }).then((response) => {
        return response.data;
      });
      this.details = res;
    } catch (error) {
      console.log(error);
    }
  }

  async getRoute() {
    this.route = {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: polyline.decode(this.details.map.polyline),
        },
      },
    };
  }

  async getWeather() {
    const token = '';

    if (this.route) {
      const date = this.details.start_date.split('T')[0];
      const start = this.details.start_latlng;
      /*
      try {
        let res = await axios({
          method: 'get',
          url: ``,
          headers: {
            accept: 'application/json',
          },
        }).then((response) => {
          return response.data;
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No Route');
      */
    }
  }
}
