import { createRouter, createWebHistory } from 'vue-router'
import VueRouter from 'vue-router'
import NotFound from '@/views/error/NotFound.vue'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import UserHomeView from '@/views/user/UserHomeView.vue'


const routes = [
  {
    path: "/",
    name: "LoginRegisterView",
    component: LoginRegisterView,
  },

  {
    path: "/user/home",
    name: "UserHomeView",
    component:UserHomeView,
    children: [
      {
        path: "/UserPerson",
        name: "UserPerson",
        component: () => import("@/views/Person.vue"),
      },
      {
        path: "/UserPassword",
        name: "UserPassword",
        component: () => import("@/views/Password.vue"),
      },

      {
        path: "/ManAndAsset",
        name: "ManAndAsset",
        component: () => import("@/views/user/ManAndAsset.vue"),
      },

      {
        path: "/Order",
        name: "Order",
        component: () => import("@/views/user/Order.vue"),
      },

      {
        path: "/Risk",
        name: "Risk",
        component: () => import("@/views/user/Risk.vue"),
      },

      {
        path: "/Answer",
        name: "Answer",
        component: () => import("@/views/user/Answer.vue"),
      },
      {
        path: "/Report",
        name: "Report",
        component: () => import("@/views/user/Report.vue"),
      },
      


      
    ],
  },
  
  
]



const router = createRouter({
  //history模式：createWebHistory , hash模式：createWebHashHistory
  history: createWebHistory(process.env.BASE_URL),
  routes
})


/*const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
*/

//提供一个重置路由的方法
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
  })
}

export default router
