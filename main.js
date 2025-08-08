const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    getWeather(searchBox.value.trim());
  }
});

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayResults(data);
      } else {
        alert("City not found!");
      }
    })
    .catch(error => console.error("Error fetching weather:", error));
}

function displayResults(weather) {
  document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  document.querySelector('.location .date').innerText = dateBuilder(now);

  document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  document.querySelector('.current .weather').innerText = weather.weather[0].main;
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
getWeather("Istanbul");