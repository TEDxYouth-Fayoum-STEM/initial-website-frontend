<template>
  <div class="box flex flex-col justify-items-center p-5 drop-shadow-md">
    <Title :text="props.title" mb="mb-8" class="text-center" />
    <TimerCountdown :timestamp="1654725600000" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
