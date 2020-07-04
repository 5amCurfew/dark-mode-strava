export const greetAthlete = (Athlete) => {
  const header_left = `
    <img src=${Athlete.details.profile} alt="Logo" class="header__logo" />
    <h5 class="athlete__name">Hello ${Athlete.details.name}</h5>
  `;
  document.querySelector('.header').insertAdjacentHTML('beforeend', header_left);
};

export const viewActivities = (Athlete) => {
  Athlete.activities.forEach((activity, index) => {
    const date = activity.startDate.split('T')[0];
    const time = activity.startDate.split('T')[1].substring(0, 5);

    const markup = `
        <li class="results__obj" style="--d:${0.2 * index}s">
          <a class="results__link results__link--active" href="#${activity.id}">
              <figure class="results__fig">
                  <img src="img/bicycle.png" alt="Test">
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
    <div id="activeCalendar">
      <v-calendar 
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
