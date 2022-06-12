<template>
  <div class="contents">
    <!--FragmentTimer title="CHECK OUR OFFERS!" class="mb-8" /-->
    <FragmentTicketsPackage class="mb-4 lg:mb-7" />
    <FragmentTicketsInstructions class="mb-4 lg:mb-7" />
    <div class="box block w-full p-5 drop-shadow-md">
      <FragmentTicketsForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "form",
  title: "TICKETS",
});
</script>
