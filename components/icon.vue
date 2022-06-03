<template>
  <fa :icon="icon" :size="props.size" class="fa-fw" />
</template>

<script lang="ts" setup>
const props = defineProps({
  i: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: null,
  },
});

const icon = computed(() => {
  const data = props.i.split(" ");
  return [`fa-${data[0]}`, data[1]];
});
</script>
