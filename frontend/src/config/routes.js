import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from "@/pages/homePages/Home.vue"
import UserHome from "@/pages/userPages/userHome.vue"
import About from "@/pages/homePages/About"
import Login from "@/pages/homePages/Login"
import CadastreExpense from "@/pages/userPages/CadastreExpense.vue"
import Months from "@/pages/userPages/Months.vue"
import History from "@/pages/userPages/History.vue"

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
    {
        name:'CadastreExpense',
        path:'/CadastreExpense',
        component: CadastreExpense,
    },
    {
        name:'Months',
        path:'/Months',
        component: Months,
    },
    {
        name:'History',
        path:'/History',
        component: History,
    },
]

export default new VueRouter({
        mode:'history',
        routes,
        props:{
            default: true,
        }
    })