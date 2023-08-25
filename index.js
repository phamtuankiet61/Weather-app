
const searchInput = document.querySelector('#search-input');

const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const sunRise = document.querySelector('.column-1 .sunrise .value');
const sunSet = document.querySelector('.column-2 .sunset .value');
const humidity = document.querySelector('.column-1 .humidity .value');
const wind = document.querySelector('.column-2 .wind .value');

const DEFAULT_VALUE = "--";
const apiId = "0a60891ab5af16d5eba1ff7939702354";

searchInput.addEventListener('change', e => {
    const townInput = e.target.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${townInput}&appid=${apiId}&units=metric&lang=vi`)
        .then(res => res.json())
        .then(data => {
            if (data) {
                cityName.innerText = data.name || DEFAULT_VALUE;
                weatherState.innerText = data.weather[0].description || DEFAULT_VALUE;
                weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                temperature.innerText = Math.round(data.main.temp) || DEFAULT_VALUE;
                sunRise.innerText = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
                sunSet.innerText = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
                humidity.innerText = data.main.humidity + "%" || DEFAULT_VALUE;
                wind.innerText = data.wind.speed + " km/h" || DEFAULT_VALUE;
            }
        })
        .catch(err => {
            alert('Nhập không đúng! Vui lòng nhập lại')
            searchInput.value = "";
        })
});

