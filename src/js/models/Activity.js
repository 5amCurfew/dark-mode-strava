import * as polyline from './polyline.js';

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

  async getWeather(vcToken) {
    if (this.route) {
      const date = this.details.start_date.split('Z')[0];
      const start = this.details.start_latlng;

      try {
        let res = await axios({
          method: 'get',
          url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=${date}&endDateTime=${date}&unitGroup=metric&contentType=json&location=${start[0]},${start[1]}&key=${vcToken}`,
        }).then((response) => {
          return Object.values(response.data.locations)[0].values[0];
        });
        this.weather = res;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No Route');
    }
  }
}
