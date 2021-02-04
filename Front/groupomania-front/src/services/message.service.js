import axios from 'axios'
import authHeader from './auth-header'
import store from '../store'

const API_URL = 'http://localhost:3000/api/messages/'

class MessageService {
  addLike(payload) {
    const id = payload
    return axios.post(
      API_URL + id + '/like',
      { idUSERS: store.state.auth.user.userId, idMESSAGES: payload },
      { headers: authHeader() }
    )
  }

  removeLike(payload) {
    const id = payload
    return axios.delete(API_URL + id + '/like', { headers: authHeader() })
  }

  createMessage(message) {
    return axios.post(
      API_URL + '',
      {
        title: message.title,
        content: message.content,
        idUSERS: store.state.auth.user.userId,
        username: store.state.auth.user.username
      },
      { headers: authHeader() }
    )
  }

  replyMessage(payload) {
    const id = payload.id
    return axios.post(
      API_URL + id,
      {
        title: payload.message.title,
        content: payload.message.content,
        idUSERS: store.state.auth.user.userId,
        message_parent: payload.id,
        username: store.state.auth.user.username
      },
      { headers: authHeader() }
    )
  }

  getAllMessage() {
    return axios.get(API_URL + '', { headers: authHeader() })
  }

  modifyMessage(payload) {
    const id = payload.id
    return axios.put(
      API_URL + id,
      {
        title: payload.message.title,
        content: payload.message.content
      },
      { headers: authHeader() }
    )
  }

  deleteMessage(payload) {
    const id = payload
    return axios.delete(API_URL + id, { headers: authHeader() })
  }
}

export default new MessageService()
