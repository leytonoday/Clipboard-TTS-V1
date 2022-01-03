import Vue    from 'vue'
import App    from './App.vue'
import store  from "./store"
import router from "./router"
import Vuesax from "vuesax"
import        "./style.css"
import        "bulma/css/bulma.css"
import        "vuesax/dist/vuesax.css"

import { Titlebar, Color } from 'custom-electron-titlebar'

new Titlebar({
  backgroundColor: Color.fromHex("#1e2023"),
  menu: null,
  titleHorizontalAlignment: "left",
})


Vue.config.productionTip = false
Vue.use(Vuesax)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
