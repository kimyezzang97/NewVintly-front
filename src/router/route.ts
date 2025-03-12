const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [{ path: '/test', component: () => import('@/pages/IndexPage.vue') }],
    },
]

export default routes;