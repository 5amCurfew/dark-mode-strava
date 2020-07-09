export const viewStreams = (speed, elev, divLocation) => {
  let i;
  let data = [];

  for (i = 0; i < speed.data.length; i++) {
    let d = {
      index: i,
      speed: Math.round((speed.data[i] * 60 * 60) / 1000),
      elev: elev.data[i],
    };
    data.push(d);
  }
  console.log(data);

  var margin = { top: 10, left: 30, bottom: 10 },
    width = document.getElementById(divLocation).clientWidth - margin.left,
    height = document.getElementById(divLocation).clientHeight - margin.top;

  // append the svg object to the body of the page
  var svg = d3
    .select(`#${divLocation}`)
    .append('svg')
    .attr('fill', 'none')
    .attr('width', width + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + 0 + ')');

  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.index)])
    .range([0, width]);

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.speed)])
    .range([height, 0]);

  svg.append('g').call(d3.axisLeft(y));

  // Create the circle that travels along the curve of chart
  var focus = svg.append('g').append('circle').style('fill', 'none').attr('stroke', 'white').attr('r', 8.5).style('opacity', 0);

  // Create the text that travels along the curve of chart
  var focusText = svg.append('g').append('text').style('opacity', 0).attr('text-anchor', 'left').attr('alignment-baseline', 'middle');

  // define the line
  var valueline = d3
    .line()
    .x(function (d) {
      return x(d.index);
    })
    .y(function (d) {
      return y(d.speed);
    });
  // Add the line
  svg.append('path').data([data]).attr('class', 'line').attr('stroke', 'white').attr('stroke-width', 1.5).attr('d', valueline);

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
      .html('x:' + selectedData.index + '  -  ' + 'y:' + selectedData.speed)
      .attr('x', x(selectedData.index) + 15)
      .attr('y', y(selectedData.speed));
  }
  function mouseout() {
    focus.style('opacity', 0);
    focusText.style('opacity', 0);
  }
};
