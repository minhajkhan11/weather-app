
let apiKey = "6df571e5f97e9a79f40294c3d1f85eeb";
let inputBox = document.getElementById("input-box");
let searchBtn = document.getElementById("search-btn");
let cityName = document.getElementById("city");
let temp = document.querySelector(".temperature");
let lowest = document.querySelector(".lowest");
let weatherImage = document.querySelector("#weatherImg");
let sunRise = document.querySelector(".sunrise-time");
let sunSet = document.querySelector(".sunset-time");
let cloudiNess = document.querySelector(".cloudiness-per");
let pressure = document.querySelector(".pressure-mb");
let windSpeed = document.querySelector(".wind-speed");
let humidity_per = document.querySelector(".humidity");
let feelsLike = document.querySelector(".feels-like");
let visibilityDis = document.querySelector(".visibility-dis");
let country = document.querySelector(".country");


inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputBox.value);
    inputBox.value = "";
  }
});

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
    inputBox.value = "";
});

async function checkWeather(city) {
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let weatherData = await fetch(`${url}`).then((res) => res.json());


  cityName.innerHTML = `${weatherData.name}` + " ";
  country.innerHTML = `${weatherData.sys.country}`
  temp.innerHTML = Math.round(`${weatherData.main.temp}`) + "<sup>&deg;C</sup>";
  lowest.innerHTML =
    Math.round(`${weatherData.main.temp_min}`) + "<sup>&deg;C</sup>";

  switch (weatherData.weather[0].main) {
    case "Clouds":
            weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/clouds.png";
      break;
    case "Rain":
      if(isDaytime(weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone)){
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/rain-day.png";
      }
      else{
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/rain-night.png";
      }
      break;
    case "Drizzle":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/heavy-rain.png";
      break;
    case "Snow":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/snow.png";
      break;
    case "mist":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/haze-mist-fog.png";
      break;
    case "haze":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/haze-mist-fog.png";
      break;
    case "fog":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/haze-mist-fog.png";
      break;
    case "smoke":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/smoke.png";
      break;
    case "Sand":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/sand.png";
      break;
    case "Dust":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/sand.png";
      break;
    case "Ash":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/ash.png";
      break;
    case "Tornado":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/tornado.png";
      break;
    case "Thunderstorm":
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/thunder-storm.png";
      break;
    case "Clear":
       if(isDaytime(weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone)){
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/clear-day.png";
      }
      else{
      weatherImage.src = "https://minhajkhan11.github.io/weatherApp/images/clear-night.png";
      }
      break;
    }


  sunRise.innerHTML = timeConvert(weatherData.sys.sunrise);
  sunSet.innerHTML = timeConvert(weatherData.sys.sunset);
  feelsLike.innerHTML =  Math.round(`${weatherData.main.feels_like}`) + "&deg;";
  humidity_per.innerHTML = Math.round(`${weatherData.main.humidity}`) + "%";
  pressure.innerHTML = Math.round(`${weatherData.main.pressure}`) + " mb";
  cloudiNess.innerHTML = Math.round(`${weatherData.clouds.all}`) + "%";
  visibilityDis.innerHTML =  Math.round( weatherData.visibility / 1000) + " km";
  windSpeed.innerHTML =  Math.round( weatherData.wind.speed * 3.6) + " km/h";
  
}

function timeConvert(unixTimestamp){
    const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function isDaytime(sunriseUnix, sunsetUnix, timezoneOffset) {
  const nowUTC = Math.floor(Date.now() / 1000);

  // Convert all times to location's local time
  const localNow = nowUTC + timezoneOffset;
  const localSunrise = sunriseUnix + timezoneOffset;
  const localSunset = sunsetUnix + timezoneOffset;

  return localNow >= localSunrise && localNow < localSunset;
}


