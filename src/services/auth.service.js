import ApiService from "./api.service";
import JwtService from "./jwt.service"
export const ID_USER_ID_KEY = 'user-id'

class AuthService {
  login(email, password) {
    return ApiService.post('/users/login', {email, password})
      .then(({data}) => {
        if(data.id) {
          JwtService.setToken(data.id)
          this.setUserId(data.userId)
          ApiService.setHeader()
          return data
        }
        throw data.error
      })
  }

  logout() {
    JwtService.destroyToken()
    ApiService.clearHeader()
    this.removeUserId()
  }

  createUser(email, password) {
    return ApiService.post('/users', {email, password})
      .then(resp => {
        if(resp.id) {
          return resp
        }
        throw resp.error
      })
  }

  fetchData() {
    const userId = this.getUserId()
    return ApiService.get(`/users/${userId}`)
  }

  getUserId() {
    return localStorage.getItem(ID_USER_ID_KEY)
  }

  setUserId(userId) {
    localStorage.setItem(ID_USER_ID_KEY, userId)
  }

  removeUserId() {
    localStorage.removeItem(ID_USER_ID_KEY)
  }
}

export default new AuthService()