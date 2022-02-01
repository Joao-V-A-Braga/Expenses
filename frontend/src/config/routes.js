import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from "@/pages/Home.vue"

Vue.use(VueRouter)

const routes = [
    {
        name:'Home',
        path:'/',
        component: Home
    }
]

export default new VueRouter({
        mode:'history',
        routes
    })