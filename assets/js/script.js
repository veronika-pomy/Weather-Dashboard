// store OpenWeather API key
var weatherApiKey = "d26e27c935d07fe0582289eb42ae5b1c";
// store user input for city 
var userCity;
// grab search btn using jQuery
var searchBtn = $("#search-btn");
// store html els to insert generated data 
var cityEl = $("#city-today");
var dateEl = $("#today-date");
var condEl = $("#today-conditions");
var tempEl = $("#today-temp");
var windEl = $("#today-wind");
var humEl = $("#today-humidity");
var fiveDayHeaderEl = $(".five-days-header");

// function to create btns for cities searches
function createBtn ( ) {
    var userInput = $("#user-input").val();
    var newBtn = $("<button>").appendTo(".history-container")
    newBtn.addClass("city-btn");
    newBtn.text(userInput);
};

// function to get city coordinates using using fetch, then get weather report using those coordinates 
function getWeather ( ) {
    var userCity = $("#user-input").val();
    // a query URL to get lat and lon coordinates by city name
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${weatherApiKey}`;
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

                // determine which emoji to insert for today's weather condition
                var todayConditonData = data.list[0].weather[0].main;
                var displayTodayCondition;

                if (todayConditonData === "Clear") {
                    displayTodayCondition = "🔆";
                } else if (todayConditonData === "Clouds") {
                    displayTodayCondition = "☁️";
                } else if (todayConditonData === "Atmosphere") {
                    displayTodayCondition = "🌫️";
                } else if (todayConditonData === "Snow") {
                    displayTodayCondition = "❄️";
                } else if (todayConditonData === "Rain") {
                    displayTodayCondition = "🌧️";
                } else if (todayConditonData === "Drizzle") {
                    displayTodayCondition = "☂️";
                } else if (todayConditonData === "Thunderstorm") {
                    displayTodayCondition = "⛈️";
                } else {
                    displayTodayCondition = todayConditonData;
                };

                // insert class to create border around today's weather container
                $(".insert-els").addClass("today-container");

                // insert today's conditions
                cityEl.text(cityName);
                dateEl.text(new Date(data.list[0].dt_txt).toDateString());
                condEl.text(displayTodayCondition);
                tempEl.text(`Temp: ${Math.floor(data.list[0].main.temp)} °F`);
                windEl.text(`Wind: ${data.list[0].wind.speed} MPH`);
                humEl.text(`Humidity: ${data.list[0].main.humidity} %`);

                // insert value for the 5-day header 
                fiveDayHeaderEl.text("5-Day Forecast");

                // loop to get data for 1 timestamp a day for 5 days
                for (var i = 5; i < objLength; i+=7) {
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
        }
    );
};

// function executes creation of btns and weather search on the same click 
function userInput ( ) {
    createBtn ( );
    getWeather ( );
};

searchBtn.on("click", userInput);

// Save city name in local storage to keep the record of user history 

