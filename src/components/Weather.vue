<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

import { useFetchWeather } from "@/composables/useFetchWeather";
const { weatherApi } = useFetchWeather();

const props = defineProps({ city: { type: String } });

const temperature = ref(null);
const description = ref(null);
const iconUrl = ref(null);
const date = ref(null);
const time = ref(null);
const name = ref(null);
const country = ref(null);

const monthNames = reactive([
  "January 1月",
  "February 2月",
  "March 3月",
  "April 4月",
  "May 5月",
  "June 6月",
  "July 7月",
  "August 8月",
  "September 9月",
  "October 10月",
  "November 11月",
  "December 12月",
]);

try {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=${weatherApi.value}`
  );
  const weatherData = response.data;

  temperature.value = Math.round(weatherData.main.temp);
  description.value = weatherData.weather[0].description;
  name.value = weatherData.name;
  iconUrl.value = `https://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  country.value = weatherData.sys.country;

  const d = new Date();
  date.value =
    d.getFullYear() + "-" + monthNames[d.getMonth()] + "-" + d.getDate();
  time.value = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  console.log(weatherData);
} catch (error) {
  console.log("API error");
}
</script>

<template>
  <div class="wrap w-1/3 bg-[url('/beach.jpg')] bg-cover text-white rounded-xl">
    <div class="w-full h-full backdrop-brightness-50 flex flex-col">
      <h1 class="text-white text-2xl ml-2">Today</h1>
      <small class="ml-2 text-lg">{{ date }}</small>
      <br />
      <small class="m-2 text-lg">{{ time }}</small>
      <h2 class="ml-2 grow">
        <i class="pr-2 fa fa-location"></i>{{ name
        }}<small class="pl-2">{{ country }}</small>
      </h2>
      <h3 class="ml-2">{{ temperature }}&#176;C</h3>
      <h3 class="ml-2">
        {{ description }} <img class="inline-block" :src="iconUrl" />
      </h3>
    </div>
  </div>
</template>

<style scoped></style>
