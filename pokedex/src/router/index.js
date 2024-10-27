import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Habilidades from '../views/Habilidades.vue'
import Sobre from '../views/Sobre.vue'
import Status from '../views/Status.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: 'habilidades', component: Habilidades },
        { path: 'sobre', component: Sobre },
        { path: 'status', component: Status },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
