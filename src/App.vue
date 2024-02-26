<script setup>
import { ref, nextTick, defineAsyncComponent } from "vue";
import Weather from "@/components/Weather.vue";
import DaysWeather from "@/components/DaysWeather.vue";

const city = ref("");
const showWeather = ref(false);

const searchWeather = async () => {
  showWeather.value = false;
  await nextTick();
  showWeather.value = true;
};
</script>

<template>
  <div class="bg-[#121212] w-dvw h-dvh flex flex-col">
    <section class="mx-auto my-14 w-3/4 text-white bg-[#212730] rounded-lg">
      <h1 class="mt-3 text-center">天氣查詢應用程式</h1>
      <div class="mx-auto my-5 flex w-1/2">
        <input
          type="text"
          class="form-control"
          v-model="city"
          placeholder="請輸入城市or國家的英文名稱"
        />
        <button
          class="ml-3 btn text-white bg-gradient-to-r from-cyan-400 to-fuchsia-500"
          @click="searchWeather"
        >
          Search<i class="inline fas fa-search px-1 text-white"></i>
        </button>
      </div>
    </section>
    <br />
    <section class="mx-auto w-3/4 flex justify-between">
      <Suspense>
        <template #default>
          <Weather :city="city" v-if="showWeather" />
        </template>
      </Suspense>
      <Suspense>
        <template #default>
          <DaysWeather :city="city" v-if="showWeather" />
        </template>
      </Suspense>
    </section>
  </div>
</template>

<style scoped></style>
