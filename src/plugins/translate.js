import i18n from "@/i18n";

const translate = {
  install(Vue, options) {
    Vue.directive("translate", function(el, binding) {
      let value = i18n.locale === "ee" ? binding.value.et : binding.value.en;
      if (
        value &&
        binding.value.characterLimit &&
        value.length > binding.value.characterLimit
      )
        value = value.substring(0, binding.value.characterLimit) + "...";
      if (binding.value.useInnerText) el.innerText = value ? value : "";
      else el.innerHTML = value ? value : "";
    });

    Vue.prototype.$translate = translations => {
      return i18n.locale === "ee"
        ? translations.et
        : translations.en ?? translations.et;
    };
  }
};

export default translate;
