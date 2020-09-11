import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => {
        require(['components/linechart'], resolve)
      },
    },
    {
      path: '/area',
      name: 'area',
      component: (resolve) => {
        require(['views/responsiveChart'], resolve)
      },
    },
  ],
})
export default router
