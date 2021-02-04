import MessageService from '../services/message.service'

export const message = {
  namespaced: true,
  state: {
    createdMessage: { status: '' },
    modifiedMessage: { status: '' },
    deletedMessage: { status: '' },
    messages: '',
  },
  actions: {
    addLike({ commit }, payload) {
      return MessageService.addLike(payload).then(
        (response) => {
          commit('addLikeSuccess', response)
          return Promise.resolve(response)
        },
        (error) => {
          commit('addLikeFailure')
          return Promise.reject(error)
        }
      )
    },
    removeLike({ commit }, payload) {
      return MessageService.removeLike(payload).then(
        (response) => {
          commit('removeLikeSuccess', response)
          return Promise.resolve(response)
        },
        (error) => {
          commit('removeLikeFailure')
          return Promise.reject(error)
        }
      )
    },
    getAllMessage({ commit }) {
      return MessageService.getAllMessage().then(
        (response) => {
          commit('getAllMessageSuccess', response)
          return Promise.resolve(response)
        },
        (error) => {
          commit('getAllMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    createMessage({ commit }, message) {
      return MessageService.createMessage(message).then(
        (response) => {
          commit('createMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('createMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    replyMessage({ commit }, message) {
      return MessageService.replyMessage(message).then(
        (response) => {
          commit('replyMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('replyMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    modifyMessage({ commit }, message) {
      return MessageService.modifyMessage(message).then(
        (response) => {
          commit('modifyMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('modifyMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    deleteMessage({ commit }, payload) {
      return MessageService.deleteMessage(payload).then(
        (response) => {
          commit('deleteMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('deleteMessageFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    removeLikeSuccess() {},
    removeLikeFailure() {},
    addLikeSuccess() {},
    addLikeFailure() {},
    getAllMessageSuccess(state, response) {
      state.messages = response.data.results
    },
    getAllMessageFailure() {},
    createMessageSuccess(state) {
      state.createdMessage.status = 'Posted'
    },
    createMessageFailure(state) {
      state.createdMessage.status = 'Not posted'
    },
    replyMessageSuccess(state) {
      state.createdMessage.status = 'Replied'
    },
    replyMessageFailure(state) {
      state.createdMessage.status = 'Not replied'
    },
    modifyMessageSuccess(state) {
      state.modifiedMessage.status = 'Modified'
    },
    modifyMessageFailure(state) {
      state.modifiedMessage.status = 'Not Modified'
    },
    deleteMessageSuccess(state) {
      state.deletedMessage.status = 'Deleted'
    },
    deleteMessageFailure(state) {
      state.deletedMessage.status = 'Not Deleted'
    }
  }
}
