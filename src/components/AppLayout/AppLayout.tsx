import { Box } from '@mui/material'
import { AxiosError } from 'axios'
import React, { memo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { updateProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'

import ForgotPsw from '../Auth/ForgotPsw'
import LoginModal from '../Auth/Login'
import SignUpModal from '../Auth/SignUp'
import { Header } from '../index'

export const AppLayout = memo(() => {
  const [login, setLogin] = React.useState(false)
  const [signup, setSignUp] = React.useState(false)
  const [forgot, setForgot] = React.useState(false)
  const { user } = useAuth()
  const { showToast } = useToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userId = user.id
    if (userId) {
      axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        .then((res) => {
          dispatch(updateProfile(res.data))
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }
  }, [user])
  return (
    <div className="w-full flex flex-col bg-[#F5F5F5]">
      <div className="w-full mx-auto xl:max-w-[1200px]">
        <Header
          onLogin={() => setLogin(true)}
          onSignup={() => setSignUp(true)}
        />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Outlet />
      </Box>
      <LoginModal
        open={login}
        onClose={() => setLogin(false)}
        onForgotPsw={() => {
          setLogin(false)
          setForgot(true)
        }}
      />
      <SignUpModal open={signup} onClose={() => setSignUp(false)} />
      <ForgotPsw open={forgot} onClose={() => setForgot(false)} />
    </div>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
