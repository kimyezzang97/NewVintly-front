// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './route'; // route.ts에서 정의한 라우터 설정을 불러옴


// 브라우저 환경에서 process가 없으므로 직접 문자열 사용
const BASE_URL = '/'; 

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes, // 이전에 정의한 routes 배열을 사용
});

export default router;