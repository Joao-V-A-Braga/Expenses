import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from "@/pages/Home.vue"
import UserHome from "@/pages/userPages/userHome.vue"

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
]

export default new VueRouter({
        mode:'history',
        routes,
        props:{
            default: true,
        }
    })