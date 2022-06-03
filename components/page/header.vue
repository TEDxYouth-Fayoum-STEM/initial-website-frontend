<template>
  <header
    class="box-dark mt-0 flex flex-col items-center py-4 px-5 transition-all sm:px-8 md:flex-row md:px-6 lg:px-20"
  >
    <div class="flex w-full items-center p-1">
      <img
        class="w-52 md:w-60 lg:w-72"
        src="/logo-dark.png"
        width="1445"
        height="312"
      />
      <div class="block grow text-right md:hidden">
        <Btn i="solid bars" @click="handleNav" />
      </div>
    </div>
    <nav
      class="animate__animated animate__faster mt-6 flex-col items-center gap-y-2 transition-all md:mt-0 md:grow md:flex-row md:justify-end md:gap-y-0 md:gap-x-4 lg:gap-x-6"
      :class="[navStatus ? 'flex' : 'hidden md:flex', navAnimation]"
    >
      <div
        v-for="page in pages"
        :key="page.text"
        class="navbar-link text-base font-medium transition-all md:text-lg"
      >
        <NuxtLinkX :to="page.to">
          {{ page.text }}
        </NuxtLinkX>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const pages = [
  { text: "PERSEIDS", to: "/" },
  { text: "TICKETS", to: "/tickets" },
  { text: "OFFERS", to: "/offers" },
  // { text: "NEWS", to: "/news" },
  // { text: "SUPPORT", to: "/support" },
];

const navStatus = ref(false);
const navAnimation = ref("");
function handleNav(): void {
  if (navStatus.value) {
    navAnimation.value = "animate__fadeOutUp";
    setTimeout(() => {
      navStatus.value = false;
      navAnimation.value = "";
    }, 500);
  } else {
    navStatus.value = true;
    navAnimation.value = "animate__fadeInDown";
    setTimeout(() => {
      navAnimation.value = "";
    }, 500);
  }
}
</script>

<style scoped>
.navbar-link a.active {
  @apply text-primary-200;
}

.navbar-link:not(.active) {
  @apply hover:text-primary-200;
}
</style>
