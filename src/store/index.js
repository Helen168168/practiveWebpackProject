import vue from 'vue'
import Vuex from 'vuex'
import testStore from './modules/test'

//注册状态管理器
vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    testStore
  }
})

