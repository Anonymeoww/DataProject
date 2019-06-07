d3.json("hotstuff.json").then(function(all_data) {
    console.log(all_data)
    data = all_data["2018"];
    create_bubbless()
});

function select_data(){
    
}

function create_bubbless(){
    var margin = {top: 20, right: 50, bottom: 100, left: 100};
    var svg = d3.select(".scatter");
    w = svg.attr('width') - margin.left - margin.right;
    h = svg.attr('height') - margin.top - margin.bottom;
}

function create_bubbles() {

    // Setup axes
    var xScale = d3.scaleLinear()
        .domain([0, 100000])
        .range([0, w]);

    var yScale = d3.scaleLinear()
        .domain([0, 35])
        .range([h, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").select(".scatter")
                               .attr("width", w + margin.left + margin.right)
                               .attr("height", h + margin.top + margin.bottom)
                               .append("g")
                               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
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
                   .text('GDP');

    // y-axis
    svg.append("g").attr("class", "y axis")
                   .call(yAxis)
                   .append("text")
                   .attr("class", "label")
                   .attr("transform", "rotate(-90)")
                   .attr("y", 6)
                   .attr("dy", ".71em")
                   .style("text-anchor", "end")
                   .text('teenViolence');

    // labels

    svg.append("text").attr("x", (w/2))
                    .attr("y", (20))
                    .attr("text-anchor", "middle")
                    .attr("font-weight", "bold")
                    .style("font-size", "16px")
                    .style("font-family", "Arial")
                    .text("Teens living in violent areas vs. GDP");

    svg.append("text").attr("x", (w/2))
                    .attr("y", (h + 50))
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("font-family", "Arial")
                    .text("GDP");

    svg.append("text").attr("x", (w-145))
                    .attr("y", 30)
                    .attr("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("font-family", "Arial")
                    .text("Legend");

    svg.append("text").attr("x", -200)
                    .attr("y", -50)
                    .attr("text-anchor", "middle")
                    .attr('transform', 'rotate(-90)')
                    .style("font-size", "12px")
                    .style("font-family", "Arial")
                    .text("Children (0-17) living in areas with problems with crime or violence (%)");

    // draw dots
    svg.selectAll(".dot").data(dataset[t])
                        .enter().append("circle")
                          .attr("class", "dot")
                          .attr("r", 7)
                          .attr("cx", d => xScale(d["GDP"]))
                          .attr("cy", e => yScale(e["teenVio"]))
                          .style("fill",  function(f){
                                if (f["teenPreg"] > 2.0 && f["teenPreg"] < 16.4){ return "#fde0dd"}
                                if (f["teenPreg"]> 16.4 && f["teenPreg"] < 29.5){ return "#fa9fb5"}
                                if (f["teenPreg"] > 29.5){ return "#c51b8a" }
         })
                          .on("mouseover", function(d) {
                              tooltip.transition()
                                   .duration(200)
                                   .style("opacity", .9);
                              tooltip.html("Country: " + d["Country"] + "<br> Teen Pregnancy Rate: " + d["teenPreg"])
                                   .style("left", (d3.event.pageX + 10) + "px")
                                   .style("top", (d3.event.pageY - 28) + "px");
                          })
                          .on("mouseout", function(d) {
                              tooltip.transition()
                                   .duration(500)
                                   .style("opacity", 0);
                          });

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

function click_circle() {

}

function change_year() {

}

function select_genre() {

}

function create_lines() {

}

function create_radio() {

}