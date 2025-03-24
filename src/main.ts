import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router"; // router/index.ts 파일을 불러옵니다
import { createPinia } from "pinia";

import * as VueCookies from "vue-cookies";

const pinia = createPinia();

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueCookies, {
    expire: "7d",
    path: "/",
    secure: false, // true : HTTPS 환경에서만 쿠키 사용
    sameSite: "None",
  })
  .mount("#app");
