export const viewStreams = (speed, elev, divLocation) => {
  let i, rolling;
  let data = [];

  let window = 100;
  for (i = 0; i < speed.data.length; i++) {
    if (i == 0) {
      rolling = 0;
    } else {
      if (i > window) {
        rolling = Math.round(
          speed.data.slice(i - window, i + 1).reduce((acc, cur) => {
            return acc + (cur * 60 * 60) / 1000;
          }, 0) /
            (window + 1)
        );
      } else {
        rolling = Math.round(
          speed.data.slice(0, i + 1).reduce((acc, cur) => {
            return acc + (cur * 60 * 60) / 1000;
          }, 0) / i
        );
      }
    }

    let d = {
      index: i,
      speed: Math.round((speed.data[i] * 60 * 60) / 1000),
      rollingSpeed: rolling,
      elev: elev.data[i],
    };
    data.push(d);
  }
  console.log(data);

  var margin = { top: 10, left: 20 },
    width = document.getElementById(divLocation).clientWidth - margin.left * 2,
    height = document.getElementById(divLocation).clientHeight - margin.top * 2;

  // append the svg object to container
  var svg = d3
    .select(`#${divLocation}`)
    .append('svg')
    .attr('fill', 'none')
    .attr('width', width + margin.left * 2)
    .attr('height', height + margin.top * 2)
    .append('g')
    .attr('transform', `translate(${margin.left},${0})`);

  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.index)])
    .range([0, width]);

  // Add axis to bottom
  svg.append('g').attr('class', 'x axis').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.speed)])
    .range([height, 0]);

  svg.append('g').call(d3.axisLeft(y));

  // Add 2nd Y Axis for elevation
  var y2 = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.elev)])
    .range([height, 0]);

  // Add 2nd y-axis to rhs
  svg.append('g').attr('class', 'y2 axis').attr('transform', `translate( ${width}, 0 )`).call(d3.axisRight(y2));

  // define the speed line
  var valueline = d3
    .line()
    .x(function (d) {
      return x(d.index);
    })
    .y(function (d) {
      return y(d.speed);
    });

  var valueline2 = d3
    .line()
    .x(function (d) {
      return x(d.index);
    })
    .y(function (d) {
      return y(d.rollingSpeed);
    });

  // define elevaiton valueline
  var valueArea = d3
    .area()
    .x(function (d) {
      return x(d.index);
    })
    .y0(height)
    .y1(function (d) {
      return y2(d.elev);
    });

  // Add the elevation area + speed line
  svg.append('path').data([data]).attr('class', 'area').attr('d', valueArea).attr('fill', '#202020').attr('stroke', '#eeeeee');
  svg.append('path').data([data]).attr('class', 'line').attr('stroke', '#434343').attr('stroke-width', 0.5).attr('d', valueline);
  svg
    .append('path')
    .data([data])
    .attr('class', 'line')
    .attr('stroke', 'orange')
    .attr('stroke-width', 1)
    .attr('d', valueline2)
    .style('stroke-dasharray', '10, 3');

  // Create the circle that travels along the curve of chart
  var focus = svg.append('g').append('circle').style('fill', 'none').attr('stroke', 'white').attr('r', 8.5).style('opacity', 0);
  // Create the text that travels along the curve of chart
  var focusText = svg.append('g').append('text').style('opacity', 0).attr('text-anchor', 'left').attr('alignment-baseline', 'middle');
  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svg
    .append('rect')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

  // What happens when the mouse move -> show the annotations at the right positions.
  function mouseover() {
    focus.style('opacity', 1);
    focusText.style('opacity', 1);
  }

  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function (d) {
    return d.index;
  }).left;

  function mousemove() {
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    console.log(x0);
    var i = bisect(data, x0, 1);
    console.log(i);
    let selectedData = data[i];
    console.log(selectedData);

    focus.attr('cx', x(selectedData.index)).attr('cy', y(selectedData.speed));
    focusText
      .html(`${selectedData.speed} km/h`)
      .attr('x', x(selectedData.index) + 10)
      .attr('y', y(selectedData.speed) - 10)
      .attr('fill', 'white')
      .attr('font-size', '15')
      .attr('font-family', 'Helvetica');
  }
  function mouseout() {
    focus.style('opacity', 0);
    focusText.style('opacity', 0);
  }
};
