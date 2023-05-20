/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { updateProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'

import jwtService from '../services/jwtService'

const socket = io(`${process.env.REACT_APP_API_URL}`)

const authContext = createContext<any>({
  socket: null,
  isAuthorized: false,
  isConnected: false,
  checkingAuthorization: false,
  user: {},
  setUser: () => {},
  signin: () => {},
  signout: () => {}
})

export interface LayoutProps {
  children: React.ReactNode
}

export function ProvideAuth({ children }: LayoutProps) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [user, setUser] = useState({})
  const [checkingAuthorization, setCheckingAuthorization] = useState(true)
  const dispatch = useAppDispatch()

  const signin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      jwtService
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          setIsAuthorized(true)
          resolve(res)
        })
        .catch((err) => {
          setIsAuthorized(false)
          reject(err)
        })
    })
  }

  const signout = () => {
    jwtService.logout()
    setIsAuthorized(false)
  }

  useEffect(() => {
    socket.connect()
    jwtService.on('onAutoLogin', (value: boolean) => {
      setIsAuthorized(value)
      setCheckingAuthorization(false)
    })
    jwtService.on('userInfo', (value) => {
      setUser(value)
      dispatch(updateProfile(value.userProfile))
    })
    jwtService.on('onAutoLogout', () => {
      setIsAuthorized(false)
    })

    jwtService.handleAuthentication()

    return () => {
      jwtService.removeListener('onAutoLogin')
      jwtService.removeListener('onAutoLogout')
    }
  }, [])

  return {
    socket,
    isAuthorized,
    checkingAuthorization,
    user,
    setUser,
    signin,
    signout
  }
}
