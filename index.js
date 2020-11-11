function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    let cityName = cityInput.value;
    cityElement.innerHTML = cityName;
  
    retrieveWeatherForCityName(cityName).then(showTemperature);
  }
  
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    console.log(response);
    let city = response.data.name;
    let message = `${city}`;
    let h1 = document.querySelector("#city");
    h1.innerHTML = message;
    let span = document.querySelector("#tempCurrent");
    span.innerHTML = `${temperature}`;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  
  function showLocalWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let message = `${city}`;
    let h1 = document.querySelector("#city");
    h1.innerHTML = message;
    let span = document.querySelector("#tempCurrent");
    span.innerHTML = `${temperature}`;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  
  function retrieveWeatherForPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    return axios.get(url);
  }
  
  function retrieveWeatherForCityName(city) {
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    return axios.get(apiUrl);
  }
  
  function displayLocalWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrieveAndShowWeatherForPosition);
  }
  
  let apiKey = "4f3edca022a0c7a9d3299ee0cd142e64";
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentButtonForm = document.querySelector("#current-location-form");
  currentButtonForm.addEventListener("submit", displayLocalWeather);
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let retrieveAndShowWeatherForPosition = (position) => {
    retrieveWeatherForPosition(position).then(showLocalWeather);
  };
  
  navigator.geolocation.getCurrentPosition(retrieveAndShowWeatherForPosition);
  