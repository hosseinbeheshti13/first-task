<template>
  <div class="dashboard">
    <div class="current-time">{{ currentTime }}</div>
    <div class="good-morning"><h4>{{ $t("goodMorning") }}</h4></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
const currentTime = ref(moment().format('HH:mm:ss'))
// Update currentTime every second
setInterval(() => {
  currentTime.value = moment().format('HH:mm:ss')
}, 1000)
</script>
<style scoped>
.dashboard {
  text-align: center;
  padding: 24% 0px;
  background-color: #00dcff;
  height: 100%;
}

.good-morning , .current-time{
  font-size: 34px;
    color: #747474;
    font-weight: 700;
}
</style>
