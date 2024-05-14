import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DasboardView.vue'

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

  router.beforeEach((to, from, next) => {
    const name = window.localStorage.getItem('name');
    if (to.name === 'profile') {
      next();
    } else {
      if (!name) {
        next({ name: 'profile' });
      } else {
        next();
      }
    }
  });


export default router
