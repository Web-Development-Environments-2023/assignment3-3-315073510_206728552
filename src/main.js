import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials=true
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);





// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// axios.defaults.withCredentials=true
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  last_searched: localStorage.last_searched,
  login(username) {
    localStorage.setItem("username", username);
    // Vue.$cookie.set("username", '5')
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("last_searched");
    this.username = undefined;
    this.last_searched = undefined;
  },
  search(last_searched) {
    localStorage.setItem("last_searched", last_searched);
    // Vue.$cookie.set("username", '5')
    this.last_searched = last_searched;
    console.log("search", this.last_searched);
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
