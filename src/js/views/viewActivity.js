export const viewActivity = (activity) => {
  const selectedList = Array.from(document.querySelectorAll('.selected'));

  selectedList.forEach((html) => {
    html.classList.remove('selected');
  });

  const markup = `
    <div class="activity__details">

        <div class="activity__headlines">
          <div class="activity__headline">
            <p class="activity__info-title">Distance</p>
            <p class="activity__info-text">${Math.round(activity.details.distance / 1000)}km</p>
          </div>
          <div class="activity__headline">
            <p class="activity__info-title">Avg. Speed</p>
            <p class="activity__info-text">${Math.round((activity.details.average_speed * 60 * 60) / 1000)}km/h</p>
          </div>
          <div class="activity__headline">
            <p class="activity__info-title">Avg. Speed</p>
            <p class="activity__info-text">${Math.round((activity.details.average_speed * 60 * 60) / 1000)}km/h</p>
          </div>
          <div class="activity__headline">
            <p class="activity__info-title">Avg. Speed</p>
            <p class="activity__info-text">${Math.round((activity.details.average_speed * 60 * 60) / 1000)}km/h</p>
          </div>
        </div>
        <div id="routeMap" class="routeMap"></div>
    </div>`;

  document.querySelector('.activity').insertAdjacentHTML('beforeend', markup);
  document.querySelector(`.results__link[href*="${activity.id}"]`).parentElement.classList.add('selected');
};

export const viewRouteMap = (activity) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2tzdHVkaW8iLCJhIjoiY2syMmF6cmp2MWg2eDNjbXY3am14ZzNlYyJ9.6o1_m77WQE0hY8orwGldUg';

  var map = new mapboxgl.Map({
    container: 'routeMap',
    style: 'mapbox://styles/mapbox/dark-v10',
  });

  map.fitBounds([
    [
      Math.min(...activity.route.data.geometry.coordinates.map((coord) => coord[0])) * 0.9995,
      Math.min(...activity.route.data.geometry.coordinates.map((coord) => coord[1])) * 0.9995,
    ],
    [
      Math.max(...activity.route.data.geometry.coordinates.map((coord) => coord[0])) * 1.0005,
      Math.max(...activity.route.data.geometry.coordinates.map((coord) => coord[1])) * 1.0005,
    ],
  ]);

  map.on('load', function () {
    map.addSource('route', activity.route);
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'tomato',
        'line-width': 3,
      },
    });
    // add source and layer for contours
    map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2',
    });
  });
};

export const clear = () => {
  document.querySelector('.activity').innerHTML = '';
};
