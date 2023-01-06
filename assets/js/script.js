// store OpenWeather API key
var WeatherApiKey = "d26e27c935d07fe0582289eb42ae5b1c";
// store user input for city 
var userCity = "Detroit"; // may want to add state and country 
// a query URL
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + WeatherApiKey;
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// get data using fetch

function getWeather ( ) {
    fetch(queryURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
};

getWeather();

// need to update to get the next 5 days too
    // retreive geo coordinates for a given city name using https://openweathermap.org/api/weathermaps
    // then pass into the forecast call

    // 1.1. City name - yes
    // 1.2. Date - yes
        // try using this https://openweathermap.org/api/one-call-3
    // 1.3. Conditions - yes (will need icon)
    // 1.4. Temp - yes 
        // uses kelvins, here is how to change https://openweathermap.org/api/one-call-3#data
    // 1.5. Humidity - yes 
    // 1.6. Wind speed - yes 

// 2. Save city name in local storage to keep the record of user history 

// 3. HTML and CSS 
    // 3.1. Title "Weather Dashboard" / "Get Weather" / "Know Weather"
    // 3.2. Search Bar 
    // 3.3. Btns to save and retrieve search history (city name should be the key)
        // 3.3.1. Created dynamically in js
        // 3.3.2. Everytime btn is clicked API fetches data for chosen city
    // 3.4. Today's forecast for a given city 
        // 3.4.1. Created dynamically in js
        // 3.4.2. Data is updated when the city btn is clicked 
    // 3.5. 5-day future forecast sections 
        // 3.5.1 Created dynamically in js
        // Data is updated when the city btn is clicked 

    // See if I can add bootstrap and googlefont apis