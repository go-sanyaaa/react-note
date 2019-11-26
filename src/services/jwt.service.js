export const ID_TOKEN_KEY = 'token'
export const ID_TOKEN_HEADER_KEY = 'access_token'

class JwtService {
  setToken(token) {
    localStorage.setItem(ID_TOKEN_KEY, token)
  }

  getToken() {
    return localStorage.getItem(ID_TOKEN_KEY)
  }

  destroyToken() {
    localStorage.removeItem(ID_TOKEN_KEY)
  }
}

export default new JwtService()