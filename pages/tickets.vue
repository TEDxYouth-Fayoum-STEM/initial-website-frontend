<template>
  <div class="contents">
    <div class="box p-5 drop-shadow-md">
      <!--FragmentTicketsForm /-->
      <Title text="CHECK OUR OFFERS" mb="mb-8" class="text-center" />
      <TimerCountdown :timestamp="1654290000000" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "form",
  title: "TICKETS",
});
</script>
