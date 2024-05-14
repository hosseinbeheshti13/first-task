<template>
  <div style="text-align: center">
    <a-select v-model:value="selectedCity" @change="fetchWeatherData">
      <a-select-option v-for="city in cities" :key="city.city" :value="city.city">
        {{ city.city }}
      </a-select-option>
    </a-select>

    <div v-if="weatherData" class="weather-detail">
      <h4 class="city-name">{{ selectedCity }}</h4>
      <h4 class="temperature">{{ weatherData.current.temperature2m }}°C</h4>
      <h4 class="weather">{{ weatherData.current.weather }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchWeatherApi } from 'openmeteo'
import { ref } from 'vue'
import cityData from '@/assets/ir.json'

const cities = ref(cityData)
const selectedCity = ref('Enter city')
const weatherData = ref({ current: { temperature2m: 0, weather: '', windSpeed10m: 0 } })

const fetchWeatherData = async () => {
  const city = cities.value.find((city) => city.city === selectedCity.value)
  if (city) {
    const params = {
      latitude: [parseFloat(city.lat)],
      longitude: [parseFloat(city.lng)],
      current: ['temperature_2m', 'rain', 'showers', 'snowfall', 'wind_speed_10m'],
      hourly: 'temperature_2m'
    }
    const url = 'https://api.open-meteo.com/v1/forecast'
    const responses = await fetchWeatherApi(url, params)

    const response = responses[0]
    const currentWeather = response.current()
    if (currentWeather) {
      const temperature2m = currentWeather.variables(0)!.value()
      const rain = currentWeather.variables(1)!.value()
      const showers = currentWeather.variables(2)!.value()
      const snowfall = currentWeather.variables(3)!.value()
      const windSpeed10m = currentWeather.variables(4)!.value()

      console.log(rain, showers, snowfall)
      let weather = 'Clear'
      if (rain || showers) {
        weather = 'Rainy'
      } else if (snowfall) {
        weather = 'snowy'
      }

      weatherData.value = {
        current: {
          temperature2m,
          weather,
          windSpeed10m
        }
      }
    }
  }
}
</script>

<style scoped>
.weather-detail {
  margin: 13%;
  padding: 5%;
  border: 1px solid #eee;
}
</style>
