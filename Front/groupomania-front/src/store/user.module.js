import UserService from '../services/user.service'

export const user = {
  namespaced: true,
  state: {
    allUsers: ''
  },
  actions: {
    getAllUser({ commit }) {
      return UserService.getAllUser().then(
        (response) => {
          commit('getAllUserSuccess', response)
          return Promise.resolve(response)
        },
        (error) => {
          commit('getAllUserFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getAllUserSuccess(state, response) {
      state.allUsers = response.data.results
    },
    getAllUserFailure() {}
  }
}
