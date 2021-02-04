export const navBtn = {
  namespaced: true,
  state: {
      appBarRect:""
  },
  actions: {
      getAppBarRect ({commit},appBarRect) {
        commit('appBarRect', appBarRect)
      }
  },
  mutations: {
      appBarRect(state, appBarRect) {
        state.appBarRect = appBarRect
      }
  }
}
