export const greetAthlete = (Athlete) => {
  const header_left = `
    <img src=${Athlete.details.profile} alt="Logo" class="header__logo fade_in" />
    <h5 class="athlete__name">Hello ${Athlete.details.name}</h5>
  `;
  document.querySelector('.header').insertAdjacentHTML('beforeend', header_left);
};

export const viewActivities = (Athlete) => {
  Athlete.activities.forEach((activity, index) => {
    let figSrc;
    const date = new Date(activity.startDate.split('T')[0]).toDateString();
    const time = activity.startDate.split('T')[1].substring(0, 5);
    if (activity.type == 'Ride') {
      figSrc = 'img/bicycle.png';
    } else if (activity.type == 'Swim') {
      figSrc = 'img/swim.png';
    } else {
      figSrc = 'img/run.png';
    }
    const markup = `
        <li class="results__obj" style="--d:${0.2 * index}s">
          <a class="results__link results__link--active" href="#${activity.id}">
              <figure class="results__fig">
                  <img src="${figSrc}" alt="Test">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${activity.title.replace(/->/g, '&rarr;')}</h4>
                  <p class="results__km">${Math.round(activity.distance / 1000)}km</p>
                  <p class="results__km">${time} on ${date}</p>
              </div>  
          </a>
        </li>`;

    document.querySelector('.results__list').insertAdjacentHTML('beforeend', markup);
  });
};

export const viewStats = (Athlete) => {
  const ytd_ride = ride_ytd(Athlete);
  const ytd_run = run_ytd(Athlete);
  const ytd_swim = swim_ytd(Athlete);
  document.querySelector('.header').insertAdjacentHTML('beforeend', ytd_ride);
  document.querySelector('.header').insertAdjacentHTML('beforeend', ytd_run);
  document.querySelector('.header').insertAdjacentHTML('beforeend', ytd_swim);
};

export const viewCalendar = (Athlete) => {
  const activeDays = Athlete.activities.map((act) => Date.parse(act.startDate));
  var att = [
    {
      highlight: {
        backgroundColor: 'orange',
        borderWidth: '1px',
        borderRadius: 0,
      },
      dates: activeDays,
    },
  ];

  const markup = `
    <div id="activeCalendar" class="fade_in">
      <v-calendar 
      style="height: 0%; width: 100%;"
      :attributes="att" 
      :mode="mode" 
      v-model="selectedDate" 
      is-inline
      is-dark
      color="orange">
      </v-calendar>
    </div>
  `;

  document.querySelector('.header').insertAdjacentHTML('beforeend', markup);

  new Vue({
    el: '#activeCalendar',
    data: {
      // Data used by the date picker
      mode: 'single',
      selectedDate: Math.max(...activeDays),
      att,
    },
  });
};

const ride_ytd = (Athlete) => {
  let markup = `
    <a class="stats__holder bordered">
    <div>
      <figure class="stats__fig">
          <img src="img/bicycle.png" alt="Test">
      </figure>
    </div>
      <div class="results__data">
        <h4 class="stats__name"><span style="color:orange">${Math.round(
          Athlete.stats.ytd_ride_totals.count,
          0
        )} rides</span> in ${new Date().getFullYear()}</h4>
        <h4 class="stats__name"><span style="color:orange">Distance: </span>${Math.round(Athlete.stats.ytd_ride_totals.distance / 1000, 0)}km</h4>
        <h4 class="stats__name"><span style="color:orange">Elevation: </span>${Math.round(Athlete.stats.ytd_ride_totals.elevation_gain, 0)}m</h4>
      </div>  
    </div>
  `;

  return markup;
};

const run_ytd = (Athlete) => {
  let markup = `
    <a class="stats__holder bordered">
    <div>
      <figure class="stats__fig">
          <img src="img/run.png" alt="Test">
      </figure>
    </div>
      <div class="results__data">
        <h4 class="stats__name"><span style="color:orange">${Math.round(Athlete.stats.ytd_run_totals.count, 0)} runs</span> in ${new Date().getFullYear()}</h4>
        <h4 class="stats__name"><span style="color:orange">Distance: </span>${Math.round(Athlete.stats.ytd_run_totals.distance / 1000, 0)}km</h4>
        <h4 class="stats__name"><span style="color:orange">Elevation: </span>${Math.round(Athlete.stats.ytd_run_totals.elevation_gain, 0)}m</h4>
      </div>  
    </div>
  `;

  return markup;
};

const swim_ytd = (Athlete) => {
  let markup = `
    <a class="stats__holder bordered">
    <div>
      <figure class="stats__fig">
          <img src="img/swim.png" alt="Test">
      </figure>
    </div>
      <div class="results__data">
        <h4 class="stats__name"><span style="color:orange">${Math.round(
          Athlete.stats.ytd_swim_totals.count,
          0
        )} swims</span> in ${new Date().getFullYear()}</h4>
        <h4 class="stats__name"><span style="color:orange">Distance: </span>${Math.round(Athlete.stats.ytd_swim_totals.distance / 1000, 0)}km</h4>
        <h4 class="stats__name"><span style="color:orange">Elevation: </span>${Math.round(Athlete.stats.ytd_swim_totals.elevation_gain, 0)}m</h4>
      </div>  
    </div>
  `;

  return markup;
};
