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
    ],
  },
];

export default routes;
