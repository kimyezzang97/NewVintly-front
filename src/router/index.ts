// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './route'; // route.ts에서 정의한 라우터 설정을 불러옴
import { useAuthStore } from '@/store/auth';


// 브라우저 환경에서 process가 없으므로 직접 문자열 사용
const BASE_URL = '/';

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes, // 이전에 정의한 routes 배열을 사용
});

const LOGIN_PATH = '/auth/login';

/**
 * 전역 가드 - admin 전용 프로젝트라 기능 화면은 ROLE_ADMIN만 통과시킨다.
 *
 * 서버도 같은 요청을 막지만(SecurityConfig), 가드가 없으면 주소창으로 직접 들어온 사용자가
 * 빈 화면에서 401 알림만 계속 보게 된다. 여기서 미리 돌려보낸다.
 * 스토어는 가드가 실행될 때(= pinia 설치 후) 꺼낸다.
 */
router.beforeEach((to) => {
  if (!to.meta.requiresAdmin) return true;

  const authStore = useAuthStore();

  // 비로그인 - 로그인 후 원래 가려던 곳으로 돌려보내기 위해 경로를 남긴다
  if (!authStore.isAuthenticated) {
    return { path: LOGIN_PATH, query: { redirect: to.fullPath } };
  }

  // 로그인은 했지만 관리자가 아님
  if (!authStore.isAdmin) {
    return { path: '/' };
  }

  return true;
});

export default router;
