<template>
  <footer class="box mt-10 select-none p-2 px-5 pb-3 text-center">
    <div class="space-x-3 text-3xl">
      <a href="https://linktr.ee/TEDxYouthFayoumSTEM" target="_blank">
        <svg
          class="svg-inline--fa fa-fw fa-sm hover:opacity-75"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18.25 15.37"
        >
          <polygon points="-0.6 -0.01 -0.6 -0.01 -0.6 -0.01 -0.6 -0.01" />
          <path
            class="linktree-a"
            d="M7.39.43A.82.82,0,0,0,6.28.12.77.77,0,0,0,6,.43L.68,10a.73.73,0,0,0,.67,1.05H4.92v3.63a.69.69,0,0,0,.68.68H7.69a.69.69,0,0,0,.68-.68V11.08h-1A.75.75,0,0,1,6.65,10L9.6,4.68Z"
            transform="translate(-0.6 -0.01)"
          />
          <path
            class="linktree-b"
            d="M12.06.43a.81.81,0,0,1,1.1-.31.8.8,0,0,1,.32.31L18.77,10a.73.73,0,0,1-.68,1.05h-3.5v3.63a.69.69,0,0,1-.68.68H11.69a.69.69,0,0,1-.67-.68V11.08h1A.75.75,0,0,0,12.74,10l-3-5.35Z"
            transform="translate(-0.6 -0.01)"
          />
        </svg>
      </a>
      <a
        v-for="brand in brands"
        :key="brand.i"
        :href="setBrandLink(brand.link)"
        target="_blank"
      >
        <Icon
          :i="setBrandIcon(brand.i)"
          class="hover:opacity-75"
          :class="brand.class"
        />
      </a>
    </div>
    <div class="mt-1 lg:mt-2">
      <Marked text="TEDxYouth@FayoumSTEM" /> |
      <Marked :text="`© ${year}`" /> All Rights Reserved.
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();

const brands = [
  {
    i: "facebook-square",
    class: "text-brand-fb",
    link: "www.facebook.com/TEDxYouthFayoumSTEM",
  },
  {
    i: "instagram-square",
    class: "text-brand-ig",
    link: "www.instagram.com/tedxyouthfayoumstem",
  },
  {
    i: "twitter-square",
    class: "text-brand-tw",
    link: "twitter.com/TEDxFayoumSTEM",
  },
  {
    i: "linkedin",
    class: "text-brand-ln",
    link: "www.linkedin.com/company/tedxyouth-fayoumstem",
  },
  {
    i: "youtube",
    class: "text-brand-yt",
    link: "www.youtube.com/channel/UCX3RG2B5peBpygePsVUzoeg",
  },
];

function setBrandLink(link: string): string {
  return `https://${link}`;
}

function setBrandIcon(i: string): string {
  return `brands ${i}`;
}
</script>

<style scoped>
.linktree-a {
  fill: #39e09b;
}
.linktree-b {
  fill: #28bf7b;
}
</style>
