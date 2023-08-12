const axios = require('axios');

const API_KEY = 'a24a4a7b8c4e0d1e4be3e723606d43ba';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter city name: ', async (city_name) => {
    const url = `${BASE_URL}?q=${city_name}&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const data = response.data;
            const temperature = data.main.temp - 273.15;
            const weather_description = data.weather[0].description;
            const humidity = data.main.humidity;
            const wind_speed = data.wind.speed;
            const weather_condition_code = data.weather[0].id;
            let chance_of_rain = 'Low';
            
            if (weather_condition_code >= 500 && weather_condition_code < 600) {
                chance_of_rain = 'High';
            }

            console.log(`Weather in ${city_name.charAt(0).toUpperCase() + city_name.slice(1)}:`);
            console.log(`Temperature: ${temperature.toFixed(2)} C`);
            console.log(`Description: ${weather_description.charAt(0).toUpperCase() + weather_description.slice(1)}`);
            console.log(`Humidity: ${humidity}%`);
            console.log(`Wind Speed: ${wind_speed} m/s`);
            console.log(`Chance of Rain: ${chance_of_rain}`);
        } else {
            console.log('Error fetching weather data. Please check your input or try again later.');
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        rl.close();
    }
});