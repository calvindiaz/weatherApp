import axios from "axios";
import { ref } from "vue";

export function useFetchWeather() {
  const city = ref("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=6d3c36be2dd3452ee751207694bc3064`
      );
      const weatherData = response.data;
    } catch (error) {
      console.log("API error");
    }
    return { city, fetchData, weatherData };
  };
}
