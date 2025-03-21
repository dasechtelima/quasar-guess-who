const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/add-players',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddPlayers.vue') }],
  },

  {
    path: '/flip-phone',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FlipPhone.vue') }],
  },

  {
    path: '/game-screen',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GameScreen.vue') }],
  },
  {
    path: '/stats',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/StatsScreen.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
