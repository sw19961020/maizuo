
import http from '@/util/http'

const module = {
  namespaced: true,
  state: {
    cinemaInfoList: []
  },
  mutations: {
    setCinemaInfo (state, data) {
      state.cinemaInfoList = data
    },
    clearList (state) {
      state.cinemaInfoList = []
    }
  },
  actions: {
    getCinemaInfo (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=4126059`,
        method: 'get',
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinemaInfo', res.data.data.cinemas)
      })
    }
  }
}
export default module
