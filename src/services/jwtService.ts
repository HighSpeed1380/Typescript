/* eslint-disable camelcase */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import EventEmitter from '../utils/EventEmitter'

const baseURL = process.env.REACT_APP_API_URL || ''

export const axiosInstance = axios.create({
  baseURL
})

class JwtService extends EventEmitter {
  init() {
    this.setInterceptors()
  }

  setInterceptors = () => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      async (err) => {
        const originalConfig = err.config
        if (err.response) {
          if (err.response.status === 401 && originalConfig) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Refresh Token Failed')
            this.setSession(null)
          }
        }
        return Promise.reject(err)
      }
    )
  }

  handleAuthentication = async () => {
    const access_token = this.getAccessToken()
    if (!access_token) {
      this.emit('onAutoLogin', false)

      return
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token)
      this.emit('onAutoLogin', true)
    } else {
      this.setSession('')
    }
  }

  signInWithEmailAndPassword = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/auth/login', { email, password })
        .then((response) => {
          this.setSession(response.data.token)
          resolve(jwtDecode(response.data.token))
        })
        .catch((err) => {
          reject(err.response?.data)
        })
    })
  }

  setSession = (token: string | null) => {
    if (token && this.isAuthTokenValid(token)) {
      localStorage.setItem('vagavoy_access_token', token)
      axiosInstance.defaults.headers.common.Authorization = `${token}`
    } else {
      localStorage.removeItem('vagavoy_access_token')
      localStorage.removeItem('persist:filterOption')
      delete axiosInstance.defaults.headers.common.Authorization
    }
  }

  logout = () => {
    this.setSession(null)
  }

  isAuthTokenValid = (accessToken: string) => {
    if (!accessToken) {
      return false
    }
    try {
      const decoded: any = jwtDecode(accessToken)
      const currentTime = Date.now() / 1000
      if (decoded?.exp < currentTime) {
        console.warn('access token expired')
        return false
      }
      this.emit('userInfo', decoded)
    } catch (err) {
      console.warn('invalid access token')
      return false
    }

    return true
  }

  getAccessToken = () => {
    return window.localStorage.getItem('vagavoy_access_token')
  }
}

const instance = new JwtService()
instance.init()

export default instance
