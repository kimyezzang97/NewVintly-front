import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router"; // router/index.ts 파일을 불러옵니다
import { createPinia } from "pinia";
import { useKakao } from 'vue3-kakao-maps';
import * as VueCookies from "vue-cookies";

const pinia = createPinia();

loadFonts();
useKakao('f2f953d223c2496fcc35b505a40518b2');
createApp(App)
  .use(vuetify)
  // pinia를 router보다 먼저 설치한다.
  // 라우터 가드가 useAuthStore()를 쓰기 때문에, 반대 순서면 스토어가 없는 상태로 가드가 돌 수 있다.
  .use(pinia)
  .use(router)
  .use(VueCookies, {
    expire: "7d",
    path: "/",
    secure: false, // true : HTTPS 환경에서만 쿠키 사용
    sameSite: "None",
  })
  .mount("#app");
