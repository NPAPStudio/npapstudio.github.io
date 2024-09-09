import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'GPT-Playground',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      layout: false,
      routes: [
        { path: '', component: '@/pages/Home' },
        { path: 'chat/:id', component: '@/pages/Home' },
      ],
    },
    {
      path: '/bot',
      component: '@/layouts/bot',
      layout: false,
      routes: [
        { path: '', component: '@/pages/Bot' },
        { path: ':id', component: '@/pages/Bot' },
      ],
    },
    { path: '/chat', redirect: '/' },

    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  esbuildMinifyIIFE: true,
  npmClient: 'npm',
});
