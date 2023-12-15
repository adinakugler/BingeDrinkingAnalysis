// add your JavaScript/D3 to this file



// Width and height
const w = 800;
const h = 600;
const margin = {top: 25, right: 100, bottom: 50, left: 100};
const innerHeight = h - margin.top - margin.bottom;
const innerWidth = w - margin.left - margin.right;

// create "placeholder" image
const icon = d3.select("div#plot")
.append("div")
.append("img")
.attr("src", "https://github.com/jtr13/d3book/blob/main/images/blank86x86.png?raw=true")
.style("padding-left", w/2 - 43 + "px");

// create SVG element
const svg = d3.select("div#plot")
  .append("svg")
    .attr("width", w)
    .attr("height", h)

// create background rectangle
svg.append("rect")
.attr("width", w)
.attr("height", h)
.attr("fill", "#F2F2F2");

// create plot group
svg.append("g")
  .attr("id", "plot")
  .attr("transform", `translate (${margin.left}, ${margin.top})`);

d3.select("div#plot")
  .append("div")
  .style("padding", "10px")


const drink = [
    ["Alabama", 2.90, 39.1, 13.2, "South"],
    ["Alaska", 0.875, 35.9, 20.2, "West"],
    ["Arizona", 11.7, 38.7, 17.2, "West"],
    ["Arkansas", 1.47, 38.7, 15.7, "South"],
    ["California", 67.1, 37.6, 18.4, "West"],
    ["Colorado", 7.53, 37.7, 19.1, "West"],
    ["Connecticut", 2.61, 40.2, 15.7, "Northeast"],
    ["Delaware", 0.213, 40.2, 15.2, "South"],
    ["District of Columbia", 1.81, 36.6, 22.6, "South"],
    ["Florida", 15.5, 41.5, 16.4, "South"],
    ["Georgia", 4.66, 37.3, 15.5, "South"],
    ["Hawaii", 2.86, 40.1, 19.9, "West"],
    ["Idaho", 1.09, 37.4, 16.4, "West"],
    ["Illinois", 13.3, 38.6, 20.6, "Midwest"],
    ["Indiana", 5.48, 38.2, 16.7, "Midwest"],
    ["Iowa", 1.95, 38.8, 20.4, "Midwest"],
    ["Kansas", 3.13, 37.9, 17.4, "Midwest"],
    ["Kentucky", 2.68, 38.9, 18.5, "South"],
    ["Louisiana", 3.10, 37.9, 19.0, "South"],
    ["Maine", 0.199, 42.4, 20.1, "Northeast"],
    ["Maryland", 1.86, 38.8, 17.0, "South"],
    ["Massachusetts", 5.58, 39.7, 20.1, "Northeast"],
    ["Michigan", 6.68, 39.6, 16.5, "Midwest"],
    ["Minnesota", 3.27, 38.5, 21.6, "Midwest"],
    ["Mississippi", 0.724, 38.1, 13.3, "South"],
    ["Missouri", 4.23, 39.1, 19.4, "Midwest"],
    ["Montana", 0.513, 40.0, 23.1, "West"],
    ["Nebraska", 2.00, 37.7, 22.3, "Midwest"],
    ["Nevada", 4.12, 38.4, 19.3, "West"],
    ["New Hampshire", 0.588, 41.2, 17.9, "Northeast"],
    ["New Jersey", 3.54, 39.4, 15.8, "Northeast"],
    ["New Mexico", 2.40, 38.8, 16.1, "West"],
    ["New York", 27.9, 39.3, 17.8, "Northeast"],
    ["North Carolina", 8.39, 38.9, 17.1, "South"],
    ["North Dakota", 0.317, 37.5, 24.9, "Midwest"],
    ["Ohio", 6.99, 39.4, 17.6, "Midwest"],
    ["Oklahoma", 4.08, 37.7, 14.5, "South"],
    ["Oregon", 4.00, 39.6, 19.1, "West"],
    ["Pennsylvania", 6.87, 40.4, 19.8, "Northeast"],
    ["Rhode Island", 1.24, 40.1, 17.7, "Northeast"],
    ["South Carolina", 1.44, 39.5, 19.0, "South"],
    ["South Dakota", 0.665, 38.2, 18.5, "Midwest"],
    ["Tennessee", 5.51, 38.9, 14.0, "South"],
    ["Texas", 37.0, 35.8, 18.6, "South"],
    ["Utah", 2.79, 33.3, 12.6, "West"],
    ["Vermont", 0.127, 41.4, 20.2, "Northeast"],
    ["Virginia", 5.75, 38.7, 17.9, "South"],
    ["Washington", 6.24, 38.5, 17.1, "West"],
    ["West Virginia", 0.154, 41.2, 11.9, "South"],
    ["Wisconsin", 3.76, 39.4, 24.0, "Midwest"],
    ["Wyoming", 0.178, 38.5, 17.2, "West"]
];


