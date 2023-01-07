// store OpenWeather API key
var weatherApiKey = "d26e27c935d07fe0582289eb42ae5b1c";
// store user input for city 
var userCity = "Los Angeles";
// a query URL to get lat and lon coordinates by city name
var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${weatherApiKey}`;

// get city coordinates using using fetch, then get weather report using those coordinates 
function getWeather ( ) {
    fetch(queryUrl)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        // a query URL to get weather using city lat and lon coordinates 
        // limit to getting data for today and a 5-day forcast 
        // added imperial units to get temp in Fahrenheit and wind speed in MPH
        var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${weatherApiKey}&units=imperial`;
        

            fetch(cityWeatherUrl)
            .then (function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var cityName = data.city.name;
                console.log(cityName);
                var objLength = data.list.length;

                // loop to get data for 1 timestamp a day for 5 days
                for (var i = 0; i < objLength; i+=7) {
                    var forecastDate = new Date(data.list[i].dt_txt).toDateString();
                    console.log(forecastDate);
                    var cityConditon = data.list[i].weather[0].main;
                    console.log(cityConditon);
                    var cityTemp = `${Math.floor(data.list[i].main.temp)} °F`;
                    console.log(cityTemp);
                    var cityHum = `${data.list[i].main.humidity} %`;
                    console.log(cityHum);
                    var cityWindSpeed = `${data.list[i].wind.speed} MPH`;
                    console.log(cityWindSpeed);
                };
            });
    })};

// list of conditions for icons
// https://openweathermap.org/weather-conditions

//  attach to onclick listener for all buttons 
// getWeather();

// Save city name in local storage to keep the record of user history 

