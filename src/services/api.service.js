import axios from 'axios'
import JwtService, {ID_TOKEN_HEADER_KEY} from './jwt.service'
import {API_URL} from "./config"

class ApiService {
  init() {
    axios.defaults.baseURL = API_URL

    const token = JwtService.getToken()
    if(token){
      this.setHeader()
    }
  }

  setHeader() {
    axios.defaults.headers.common[ID_TOKEN_HEADER_KEY] = JwtService.getToken()
  }

  clearHeader() {
    axios.defaults.headers.common[ID_TOKEN_HEADER_KEY] = ''
  }

  post(resource, params) {
    return axios.post(resource, params)
  }

  get(resource, params) {
    return axios.get(resource, params)
  }

  delete(resource, params) {
    return axios.delete(resource, params)
  }
}

export default new ApiService()
