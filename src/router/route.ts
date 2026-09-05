// 이 프로젝트는 admin 전용이므로, 실제 기능 화면은 ROLE_ADMIN만 들어갈 수 있다.
// meta.requiresAdmin 이 붙은 라우트는 router/index.ts 의 전역 가드가 검사한다.
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/IndexPage.vue") }],
  },
  {
    path: "/auth",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "join", component: () => import("@/pages/auth/JoinPage.vue") },
      { path: "login", component: () => import("@/pages/auth/LoginPage.vue") },
    ],
  },
  {
    path: "/vintage",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/vintage/vintagePage.vue"),
        meta: { requiresAdmin: true },
      },
    ],
  },
];

export default routes;
