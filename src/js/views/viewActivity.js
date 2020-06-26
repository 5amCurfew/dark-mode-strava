export const viewActivity = (activity) => {
  const selectedList = Array.from(document.querySelectorAll('.selected'));

  selectedList.forEach((html) => {
    html.classList.remove('selected');
  });

  const markup = `
    <div class="activity__details">
        <div class="activity__info">
            <p class="activity__info-text">${Math.round(activity.details.distance / 1000)}km</p>
            <p class="activity__info-text">${activity.details.gear.name}</p>
            <p class="activity__info-text">${activity.details.description}</p>
            <p class="activity__info-text">${Math.round((activity.details.average_speed * 60 * 60) / 1000)}km/h</p>
    </div>`;

  document.querySelector('.activity').insertAdjacentHTML('beforeend', markup);
  document.querySelector(`.results__link[href*="${activity.id}"]`).parentElement.classList.add('selected');
};

export const clear = () => {
  document.querySelector('.activity').innerHTML = '';
};