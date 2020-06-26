export default class Athlete {
  constructor(accessToken) {
    this.__accessToken__ = accessToken;
    this.activities = [];
  }

  ///////////////////////////////////////////////
  //// FETCH Athlete details
  ///////////////////////////////////////////////
  async getAthleteDetails() {
    try {
      let res = await axios({
        method: 'get',
        url: `https://www.strava.com/api/v3/athlete?access_token=${this.__accessToken__}`,
        headers: { accept: 'application/json' },
      }).then((response) => {
        console.log(response);
        let details = {
          name: response.data.firstname,
          profile: response.data.profile_medium,
        };
        return details;
      });

      this.details = res;
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////////////////////////
  //// FETCH Activities Array
  ///////////////////////////////////////////////
  async getActivities() {
    try {
      let res = await axios({
        method: 'get',
        url: `https://www.strava.com/api/v3/athlete/activities?access_token=${this.__accessToken__}`,
        headers: { accept: 'application/json' },
      }).then((response) => {
        let activityArray = [];
        response.data.forEach((activity) => {
          let act = {
            title: activity.name,
            distance: activity.distance,
            id: activity.id,
            type: activity.type,
            startDate: activity.start_date,
            elapsedTime: activity.elapsed_time,
            movingTime: activity.moving_time,
          };

          activityArray.push(act);
        });

        return activityArray;
      });

      this.activities = res;
    } catch (error) {
      console.log(error);
    }
  }
}
