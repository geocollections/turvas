import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "@/i18n";
import "@babel/polyfill";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/styles.css";

Vue.config.productionTip = false;

// Gets preferred language from store (fallback is ee)
i18n.locale = store?.state?.settings?.language || "ee";

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
