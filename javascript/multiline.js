var first_of_year = 0;
var full_data = 0;
var current_year = 2018;

function drawMultiLine(current_year) {

    // Load data
    d3v5.json("json/positions.json").then(function (dataset) {
        full_data = dataset;
        first_of_year = dataset[current_year][Object.keys(dataset[current_year])[0]];
        createLines(first_of_year);
    });

    function createLines(dataset) {

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
            .range([0, width - margin]);

        var yScale = d3v5.scaleLinear()
            .domain([100, 0])
            .range([height - margin, 0]);

        var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);

        /* Add SVG */
        var svg = d3v5.select(".multiline").append("svg")
            .attr("id", "line")
            // .attr("width", (width+margin)+"px")
            // .attr("height", (height+margin)+"px")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 525 300")
            .append('g')
            .attr("transform", `translate(${margin}, ${margin})`);

        /* Add Axis into SVG */
        var xAxis = d3v5.axisBottom(xScale).ticks(5);
        var yAxis = d3v5.axisLeft(yScale).ticks(5);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - margin})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append('text')
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Total values");

        /* Add line into SVG */
        var line = d3v5.line()
            .x(d => xScale(d.week))
            .y(d => yScale(d.pos));

        let lines = svg.append('g')
            .attr('class', 'lines');

        lines.selectAll('.line-group')
            .data(dataset).enter()
            .append('g')
            .attr('class', 'line-group')
            .on("mouseover", function (d, i) {
                svg.append("text")
                    .attr("class", "title-text")
                    .style("fill", color(i))
                    .text(d.name)
                    .attr("text-anchor", "middle")
                    .attr("x", (width - margin) / 2)
                    .attr("y", 5);
            })
            .on("mouseout", function (d) {
                svg.select(".title-text").remove();
            })
            .append('path')
            .attr('class', 'line')
            .attr('d', d => line(d.values))
            .style('stroke', (d, i) => color(i))
            .style('opacity', lineOpacity)
            .on("mouseover", function (d) {
                d3v5.selectAll('.line')
                    .style('opacity', otherLinesOpacityHover);
                d3v5.selectAll('.circle')
                    .style('opacity', circleOpacityOnLineHover);
                d3v5.select(this)
                    .style('opacity', lineOpacityHover)
                    .style("stroke-width", lineStrokeHover)
                    .style("cursor", "pointer");
            })
            .on("mouseout", function (d) {
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
            .data(dataset).enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data(d => d.values).enter()
            .append("g")
            .attr("class", "circle")
            .on("mouseover", function (d) {
                d3v5.select(this)
                    .style("cursor", "pointer")
                    .append("text")
                    .attr("class", "text")
                    .text(`${d.pos}`)
                    .attr("x", d => xScale(d.week) + 5)
                    .attr("y", d => yScale(d.pos) - 10);
            })
            .on("mouseout", function (d) {
                d3v5.select(this)
                    .style("cursor", "none")
                    .transition()
                    .duration(duration)
                    .selectAll(".text").remove();
            })
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.week)
            })
            .attr("cy", d => yScale(d.pos))
            .attr("r", circleRadius)
            .style('opacity', circleOpacity)
            .on("mouseover", function (d) {
                d3v5.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadiusHover);
            })
            .on("mouseout", function (d) {
                d3v5.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadius);
            });

    }

    drawMultiLine.createLines = createLines;
}

function updateLines(current_year, artist) {

    var svgL = d3v5.select(".multiline");
    svgL.selectAll("*").remove();

    var dataUpdateLines = 0;
    var artist = artist;

    if (artist === "first") {
        dataUpdateLines = full_data[current_year][Object.keys(full_data[current_year])[0]]
    }
    else {
        // full_data.forEach(function (lookup, i) {
        //     if (artist in full_data[current_year][i]) {
        //         dataUpdateLines = full_data[current_year][full_data[current_year][i]];
        //     }
        // });
        console.log(artist);
        dataUpdateLines = full_data[current_year][artist];
        console.log(dataUpdateLines)
    }

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
        .range([0, width - margin]);

    var yScale = d3v5.scaleLinear()
        .domain([100, 0])
        .range([height - margin, 0]);

    var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);

    /* Add SVG */
    var svg = d3v5.select(".multiline").append("svg")
        .attr("id", "line")
        // .attr("width", (width+margin)+"px")
        // .attr("height", (height+margin)+"px")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 525 300")
        .append('g')
        .attr("transform", `translate(${margin}, ${margin})`);

    /* Add Axis into SVG */
    var xAxis = d3v5.axisBottom(xScale).ticks(5);
    var yAxis = d3v5.axisLeft(yScale).ticks(5);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Total values");

    /* Add line into SVG */
    var line = d3v5.line()
        .x(d => xScale(d.week))
        .y(d => yScale(d.pos));

    let lines = svg.append('g')
        .attr('class', 'lines');

    lines.selectAll('.line-group')
        .data(dataUpdateLines).enter()
        .append('g')
        .attr('class', 'line-group')
        .on("mouseover", function (d, i) {
            svg.append("text")
                .attr("class", "title-text")
                .style("fill", color(i))
                .text(d.name)
                .attr("text-anchor", "middle")
                .attr("x", (width - margin) / 2)
                .attr("y", 5);
        })
        .on("mouseout", function (d) {
            svg.select(".title-text").remove();
        })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function (d) {
            d3v5.selectAll('.line')
                .style('opacity', otherLinesOpacityHover);
            d3v5.selectAll('.circle')
                .style('opacity', circleOpacityOnLineHover);
            d3v5.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
        })
        .on("mouseout", function (d) {
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
        .data(dataUpdateLines).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")
        .on("mouseover", function (d) {
            d3v5.select(this)
                .style("cursor", "pointer")
                .append("text")
                .attr("class", "text")
                .text(`${d.pos}`)
                .attr("x", d => xScale(d.week) + 5)
                .attr("y", d => yScale(d.pos) - 10);
        })
        .on("mouseout", function (d) {
            d3v5.select(this)
                .style("cursor", "none")
                .transition()
                .duration(duration)
                .selectAll(".text").remove();
        })
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.week)
        })
        .attr("cy", d => yScale(d.pos))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function (d) {
            d3v5.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
        })
        .on("mouseout", function (d) {
            d3v5.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
        });
}

drawMultiLine(current_year);