Promise.all([d3v5.json("hotstuffwgenres.json"), d3v5.json("positions.json")]).then(function(all_data) {
    var correct_data = select_data(all_data[0],2018);
    var correct_data2 = all_data[1];
    console.log(correct_data2);
    create_bubbless(correct_data);
    create_radar(correct_data, 0);
    create_lines(correct_data2);

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
        var svgSC = d3v5.select(".scatter");
        svgSC.selectAll("*").remove();
        var svgR = d3v5.select(".radar");
        svgR.selectAll("*").remove();
        var correct_data = select_data(all_data[0], this.value);
        create_bubbless(correct_data);
        create_radar(correct_data, 0);
    }
});

function select_data(dataset, t){
    var int_t = parseInt(t, 10);
    var data_array = [];
    Object.keys(dataset[int_t]).forEach(function (list_element) {
        data_array.push(dataset[int_t][list_element])
    });
    return data_array
}

function create_bubbless(dataset){
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var w = 595 - margin.left - margin.right;
    var h = 550 - margin.top - margin.bottom;

    // Setup axes
    var xScale = d3v5.scaleLinear()
        .domain([0, 1])
        .range([0, w]);

    var yScale = d3v5.scaleLinear()
        .domain([0, 1])
        .range([h, 0]);

    var xAxis = d3v5.axisBottom(xScale);
    var yAxis = d3v5.axisLeft(yScale);

    // add the graph canvas to the body of the webpage
    var svg = d3v5.select(".scatter").append("svg")
                .attr("id", "scatter")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the div
	var tooltip = d3v5.select(".scatter").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

    // x-axis
    svg.append("g").attr("class", "x axis")
                   .attr("transform", "translate(0," + h + ")")
                   .call(xAxis)
                   .append("text")
                   .attr("class", "label")
                   .attr("x", w)
                   .attr("y", -6)
                   .style("text-anchor", "end")
                   .text('Danceability');

    // y-axis
    svg.append("g").attr("class", "y axis")
                   .call(yAxis)
                   .append("text")
                   .attr("class", "label")
                   .attr("transform", "rotate(-90)")
                   .attr("y", 6)
                   .attr("dy", ".71em")
                   .style("text-anchor", "end")
                   .text('Loudness');

    // labels
    svg.append("text").attr("x", (w/2))
                    .attr("y", (0))
                    .attr("text-anchor", "middle")
                    .attr("font-weight", "bold")
                    .text("Bubble chart");

    svg.append("text").attr("x", (w/2))
                    .attr("y", (h + 30))
                    .attr("text-anchor", "middle")
                    .text("Energy");

    // svg.append("text").attr("x", (w-145))
    //                 .attr("y", 30)
    //                 .attr("text-anchor", "middle")
    //                 .style("font-size", "14px")
    //                 .style("font-family", "Arial")
    //                 .text("Legend");

    svg.append("text").attr("x", -200)
                    .attr("y", -30)
                    .attr("text-anchor", "middle")
                    .attr('transform', 'rotate(-90)')
                    .text("Danceability");

    // draw dots
    svg.selectAll(".dot").data(dataset)
                    .enter().append("circle")
                      .attr("class", "dot")
                      .attr("cy", function (d, i){
                          return yScale(d["AF"][0]["danceability"])
                      })
                      .attr("r", 5)
                      .attr("cx", function (d, i){
                          return xScale(d["AF"][0]["energy"])
                      })
                      .style("fill", "#c51b8a")
                      .on('click', function (d) {
                          console.log(d["Title"]);
                          var title = d["Title"];
                          click_circle(dataset, title)
                      });

    // Tooltip
    var tip = d3v5.tip()
        .attr('class', 'd3-tip')
        .offset([50, 0])
        .html(function (d) {
            return "<strong>Title:</strong><span>" + d['Title'] + "</span>"
        });
    svg.call(tip);

}

function create_bubbles() {
    var max = getMax(dataset["2012"], "teenPreg");
    console.log(max);

    var min = getMin(dataset["2012"], "teenPreg");
    console.log(min);

    var firstValue = ((max-min)/3+min).toFixed(1);
    var secondValue = ((max-min)/3*2+min).toFixed(1);

    var firstLegendText = min.toString() + " - " + firstValue.toString();
    var secondLegendText = firstValue.toString() + " - " + secondValue.toString();
    var thirdLegendText = secondValue.toString() + " - " + max.toString();

    var g = svg.append('g');
    g.append("circle").attr("cx",w-160).attr("cy",40).attr("r", 6).style("fill", "#fde0dd");
    g.append("text").attr("x", w-140).attr("y", 45).text(firstLegendText).style("font-size", "15px").style("font-family", "Arial").attr("alignment-baseline","middle");

    g = svg.append('g');
    g.append("circle").attr("cx",w-160).attr("cy",60).attr("r", 6).style("fill", "#fa9fb5");
    g.append("text").attr("x", w-140).attr("y", 65).text(secondLegendText).style("font-size", "15px").style("font-family", "Arial").attr("alignment-baseline","middle");

    g = svg.append('g');
    g.append("circle").attr("cx",w-160).attr("cy",80).attr("r", 6).style("fill", "#c51b8a");
    g.append("text").attr("x", w-140).attr("y", 85).text(thirdLegendText).style("font-size", "15px").style("font-family", "Arial").attr("alignment-baseline","middle");



    // Tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([50, 0])
        .html(function (d) {
            return "<strong>Country:</strong><span>" + d['Country'] + "</span>"
        });
    svg.call(tip);
}

