const margin = { left: 80, right: 20, top: 50, bottom: 100 };

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

d3.json("data/revenues.json").then(function(data) {
  data.forEach(function(d) {
    d.revenue = parseInt(d.revenue);
    d.profit = parseInt(d.profit);
  });

  const g = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.right + margin.top})`);

  // X Label
  g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

  // Y Label
  g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

  //   x scale
  const x = d3
    .scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width])
    .padding(0.2);

  //   y scale
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.revenue;
      })
    ])
    .range([height, 0]);

  // x axis

  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisCall);

  // y axis

  const yAxisCall = d3.axisLeft(y).tickFormat(d => `$ ${d}`);
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

  const rects = g.selectAll("rect").data(data);

  //   rects
  //     .enter()
  //     .append("rect")
  //     .attr("y", d => y(d.revenue))
  //     .attr("x", d => x(d.month))
  //     .attr("height", d => height - y(d.revenue))
  //     .attr("width", x.bandwith)
  //     .attr("fill", "gray");
  rects
    .enter()
    .append("rect")
    .attr("y", function(d) {
      return y(d.revenue);
    })
    .attr("x", function(d) {
      return x(d.month);
    })
    .attr("height", function(d) {
      return height - y(d.revenue);
    })
    .attr("width", x.bandwidth)
    .attr("fill", "grey");
});
