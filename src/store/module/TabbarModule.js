
const module = {
  namespaced: true,
  state: {
    tabbarIsshow: true
  },
  mutations: {
    hide (state) {
      state.tabbarIsshow = false
    },
    show (state) {
      state.tabbarIsshow = true
    }
  },
  actions: {

  }
}
export default module
