
const module = {
  namespaced: true,
  state: {
    name: '北京',
    cityId: '110100'
  },
  mutations: {
    changeCityName (state, name) {
      state.name = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    }
  },
  actions: {

  }
}

export default module
