import themes from "./modules/themes"
import data   from "./modules/data"
import Vuex   from "vuex"
import Vue    from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    themes,
    data
  }
})