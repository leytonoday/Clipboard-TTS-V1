import VueRouter  from 'vue-router'
import Vue        from 'vue'

// Solution for NavigationDuplication error
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) { originalPush.call(this, location).catch(err => err) }

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue") // all components are lazy loaded
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue")
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/Help.vue")
  },
  {
    path: "*",
    component: () => import("../views/Home.vue")
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView() // Router-links preserve the scroll position, so scroll to the top of the page on route change
  }
})

export default router
