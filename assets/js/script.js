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
// grab history container el that will contain buttons for user search history
var historyEl = $(".history-container");

// function to create btns for city searches
function createBtn ( ) {
    var userInput = $("#user-input").val();
    var newBtn = $("<button>").appendTo(".history-container")
    newBtn.addClass("city-btn");
    newBtn.text(userInput);
    localStorage.setItem(userInput, userInput); // saves the names of cities searched
    // call function to get data using input value
    getWeather(userInput);
};

// function to get city coordinates using using fetch, then get weather report using those coordinates, and display data to user 
function getWeather (input) {
    var userCity = input;
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
                var objLength = data.list.length;

                // function determine which emoji to insert for weather condition for today
                var todayConditonData = data.list[0].weather[0].main;
                var displayTodayCondition;

                function getEmoji ( ) {
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
                };

                getEmoji ( );

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

                // variables to store data for the 5-day forecast 
                var datesArr = [];
                var condArr = [];
                var tempArr = [];
                var windArr = [];
                var humArr = [];

                // loop to get weather data for a given date once, excluding today's date
                for (var i = 0; i < objLength-1; i++) {
                    if (new Date(data.list[i].dt_txt).getDate() !== new Date(data.list[i+1].dt_txt).getDate()) {
                        datesArr.push(new Date(data.list[i+1].dt_txt).toDateString());
                        condArr.push(data.list[i+1].weather[0].main);
                        tempArr.push(`Temp: ${Math.floor(data.list[i+1].main.temp)} °F`);
                        windArr.push(`Wind: ${data.list[i].wind.speed} MPH`);
                        humArr.push(`Humidity: ${data.list[i].main.humidity} %`);
                    }; 
                };

                // convert condition string into emojis for the 5-Day Forecast Array
                for (let i = 0; i < condArr.length; i++){
                    todayConditonData = condArr[i];
                    getEmoji ( );
                    condArr[i] = displayTodayCondition;
                };

                // insert data values into html els for the 5-Day Forecast 
                for (var i = 0; i < datesArr.length; i++) {
                    // insert css style for divs
                    $(`#day-${i+1}`).addClass("day");
                    $(`#header-day-${i+1}`).text(datesArr[i]);
                    $(`#cond-day-${i+1}`).text(condArr[i]);
                    $(`#temp-day-${i+1}`).text(tempArr[i]);
                    $(`#wind-day-${i+1}`).text(windArr[i]);
                    $(`#hum-day-${i+1}`).text(humArr[i]);
                };
            });
        }
    );
};

// function executes creation of btns and weather search on the same click 
function userInput ( ) {
    createBtn ( );
};

// listen for clicks on search button
searchBtn.on("click", userInput);

// listen for clicks on search history buttons
historyEl.on("click", function (event) {
    var element = event.target;
    var userCityHis = element.textContent;
    // call function to get weather data using cities from search history
    getWeather(userCityHis);
    console.log(userCityHis);
});
