<template>
  <span class="font-bold" :class="color">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: "low",
  },
});

const color = computed(() => {
  switch (props.priority) {
    case "high":
      return "text-primary-300";
    case "med":
      return "text-primary-300";
    default:
      return null;
  }
});
</script>
