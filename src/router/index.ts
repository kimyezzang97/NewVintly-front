// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './route'; // route.ts에서 정의한 라우터 설정을 불러옴

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // 이전에 정의한 routes 배열을 사용
});

export default router;