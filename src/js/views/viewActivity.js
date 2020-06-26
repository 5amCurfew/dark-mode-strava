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
            <div id="routeMap" style='width: 600px; height: 450px;'></div>
        </div>
    </div>`;

  document.querySelector('.activity').insertAdjacentHTML('beforeend', markup);
  document.querySelector(`.results__link[href*="${activity.id}"]`).parentElement.classList.add('selected');
};

export const viewRouteMap = (activity) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2tzdHVkaW8iLCJhIjoiY2syMmF6cmp2MWg2eDNjbXY3am14ZzNlYyJ9.6o1_m77WQE0hY8orwGldUg';
  var map = new mapboxgl.Map({
    container: 'routeMap',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-0.507, 51.38], // starting position [lng, lat]
    zoom: 9,
  });
};

export const clear = () => {
  document.querySelector('.activity').innerHTML = '';
};
