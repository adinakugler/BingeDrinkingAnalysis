// add your JavaScript/D3 to this file



// Width and height
const w = 700;
const h = 300;
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
.attr("fill", "#e7f5fe");

// create plot group
svg.append("g")
  .attr("id", "plot")
  .attr("transform", `translate (${margin.left}, ${margin.top})`);

d3.select("div#plot")
  .append("div")
  .style("padding", "10px")


const drink = [
    ["Alabama", 2895464, 39.1, 13.2, "South"],
    ["Alaska", 875478, 35.9, 20.2, "West"],
    ["Arizona", 11687735, 38.7, 17.2, "West"],
    ["Arkansas", 1471103, 38.7, 15.7, "South"],
    ["California", 67100209, 37.6, 18.4, "West"],
    ["Colorado", 7530596, 37.7, 19.1, "West"],
    ["Connecticut", 2614482, 40.2, 15.7, "Northeast"],
    ["Delaware", 212553, 40.2, 15.2, "South"],
    ["District of Columbia", 1805136, 36.6, 22.6, "South"],
    ["Florida", 15498792, 41.5, 16.4, "South"],
    ["Georgia", 4655188, 37.3, 15.5, "South"],
    ["Hawaii", 2859575, 40.1, 19.9, "West"],
    ["Idaho", 1086951, 37.4, 16.4, "West"],
    ["Illinois", 13342475, 38.6, 20.6, "Midwest"],
    ["Indiana", 5482268, 38.2, 16.7, "Midwest"],
    ["Iowa", 1945093, 38.8, 20.4, "Midwest"],
    ["Kansas", 3127363, 37.9, 17.4, "Midwest"],
    ["Kentucky", 2679375, 38.9, 18.5, "South"],
    ["Louisiana", 3095748, 37.9, 19.0, "South"],
    ["Maine", 198582, 42.4, 20.1, "Northeast"],
    ["Maryland", 1862861, 38.8, 17.0, "South"],
    ["Massachusetts", 5582948, 39.7, 20.1, "Northeast"],
    ["Michigan", 6675540, 39.6, 16.5, "Midwest"],
    ["Minnesota", 3269743, 38.5, 21.6, "Midwest"],
    ["Mississippi", 723920, 38.1, 13.3, "South"],
    ["Missouri", 4233803, 39.1, 19.4, "Midwest"],
    ["Montana", 512871, 40.0, 23.1, "West"],
    ["Nebraska", 2001998, 37.7, 22.3, "Midwest"],
    ["Nevada", 4121634, 38.4, 19.3, "West"],
    ["New Hampshire", 588177, 41.2, 17.9, "Northeast"],
    ["New Jersey", 3535602, 39.4, 15.8, "Northeast"],
    ["New Mexico", 2396638, 38.8, 16.1, "West"],
    ["New York", 27889082, 39.3, 17.8, "Northeast"],
    ["North Carolina", 8394827, 38.9, 17.1, "South"],
    ["North Dakota", 316647, 37.5, 24.9, "Midwest"],
    ["Ohio", 6990206, 39.4, 17.6, "Midwest"],
    ["Oklahoma", 4079647, 37.7, 14.5, "South"],
    ["Oregon", 3999150, 39.6, 19.1, "West"],
    ["Pennsylvania", 6871879, 40.4, 19.8, "Northeast"],
    ["Rhode Island", 1236744, 40.1, 17.7, "Northeast"],
    ["South Carolina", 1442345, 39.5, 19.0, "South"],
    ["South Dakota", 665478, 38.2, 18.5, "Midwest"],
    ["Tennessee", 5508653, 38.9, 14.0, "South"],
    ["Texas", 36974454, 35.8, 18.6, "South"],
    ["Utah", 2792631, 33.3, 12.6, "West"],
    ["Vermont", 127251, 41.4, 20.2, "Northeast"],
    ["Virginia", 5754177, 38.7, 17.9, "South"],
    ["Washington", 6244525, 38.5, 17.1, "West"],
    ["West Virginia", 154151, 41.2, 11.9, "South"],
    ["Wisconsin", 3760451, 39.4, 24.0, "Midwest"],
    ["Wyoming", 178398, 38.5, 17.2, "West"]
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
  .range([ "Blue", "Green", "Purple", "Red"]);

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
    .text("Percent of People who Binge Drink");

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
    .attr("y",  30 - margin.left)
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
        yScale.domain([100000,63000000]);
    // update y-axis label
        svg.select("#ylab")
          .text("Population of State")
    // update cy value of circles
        svg.selectAll("circle")
          .attr("cy", d => yScale(d[1]))
    // update y-axis label
      svg.select("text#ylab")
        .text("Total Population");
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



