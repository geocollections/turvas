import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueScrollTo from "vue-scrollto";
import "./assets/css/styles.css";

Vue.config.productionTip = false;

Vue.use(VueScrollTo, {
  container: "body",
  duration: 100,
  easing: "ease",
  offset: -64,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
