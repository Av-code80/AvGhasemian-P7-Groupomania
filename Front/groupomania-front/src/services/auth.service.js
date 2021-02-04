import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3000/api/auth/'

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  delete(payload) {
    const id = payload
    return axios
      .delete(API_URL + id, { headers: authHeader() })
      .then(() => localStorage.removeItem('user'))
  }
}

export default new AuthService()
