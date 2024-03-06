<script setup>
import { ref } from "vue";
import axios from "axios";
import moment from "moment";

import { useFetchWeather } from "@/composables/useFetchWeather";
const { weatherApi } = useFetchWeather();

const props = defineProps({ city: { type: String } });

const loading = ref(true);
const seaLevel = ref(null);
const wind = ref(null);
const humidity = ref(null);

const forecast = ref([]);

try {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=${weatherApi.value}`
  );

  const response2 = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=metric&appid=${weatherApi.value}`
  );
  const weatherData = response.data;
  const forecastData = response2.data.list;

  wind.value = weatherData.wind.speed;
  seaLevel.value = weatherData.main.sea_level;
  humidity.value = weatherData.main.humidity;

  const filteredData = forecastData
    .map((item) => {
      return {
        date: moment(item.dt_txt.split(" ")[0]),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        iconUrl: `https://api.openweathermap.org/img/w/${item.weather[0].icon}.png`,
      };
    })
    .reduce((acc, item) => {
      if (!acc.some((day) => day.date.isSame(item.date, "day"))) {
        acc.push(item);
      }
      return acc;
    }, [])
    .slice(1, 5);

  loading.value = false;
  forecast.value = filteredData;

  console.log(filteredData);
} catch (error) {
  loading.value = true;
  console.log("Error fetch weather data");
}

const getDayName = (date) => {
  return date.format("ddd");
};

const changeLocation = () => {
  window.location.reload();
};
</script>

<template>
  <div class="ml-2 w-2/3 bg-[#212730] text-white rounded-xl">
    <div class="info mx-auto my-1 w-11/12">
      <div class="m-3">
        <div class="flex justify-between">
          <p class="font-semibold">海平面</p>
          <p v-if="seaLevel > 0">{{ seaLevel }}</p>
          <p v-else>無數據</p>
        </div>
      </div>
      <div class="m-3">
        <div class="flex justify-between">
          <p class="font-semibold">濕度</p>
          <p>{{ humidity }}</p>
        </div>
      </div>
      <div class="m-3">
        <div class="flex justify-between">
          <p class="font-semibold">風速</p>
          <p>{{ wind }}</p>
        </div>
      </div>
    </div>
    <div class="card-wrap mx-auto my-1 w-11/12 bg-[rgb(33,38,53)] rounded-lg">
      <div v-if="loading" class="p-3 text-center">Loading</div>
      <ul v-else class="py-3 flex justify-evenly">
        <li
          class="bg-[rgb(36,58,88)] w-1/5 text-center rounded-lg transition-transform hover:scale-110"
          v-for="day in forecast"
          :key="day.date"
        >
          <div class="py-3 flex">
            <img class="block m-auto" :src="day.iconUrl" />
          </div>
          <div class="py-3">{{ getDayName(day.date) }}</div>
          <div class="py-3">{{ day.temperature }}&#176;C</div>
        </li>
      </ul>
    </div>
    <div class="flex my-4">
      <button
        type="button"
        @click="changeLocation"
        class="btn mx-auto text-white bg-gradient-to-r from-cyan-400 to-fuchsia-500"
      >
        關閉查詢
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-wrap {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.18);
}
</style>
