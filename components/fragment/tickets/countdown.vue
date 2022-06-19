<template>
  <div class="box flex flex-col p-5 drop-shadow-md">
    <TimerUnit :digit="data.number" title="REMAINING TICKETS" />
    <TimerCountdown :timestamp="data.timestamp" class="mt-5" />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { data } = await useFetch(`${config.public.apiUrl}/tickets/countdown`);
</script>
