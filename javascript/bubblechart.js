var current_year = 2018;

function drawBubbleChart() {

    var checkbox = d3v5.select("#controls").append("input")
                    .attr("id", "checkRap")
                    .attr("type", "checkbox")
                    .attr("checked", "true");

    // Load data
    d3v5.json("json/hotstuffwgenres.json").then(function(all_data) {
        var correct_data = select_data(all_data, current_year);
        createBubbles(correct_data);

        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");
        output.innerHTML = slider.value; // Display the default slider value

        slider.oninput = function() {
            current_year = this.value;
            output.innerHTML = current_year;
            correct_data = select_data(all_data, current_year);
            createBubbles.updateBubbles(correct_data);
            updateLines(current_year, "first");
            updateRadar(current_year, [0] )
        }
    });

    function createBubbles(dataset) {

        // Dimensions and scales

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
            // .attr("width", w + margin.left + margin.right)
            // .attr("height", h + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1200 550")
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
        svg.append("text").attr("x", (w / 2))
            .attr("y", (0))
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .text("Bubble chart");

        svg.append("text").attr("x", (w / 2))
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
            .attr("cy", function (d) {
                return yScale(d["AF"][0]["danceability"])
            })
            .attr("r", 5)
            .attr("cx", function (d) {
                return xScale(d["AF"][0]["energy"])
            })
            .attr("id", function (f) {
                if (rap.test(f["Genres"])) {
                    return "rap"
                } else if (rock.test(f["Genres"])) {
                    return "rock"
                } else if (pop.test(f["Genres"])) {
                        return "pop"
                } else {
                    return "other"
                }
            })
            .style("fill", function (color) {
                if (rap.test(color["Genres"])) {
                    return "#BEA8A7"
                } else if (rock.test(color["Genres"])) {
                    return "#b2b2ff"
                } else if (pop.test(color["Genres"])) {
                    return "#89023E"
                } else {
                    return "#000000"
                }
            })
            .on('click', function (d) {
                var title = d["Title"];
                var artist = d["Artist"];
                click_circle(dataset, artist);
            });

        document.getElementById("checkRap").addEventListener("click", select_genre);
        document.getElementById("checkRock").addEventListener("click", select_genre);
        document.getElementById("checkPop").addEventListener("click", select_genre);
        document.getElementById("checkOther").addEventListener("click", select_genre);
        select_genre();

        function updateBubbles(dataset) {
            var rap = /rap/;
            var rock = /rock/;
            var pop = /pop/;
            var svg = d3v3.select("#scatter");

            svg.selectAll(".dot")
                .data(dataset)  // Update with new data
                .transition()  // Transition from old to new
                .duration(1000)  // Length of animation
                .each("start", function () {  // Start animation
                    d3v3.select(this)  // 'this' means the current element
                        .attr("fill", "red")  // Change color
                        .attr("r", 3);  // Change size
                })
                .delay(function (d, i) {
                    return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
                })
                //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration),
                .attr("class", "dot")
                .attr("cx", function (d) {
                    return xScale(d["AF"][0]["energy"]);  // Circle's X
                })
                .attr("cy", function (d) {
                    return yScale(d["AF"][0]["danceability"]);  // Circle's Y
                })
                .attr("r", 5)
                .attr("id", function (f) {
                    if (rap.test(f["Genres"])) {
                        return "rap"
                    } else if (rock.test(f["Genres"])) {
                        return "rock"
                    } else if (pop.test(f["Genres"])) {
                        return "pop"
                    } else {
                        return "other"
                    }
                })
                .style("fill", function (color) {
                    if (rap.test(color["Genres"])) {
                        return "#ffffff"
                    } else if (rock.test(color["Genres"])) {
                        return "#b2b2ff"
                    } else if (pop.test(color["Genres"])) {
                        return "#89023E"
                    } else {
                        return "#000000"
                    }
                })
                .each("end", function () {  // End animation
                    d3v3.select(this)  // 'this' means the current element
                        .transition()
                        .duration(500)
                        .attr("fill", "black")  // Change color
                        .attr("r", 5);  // Change radius
                });
            svg.selectAll(".dot").data(dataset)
                        .exit().remove();
        }

        createBubbles.updateBubbles = updateBubbles;
    }

    function select_data(dataset, t){
        var int_t = parseInt(t, 10);
        var data_array = [];
        Object.keys(dataset[int_t]).forEach(function (list_element) {
            data_array.push(dataset[int_t][list_element])
        });
        return data_array
    }


    function click_circle(dataset, title){
        console.log(title);

        var artist = "";
        for (var i = 0; i < dataset.length; i++) {

            if (dataset[i]["Title"] == title){
                artist = dataset[i]["Artist"];
                console.log(dataset[i]["Artist"])
                console.log(dataset[i]["Genres"])
            }
        }
        var index_list = [];
        dataset.forEach(function (search, i){
            if (dataset[i]["Artist"] == artist){
                index_list.push(i)
            }
        });
        //updateRadar(current_year, index_list);
        updateLines(current_year, artist)
    }
    //
    // function click_circle(dataset, artist){
    //
    //     var artist = artist;
    //
    //     var index_list = [];
    //     dataset.forEach(function (search, i){
    //         if (dataset[i]["Artist"] == artist){
    //             index_list.push(i)
    //         }
    //     });
    //     updateRadar(current_year, index_list);
    //     updateLines(current_year, artist)
    // }
    function select_genre() {
        svg = d3v5.select("#scatter");
        // Bind function to onclick event for checkbox
        document.getElementById('checkRap').onclick = function() {
            // access properties using this keyword
            console.log("Checkbox function fires: " + this.checked);
            if ( this.checked ) {
                // Returns true if checked
                svg.selectAll("#rap").style("opacity", "1")
            }
            else {
                // Returns false if not checked
                svg.selectAll("#rap").style("opacity", "0")
            }
        };

        document.getElementById('checkRock').onclick = function() {
            // access properties using this keyword
            if ( this.checked ) {
                // Returns true if checked
                svg.selectAll("#rock").style("opacity", "1")
            }
            else {
                // Returns false if not checked
                svg.selectAll("#rock").style("opacity", "0")
            }
        };

        document.getElementById('checkPop').onclick = function() {
            // access properties using this keyword
            if ( this.checked ) {
                // Returns true if checked
                svg.selectAll("#pop").style("opacity", "1")
            }
            else {
                // Returns false if not checked
                svg.selectAll("#pop").style("opacity", "0")
            }
        };

        document.getElementById('checkOther').onclick = function() {
            // access properties using this keyword
            if ( this.checked ) {
                // Returns true if checked
                svg.selectAll("#other").style("opacity", "1")
            }
            else {
                // Returns false if not checked
                svg.selectAll("#other").style("opacity", "0")
            }
        };
    }
}

drawBubbleChart();
