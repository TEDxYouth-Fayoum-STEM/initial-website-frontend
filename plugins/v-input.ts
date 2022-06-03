export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("input", {
    updated(el: HTMLInputElement, binding) {
      if (el.getAttribute("type") !== "file") {
        el.value = binding.value;
      }
    },
  });
});
