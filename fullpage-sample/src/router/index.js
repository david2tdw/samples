import Vue from 'vue'
import Router from 'vue-router'
import fullpageJquery from '@/components/fullpage-jquery'
import fullpageModule from '@/components/fullpage-module'
import manualScroll from '@/components/manual-scroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'fullpageJquery',
      component: fullpageJquery
    },
    {
      path: '/fullpageModule',
      name: 'fullpageModule',
      component: fullpageModule
    },
    {
      path: '/manualScroll',
      name: 'manualScroll',
      component: manualScroll
    }
  ]
})
