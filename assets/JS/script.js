var apiKey = "8a3df2d4149c73620293eafae4c053d0"


var saved = JSON.parse(localStorage.getItem("previouslySearched")) || [];

for (i = 0; i < saved.length; i++) {

  var cityButton = $(`<button class="list-group-item mx-3 mr-sm-2 w-75" data-city="${saved[i]}">${saved[i]}</button>`);

  $("#cityList").prepend(cityButton);
}


$("#searchButton").on("click", function() {

    var city = $("#cityInput").val();   
    var cityList = $(`<button class= "list-group-item mx-3 mr-sm-2 w-75" data-city= "${city}">${city}</button>`);

    $("#cityList").prepend(cityList);

    saved.push(city);
    localStorage.setItem("previouslySearched", JSON.stringify(saved));

    weather(city);
    forecast(city);
});

$("#cityList").on("click", "button", function () {

    var cityButton = $(this).data("city");

    weather(cityButton);
    forecast(cityButton);
});

function weather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#selectedCity").removeClass("d-none");


        var temp = (response.main.temp);
        var date = moment().format("MM/DD/YYYY");
        var weatherIcon = (response.weather[0].icon);
        var URL = "https://openweathermap.org/img/w/" + weatherIcon + ".png";

        $("#cityName").html(response.name + " " + date + "<img id= 'wicon' src= '' alt= 'Weather Icon'>");
        $("#wicon").attr("src", URL);
        $("#temp").text("Temperature: " + temp.toFixed(2) + "°F");
        $("#rh").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + response.wind.speed + "mph");
       
        uvIndex(response.coord.lat, response.coord.lon);

    })
};

function uvIndex(lat, lon) {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#uvIndex").text("UV Index: " + response.value);
    })
};

function forecast(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: forecastURL,
        method: "GET"
      }).then(function (forecastFiveDay) {
      console.log(forecastFiveDay);
      
      var forecastFiveDay = forecastFiveDay.list;
      
      $(document).ready(function() {
      
        $("#date").text(`(${moment().format("l")})`);
          for (i = 1; i < 7; i++) {
            var forecastDate = $(`#date${i}`);
            forecastDate.text(moment().add(`${i}`, "d").format("l"));
      
          };
      
          for (i = 0; i < forecastFiveDay.length; i++) {
      
              $("#forecastIcon" + i).attr("src", "https://openweathermap.org/img/wn/" + (forecastFiveDay[i].weather[0].icon) + ".png");
              $("#temp" + i).text("Temp: " + Math.round(forecastFiveDay[i].main.temp) + " °F");
              $("#rh" + i).text("Humidity: " + forecastFiveDay[i].main.humidity + "%");
            
            }
      });           
    })};