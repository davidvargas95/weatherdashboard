var apiKey = "8a3df2d4149c73620293eafae4c053d0"

function weather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

    var temp = (response.main.temp);
    var date = moment().format("MM/DD/YYYY");
    var icon = (response.weather[0].icon);
    // var URL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $("#cityName").html("<h3>" + response.name + " " + date + "</h3>");
    // $("weatherImage").attr("src", weatherURL);
    $("#temp").text("Temperature: " + temp.toFixed(2) + "°F");
    $("#rh").text("Humidity: " + response.main.humidity + "%");
    $("wind").text("Wind: " + response.wind.speed + "mph");

    $("selectedCity").removeClass("d-none");

}

$("#searchButton").on("click", function() {

    var city = $("#cityInput").val();   
    var cityList = $(`<button class= "list-group-item mx-3 mr-sm-2 w-50" data-city= "${city}">${city}</button>`);

    $("#cityList").prepend(cityList);

    weather(city);
});