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
}
