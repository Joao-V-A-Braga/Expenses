import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from "@/pages/Home.vue"
import UserHome from "@/pages/userPages/userHome.vue"
import About from "@/pages/About"
import Login from "@/pages/Login"

Vue.use(VueRouter)

const routes = [
    {
        name:'Home',
        path:'/',
        component: Home
    },
    {
        name:'UserHome',
        path:'/UserHome',
        component: UserHome,
    },
    {
        name:'About',
        path:'/About',
        component: About,
    },
    {
        name:'Login',
        path:'/Login',
        component: Login,
    },
]

export default new VueRouter({
        mode:'history',
        routes,
        props:{
            default: true,
        }
    })