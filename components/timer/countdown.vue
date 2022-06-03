<template>
  <div class="timer-container mb-3 flex-col gap-x-6 gap-y-3 md:flex-row">
    <TimerUnit :digit="timer.days.value" title="DAYS" />
    <TimerUnit :digit="timer.hours.value" title="HOURS" />
    <TimerUnit :digit="timer.minutes.value" title="MINUTES" />
    <TimerUnit :digit="timer.seconds.value" title="SECONDS" />
  </div>
</template>

<script setup lang="ts">
import { useTimer } from "vue-timer-hook";

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

const timer = useTimer(props.timestamp, true);
</script>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
}
</style>
