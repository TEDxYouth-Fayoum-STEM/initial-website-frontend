<template>
  <div
    v-animate
    class="select-none font-bold text-primary-300 transition-all hover:grayscale hover:motion-safe:animate-pulse"
    :class="[props.size, props.mb, { animate__animated: animated }]"
  >
    {{ props.text }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "text-3xl",
  },
  mb: {
    type: String,
    default: "mb-3",
  },
  animated: {
    type: Boolean,
    default: false,
  },
});
</script>
