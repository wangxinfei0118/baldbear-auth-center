import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component:() => import('@/components/layout'),
      redirect:'/login',
      children:[
        {
          path:'/login',
          component:() => import('@/views/auth/login')
        }
      ]
    },
    {
      path: '/refresh',
      component: ()=> import('@/components/layout'),
      children: [
        {
          path: '',
          component: () => import('@/views/auth/refresh'),
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) =>{
  if (to.path === '/logout'){
    store.dispatch('toLogout', to.query.redirectURL)
  }
  else {
    next()
  }
})
export default router