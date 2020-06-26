export const viewActivities = (Athlete) => {
  Athlete.activities.forEach((activity) => {
    const date = activity.startDate.split('T')[0];
    const time = activity.startDate.split('T')[1].substring(0, 5);

    const markup = `
        <li class="results__obj">
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

export const greetAthlete = (Athlete) => {
  const markup = `
  <div>
    <img src=${Athlete.details.profile} alt="Logo" class="header__logo" />
    <h4 class="athlete__name">Hello ${Athlete.details.name}</h4>
  </div>`;
  document.querySelector('.header').insertAdjacentHTML('beforeend', markup);
};
