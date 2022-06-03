<template>
  <Html>
    <Head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,
      max-scale=1, user-scalable=0"
      />
      <link rel="favicon" href="/favicon.ico" />
    </Head>
    <Body class="">
      <div
        class="txt flex min-h-screen w-full flex-col overflow-y-hidden bg-light dark:bg-dark"
      >
        <PageHeader />
        <NuxtLayout class="grow">
          <NuxtPage></NuxtPage>
        </NuxtLayout>
        <PageFooter />
      </div>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
const route = useRoute();

useHead({
  title: `${route.meta.title} | TEDxYouth@FayoumSTEM`,
});

const config = useRuntimeConfig();

onMounted(() => {
  window.apiUrl = config.public.apiUrl;
});
</script>
