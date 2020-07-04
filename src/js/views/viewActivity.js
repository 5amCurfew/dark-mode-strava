export const viewActivity = (activity) => {
  const selectedList = Array.from(document.querySelectorAll('.selected'));

  selectedList.forEach((html) => {
    html.classList.remove('selected');
  });

  const markup = `
    <div class="activity__details w3-animate-opacity">

        <div class="activity__headlines fade_in">
          <div class="activity__headline">
            <p class="activity__info-title">Distance</p>
            <p class="activity__info-text">${Math.round(activity.details.distance / 1000)}km</p>
          </div>

          <div class="activity__headline fade_in">
            <p class="activity__info-title">Avg. Speed</p>
            <p class="activity__info-text">${Math.round((activity.details.average_speed * 60 * 60) / 1000)}km/h</p>
          </div>

          <div class="activity__headline fade_in">
            <p class="activity__info-title">Max Speed</p>
            <p class="activity__info-text">${Math.round((activity.details.max_speed * 60 * 60) / 1000)}km/h</p>
          </div>

          <div class="activity__headline fade_in">
            <p class="activity__info-title">Elevation</p>
            <p class="activity__info-text">${Math.round(activity.details.total_elevation_gain)}m</p>
          </div>
        </div>

        <div id="routeMap" class="routeMap fade_in"></div>

        <div class="activity__headlines_min">
          <div class="activity__headline2 bordered fade_in">
            <p class="activity__info-text activity__info-text2">${activity.details.segment_efforts.length}</p>
            <p class="activity__info-title">Segments</p>
          </div>

          <div class="activity__headline2 bordered fade_in">
            <p class="activity__info-text activity__info-text2">${activity.details.pr_count}</p>
            <p class="activity__info-title">PRs</p>
          </div>

          <div class="activity__headline2 bordered fade_in">
            <p class="activity__info-text activity__info-text2">${Math.round(activity.details.calories)}</p>
            <p class="activity__info-title">Calories</p>
          </div>

          <div class="activity__headline2 bordered fade_in">
            <p class="activity__info-text activity__info-text2">${Math.round(activity.details.moving_time / 50)} mins</p>
          </div>
        </div>

        <div class="other__headlines">
          <div class="weather__headlines">
          
            <div class="weather__headline fade_in">
              <p class="weather__info-title">Temp.</p>
              <p class="weather__info-text">${Math.round(activity.weather.maxt)}°C</p>
            </div>

            <div class="weather__headline fade_in">
              <p class="weather__info-title">Wind Speed</p>
              <p class="weather__info-text">${Math.round(activity.weather.wspd)}km/h</p>
            </div>

            <div class="weather__headline fade_in">
              <p class="weather__info-title">Wind Direction</p>
              <p class="weather__info-text">${Math.round(activity.weather.wdir)}</p>
            </div>
          </div>

          <div class="photo__container">
          </div>
        </div>

        
        
    </div>`;

  let photoMarkup;
  if (activity.details.photos.count > 0) {
    photoMarkup = `<img src=${activity.details.photos.primary.urls[600]} class='activity__photo fade_in'>`;
  } else {
    photoMarkup = `<img src="img/strava_logo.png" class='activity__photo fade_in'/>`;
  }

  document.querySelector('.activity').insertAdjacentHTML('beforeend', markup);
  document.querySelector('.photo__container').insertAdjacentHTML('beforeend', photoMarkup);
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
        'line-color': 'orange',
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
