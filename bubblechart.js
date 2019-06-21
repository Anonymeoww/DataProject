var current_year = 2018;

function drawBubbleChart() {
    // Load data
    d3v5.json("hotstuffwgenres.json").then(function(all_data) {
        var correct_data = select_data(all_data, current_year);
        createBubbles(correct_data)
    });

    function createBubbles(dataset) {

        // Dimensions and scales
       var checkbox = d3v5.select("#controls").append("input")
            .attr("id", "checkRap")
            .attr("type", "checkbox")
            .attr("checked", "true");

        var margin = {top: 50, right: 50, bottom: 50, left: 50};
        var w = 1200 - margin.left - margin.right;
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
        var rap = /rap/;
        var rock = /rock/;
        var pop = /pop/;
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
                          .attr("id", function (f){
                              if (rap.test(f["Genres"])){
                                  return "rap"
                              }
                              else {return "not-rap"}
                          })
                          .style("fill", function (color){
                              if (rap.test(color["Genres"])){
                                  return "#ffffff"
                              }
                              else if (rock.test(color["Genres"])){
                                  return "#b2b2ff"
                              }
                              else if (pop.test(color["Genres"])){
                                  return "#89023E"
                              }
                              else {return "#000000"}
                          })
                          .on('click', function (d) {
                                var svgR = d3v5.select(".radar");
                                svgR.selectAll("*").remove();
                                var svgL = d3v5.select(".line");
                                svgL.selectAll("*").remove();
                                var title = d["Title"];
                                click_circle(dataset, title);
                          });

    }

    function select_data(dataset, t){
    var int_t = parseInt(t, 10);
    var data_array = [];
    Object.keys(dataset[int_t]).forEach(function (list_element) {
        data_array.push(dataset[int_t][list_element])
    });
    return data_array
}
}

drawBubbleChart();