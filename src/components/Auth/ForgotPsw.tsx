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

interface ForgotPswProps extends DialogProps {
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

const ForgotPsw: React.FC<ForgotPswProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const auth = useAuth()
  const { socket } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSignIn = () => {
    console.log(email.toLowerCase())
    auth
      .signin(email.toLowerCase())
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
          <span className="text-[28px] font-semibold py-5">
            Reset your password!
          </span>
          <span className="text-center pb-4">
            Enter your email address so we can reset your password.
          </span>
          <div className="items-start w-full mb-4">
            <TextField
              value={email}
              textFieldHeight={44}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            buttonLabel="Reset"
            onClick={handleSignIn}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default ForgotPsw
