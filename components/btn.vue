<template>
  <button
    :type="type"
    class="bg-primary-200 text-center font-medium text-white hover:bg-primary-300 disabled:hover:bg-primary-200"
    :class="style"
  >
    <Icon v-if="props.i" :i="props.i" :size="isize" />
    <template v-else>{{ props.text }}</template>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  i: {
    type: String,
    default: null,
  },
  isize: {
    type: String,
    default: "lg",
  },
  text: {
    type: String,
    default: null,
  },
  submit: {
    type: Boolean,
    default: false,
  },
});

const type = computed(() => (props.submit ? "submit" : "button"));
const style = computed(() =>
  props.i ? "text-xl rounded-md px-1.5 py-1.5" : "rounded-lg px-5 py-2.5"
);
</script>
