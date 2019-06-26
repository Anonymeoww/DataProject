var current_year = 2018;
var radar_data = 0;

function drawRadarChart() {

    // Load data
    d3v5.json("json/hotstuffwgenres.json").then(function (all_data) {
        radar_data = all_data;
        var correct_data = select_data(all_data, current_year);
        createRadar(correct_data, [0])
    });


    function createRadar(year_data, index_list) {
        console.log(index_list);
        var margin = {top: 50, right: 50, bottom: 50, left: 50};
        var width = 550 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        var color = d3v5.scaleOrdinal().range(["#c51b8a", "#CC333F", "#00A0B0"]);

        d3v5.select(".radar").append("svg")
            .attr("id", "radar")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 550 400")
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

        var datas = [];
        index_list.forEach(function (index) {
            var data = [];
            var dataset = year_data[index]["AF"][0];
            var axes = ["acousticness", "danceability", "energy", "liveness", "valence"];
            axes.forEach(function (add) {
                var radar_obj = {};
                radar_obj["axis"] = add;
                radar_obj["value"] = dataset[add];
                data.push(radar_obj);
            });
            datas.push(data);
        });

        RadarChart("#radar", datas, radarChartOptions);

    }
}

function select_data(dataset, t) {
    var int_t = parseInt(t, 10);
    var data_array = [];
    Object.keys(dataset[int_t]).forEach(function (list_element) {
        data_array.push(dataset[int_t][list_element]);
    });
    return data_array
}

function updateRadar(current_year, index_list) {

    var year_data = select_data(radar_data, current_year);

    var svgR = d3v5.select(".radar");
    svgR.selectAll("*").remove();

    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var width = 550 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var color = d3v5.scaleOrdinal().range(["#c51b8a", "#CC333F", "#00A0B0"]);

    d3v5.select(".radar").append("svg")
        .attr("id", "radar")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 550 400")
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

    var datas = [];
    index_list.forEach(function (index) {
        var data = [];
        var dataset = year_data[index]["AF"][0];
        console.log(dataset);
        var axes = ["acousticness", "danceability", "energy", "liveness", "valence"];
        axes.forEach(function (add) {
            var radar_obj = {};
            radar_obj["axis"] = add;
            radar_obj["value"] = dataset[add];
            data.push(radar_obj);
        });
        console.log(data);
        datas.push(data);
    });

    console.log(datas);

    RadarChart("#radar", datas, radarChartOptions);
}

drawRadarChart();