///////////////////////////////////////////////
// CONTROLLER
///////////////////////////////////////////////
import Athlete from '/js/models/Athlete.js';
import Activity from '/js/models/Activity.js';
import * as viewAthlete from '/js/views/viewAthlete.js';
import * as viewActivity from '/js/views/viewActivity.js';

let state = {};
window.state = state;

///////////////////////////////////////////////
// ATHLETE Control
///////////////////////////////////////////////
const athleteControl = async () => {
  const token = window.location.search.substring(1).split('access_token=')[1];
  if (token) {
    state.Athlete = new Athlete(token);
    try {
      await state.Athlete.getAthleteDetails();
      await state.Athlete.getActivities();
      viewAthlete.greetAthlete(state.Athlete);
      viewAthlete.viewActivities(state.Athlete);
    } catch (error) {
      console.log(error);
      console.log('*** Athlete API call error ***');
    }
  } else {
    console.log('__accessToken__ error');
  }
};

///////////////////////////////////////////////
// ACTIVITY Control
///////////////////////////////////////////////
const activityControl = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    state.Activity = new Activity(id);
    try {
      await state.Activity.getActivityDetails(state.Athlete.__accessToken__);
      await state.Activity.getRoute();
      await state.Activity.getWeather();
      console.log(state);
      viewActivity.clear();
      await viewActivity.viewActivity(state.Activity);
      await viewActivity.viewRouteMap(state.Activity);
    } catch (error) {
      console.log(error);
      console.log('*** Activity API call Error ***');
    }
  } else {
    console.log('Please select an activity...');
  }
};

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', () => {
  athleteControl();
});

['hashchange', 'load'].forEach((event) => window.addEventListener(event, activityControl)); // call controller on url change and load
