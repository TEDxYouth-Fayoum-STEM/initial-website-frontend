export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animate", {
    mounted(el: HTMLDivElement, binding) {
      const animation = binding.value || "flash";
      el.classList.add("animate__animated", `animate__${animation}`);
      setTimeout(() => {
        el.classList.remove(`animate__${animation}`);
      }, parseInt(binding.arg || "1000"));
    },
  });
});