const xScale = d3.scaleLinear()
.domain([10,30])
.range([0, innerWidth]);

const yScale = d3.scaleLinear()
.domain([30,45])
.range([innerHeight,0]);

const xAxis = d3.axisBottom()
.scale(xScale);

const yAxis = d3.axisLeft()
.scale(yScale);

 // Create a color scale for regions
var region = d3.scaleOrdinal()
  .domain(["Northeast", "South", "Midwest", "West"])
  .range([ "#F28963", "#65BF9E", "#F294D1", "#889ABF"]);

// Create circles
svg.select("g#plot")
  .selectAll("circle")
  .data(drink)
  .enter()
  .append("circle")
    .attr("cx", d => xScale(d[3]))
    .attr("cy", d => yScale(d[2]))
    .attr("r", 3)
    .style("fill", function(d){ return region(d[4])})
    .on("mouseover", function(event, d) {
    const xcoord = +d3.select(event.currentTarget).attr("cx") + 5
    const ycoord = +d3.select(event.currentTarget).attr("cy") - 5
    svg.select("g#plot")
    .append("text")
    .attr("id", "tooltip")
    .attr("x", xcoord)
    .attr("y", ycoord)
    .text(d[0]);
    icon
    .attr("src", d.icon);
  })
  .on("mouseout", function() {
    d3.select("#tooltip")
    .remove();
  }
  );

// create x-axis
svg.select("g#plot")
  .append("g")
  .attr("id", "xaxis")
  .attr("transform", `translate (0, ${innerHeight})`)
  .call(xAxis);

// create x-axis label
svg.select("g#plot")
  .append("text")
    .attr("id", "xlab")
    .attr("x", innerWidth/2)
    .attr("y", innerHeight + .75 * margin.bottom)
    .attr("text-anchor", "middle")
    .text("Prevavlence of Binge Drinking (%)");

// create y-axis
svg.select("g#plot")
  .append("g")
  .attr("id", "yaxis")
  .call(yAxis)

// create y-axis label
svg.select("g#plot")
  .append("text")
    .attr("id", "ylab")
    .attr("transform", "rotate(-90)")
    .attr("y",  50 - margin.left)
    .attr("x", 0 - (innerHeight / 2))
    .attr("text-anchor", "middle")
    .text("Average Age");

// get value of radio button on click
d3.selectAll("input")
.on("click", function(event) {
    var button = event.currentTarget.value;
    if (button == "Age") {
    // update yScale domain
        yScale.domain([30,45]);
    // update y-axis label
        svg.select("#ylab")
          .text("Average Age per State")
    // update cy value of circles
        svg.selectAll("circle")
          .attr("cy", d => yScale(d[2]))
    // update y-axis label
      svg.select("text#ylab")
        .text("Average Age")
    } else {
    // update yScale domain
        yScale.domain([0,65]);
    // update y-axis label
        svg.select("#ylab")
          .text("Population of State")
    // update cy value of circles
        svg.selectAll("circle")
          .attr("cy", d => yScale(d[1]))
    // update y-axis label
      svg.select("text#ylab")
        .text("Total Population (Millions)");
    };
  // update y-axis
  svg.select("#yaxis")
    .call(yAxis);


  }) // end .on

.catch(function(error){
  d3.select("svg")
    .append("text")
    .style("font-size", "24px")
    .attr("x", "100")
    .attr("y", "100")
    .text("Error loading data");
});