function click_circle(dataset, title) {
    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i]["Title"] == title){
            create_radar(dataset, i)
        }
    }
}

function change_year() {

}

function select_genre() {

}

function create_lines(dataset) {
    console.log(dataset[2018]["Ariana Grande"]);
    var data = dataset[2018]["Ariana Grande"];

    var width = 500;
    var height = 250;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 3;
    var circleRadiusHover = 6;

    /* Scale */
    var xScale = d3v5.scaleLinear()
      .domain([0, 52])
      .range([0, width-margin]);

    var yScale = d3v5.scaleLinear()
      .domain([0, 100])
      .range([height-margin, 0]);

    var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);

    /* Add SVG */
    var svg = d3v5.select(".line").append("svg")
      .attr("width", (width+margin)+"px")
      .attr("height", (height+margin)+"px")
      .append('g')
      .attr("transform", `translate(${margin}, ${margin})`);


    /* Add line into SVG */
    var line = d3v5.line()
      .x(d => xScale(d.week))
      .y(d => yScale(d.pos));

    let lines = svg.append('g')
      .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .on("mouseover", function(d, i) {
          svg.append("text")
            .attr("class", "title-text")
            .style("fill", color(i))
            .text(d.name)
            .attr("text-anchor", "middle")
            .attr("x", (width-margin)/2)
            .attr("y", 5);
        })
      .on("mouseout", function(d) {
          svg.select(".title-text").remove();
        })
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('opacity', lineOpacity)
      .on("mouseover", function(d) {
          d3v5.selectAll('.line')
                        .style('opacity', otherLinesOpacityHover);
          d3v5.selectAll('.circle')
                        .style('opacity', circleOpacityOnLineHover);
          d3v5.select(this)
            .style('opacity', lineOpacityHover)
            .style("stroke-width", lineStrokeHover)
            .style("cursor", "pointer");
        })
      .on("mouseout", function(d) {
          d3v5.selectAll(".line")
                        .style('opacity', lineOpacity);
          d3v5.selectAll('.circle')
                        .style('opacity', circleOpacity);
          d3v5.select(this)
            .style("stroke-width", lineStroke)
            .style("cursor", "none");
        });


    /* Add circles in the line */
    lines.selectAll("circle-group")
      .data(data).enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values).enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function(d) {
          d3v5.select(this)
            .style("cursor", "pointer")
            .append("text")
            .attr("class", "text")
            .text(`${d.price}`)
            .attr("x", d => xScale(d["week"]) + 5)
            .attr("y", d => yScale(d.pos) - 10);
        })
      .on("mouseout", function(d) {
          d3v5.select(this)
            .style("cursor", "none")
            .transition()
            .duration(duration)
            .selectAll(".text").remove();
        })
      .append("circle")
      .attr("cx", function(d) { console.log(typeof(d.pos)); xScale(d["week"])})
      .attr("cy", d => yScale(d.pos))
      .attr("r", circleRadius)
      .style('opacity', circleOpacity)
      .on("mouseover", function(d) {
            d3v5.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadiusHover);
          })
        .on("mouseout", function(d) {
            d3v5.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadius);
          });


    /* Add Axis into SVG */
    var xAxis = d3v5.axisBottom(xScale).ticks(5);
    var yAxis = d3v5.axisLeft(yScale).ticks(5);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height-margin})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append('text')
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Total values");
}

function create_radar(year_data, index) {
    var dataset = year_data[index]["AF"][0];
    var axes = ["acousticness", "danceability", "energy", "liveness", "valence"];
    var datas = [];
    var data = [];
    axes.forEach(function (add){
        var radar_obj = {};
        radar_obj["axis"] = add;
        radar_obj["value"] = dataset[add];
        data.push(radar_obj);
    });
    datas.push(data);

    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var width = 550 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var color = d3v5.scaleOrdinal().range(["#c51b8a","#CC333F","#00A0B0"]);

    d3v5.select(".radar").append("svg")
                       .attr("id", "radar")
                       .attr("width", width + margin.left + margin.right)
                       .attr("height", height + margin.top + margin.bottom)
                       .append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 1,
    levels: 5,
    roundStrokes: true,
    color: color
    };
    RadarChart("#radar", datas, radarChartOptions);
}
