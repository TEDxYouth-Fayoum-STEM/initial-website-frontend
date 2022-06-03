<template>
  <div :class="[flex, width, spacing]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const flex = "flex flex-col lg:flex-row items-center content-center";
const width = "w-auto sm:w-[600px] md:w-[550px] lg:w-[950px] xl:w-[1050px]";
const spacing = "mt-6 md:mt-7 lg:mt-8 mx-5 sm:mx-auto gap-x-12";
</script>
