d3v5.json("hotstuff.json").then(function(all_data) {
    var correct_data = select_data(all_data,2018);
    create_bubbless(correct_data);
    create_radar(correct_data, 0)
});

function select_data(dataset, t){
    var data_array = [];
    Object.keys(dataset[t]).forEach(function (list_element) {
        data_array.push(dataset[t][list_element])
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
                      .attr("r", 3)
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

function create_lines() {

}

function create_radar(year_data, index) {

    console.log(year_data);

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
