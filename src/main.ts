import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router"; // router/index.ts 파일을 불러옵니다
import { createPinia } from "pinia";

const pinia = createPinia();

loadFonts();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
