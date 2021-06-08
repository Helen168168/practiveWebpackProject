/**
 * vue-router有三种钩子函数
 * 全局：router.beforeEach((to, from, next) => {}) 和 router.afterEach((to, from, next) => {})
 * 单个路由钩子函数：beforeEnter(to, from, next){ next() }
 * 组件级钩子函数: beforeRouteEnter(to, from, next){ next() }路由钩子函数比生命周期beforeCreate函数先执行，所以this实例还没有创建出来
*/
import Vue from "vue"
import Router from "vue-router"

//注册路由
Vue.use(Router)

let routes = [
    {
        path: "/",
        name: "index",
        redirect: "/index"
    },
    {
        path: "/index",
        name: "firstPage",
        component: () => import("@/views/login")
    }
]

export default new Router({
    routes: routes,
    mode: "hash"
})