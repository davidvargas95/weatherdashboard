var apiKey = "8a3df2d4149c73620293eafae4c053d0"

function weather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

}

$("#searchButton").on("click", function() {

    var city = $("#cityInput").val();   

    weather(city);
});