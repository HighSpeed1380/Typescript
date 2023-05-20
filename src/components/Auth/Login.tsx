/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@mui/icons-material'
import { Dialog, DialogProps, IconButton, Paper, styled } from '@mui/material'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth, useToast } from 'src/hooks'
import { updateProfile } from 'src/store/reducers/accountSlice'

import Button from '../Button'
import TextField from '../TextField'

interface LoginModalProps extends DialogProps {
  onForgotPsw: () => void
  onClose: () => void
}

const BorderButton = styled(IconButton)`
  border: 1px solid var(--var-green-light1);
  color: black;
`

const StyledPaper = styled(Paper)`
  flex-direction: row !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
  @media (max-width: 1199px) {
    max-width: 575px !important;
  }
`

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onForgotPsw
}) => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const auth = useAuth()
  const { socket } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSignIn = () => {
    auth
      .signin(email.toLowerCase(), password)
      .then((res: any) => {
        dispatch(updateProfile(res.userProfile))
        navigate(`/profile/${res.id}`)
        onClose()
        socket.emit('register', {
          userId: res.id
        })
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err
        })
      })
  }

  return (
    <Dialog open={open} onClose={() => onClose()} PaperComponent={StyledPaper}>
      <img
        src="/images/login.jpg"
        className="w-[480px] h-auto hidden xl:block"
      />
      <div className="max-w-[575px] w-full px-4 pt-5 xl:pl-[60px] sm:pr-8 min-h-[500px]">
        <div className="flex flex-row-reverse">
          <BorderButton
            className="w-8 h-8 sm:w-11 sm:h-11"
            onClick={() => onClose()}>
            <Close />
          </BorderButton>
        </div>
        <div className="xl:pr-20 flex flex-col items-center mx-auto max-w-[320px] xl:max-w-none w-full">
          <span className="text-[28px] font-semibold py-5">Welcome Back!</span>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 mb-1.5">Email</div>
            <TextField
              value={email}
              textFieldHeight={44}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 pb-1.5">Password</div>
            <TextField
              value={password}
              textFieldHeight={44}
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right pt-2">
              <span className="cursor-pointer" onClick={() => onForgotPsw()}>
                Forgot password?
              </span>
            </div>
          </div>
          <Button
            fullWidth
            variant="contained"
            buttonLabel="Sign In"
            onClick={handleSignIn}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default LoginModal
