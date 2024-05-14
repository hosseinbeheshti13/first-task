import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: HomeView
    },
    {
      path: '/toDoList',
      name: 'toDo',
      component: () => import('../views/ToDoListView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileInfo.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('../views/WeatherInfo.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (window.localStorage.getItem('name') == '') next({ name: 'profile' })
//   else next({ name: 'dashboard' })
// })

export default router
