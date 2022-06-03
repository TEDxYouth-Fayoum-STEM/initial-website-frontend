<template>
  <div :class="[flex, width, spacing]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const flex = "flex flex-col";
const width = "w-auto sm:w-[600px] md:w-[625px] lg:w-[975px] xl:w-[1000px]";
const spacing = "mt-6 md:mt-7 lg:mt-8 mx-5 sm:mx-auto";
</script>
