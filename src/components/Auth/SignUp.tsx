/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close } from '@mui/icons-material'
import {
  Checkbox,
  Dialog,
  DialogProps,
  FormControlLabel,
  IconButton,
  Paper,
  styled,
  useTheme
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth, useToast } from 'src/hooks'
import { updateProfile } from 'src/store/reducers/accountSlice'

import Button from '../Button'
import TextField from '../TextField'

interface SignUpModalProps extends DialogProps {
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

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [emails, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()

  const { showToast } = useToast()
  const auth = useAuth()
  const navigate = useNavigate()

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleSignup = () => {
    const email = emails.toLowerCase()
    if (!email || !password || !name) {
      showToast({
        type: 'warning',
        message: 'Please fill out all fields.'
      })
      return
    }
    if (!emailRegex.test(email)) {
      showToast({
        type: 'error',
        message: 'Invalid Email Address.'
      })
      return
    }
    if (password.length < 6) {
      showToast({
        type: 'error',
        message: 'Password must be longer than 6 letters.'
      })
      return
    }
    if (agree) {
      console.log(process.env.REACT_APP_API_URL)
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          name,
          email,
          password
        })
        .then(() => {
          showToast({
            type: 'success',
            message: 'Sign Up Success.'
          })
          auth
            .signin(email, password)
            .then((res: any) => {
              dispatch(updateProfile(res.userProfile))
              navigate(`/profile/${res.id}`)
              onClose()
            })
            .catch((err: AxiosError) => {
              showToast({
                type: 'error',
                message: err
              })
            })
          onClose()
        })
        .catch((err: AxiosError) => {
          console.log(err)
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    } else {
      setShowError(true)
    }
  }

  return (
    <Dialog open={open} onClose={() => onClose()} PaperComponent={StyledPaper}>
      <img
        src="/images/login.jpg"
        className="w-[480px] h-auto hidden xl:block"
      />
      <div className="max-w-[575px] w-full px-4 pt-5 xl:pl-[60px] sm:pr-8 min-h-[500px] mb-16">
        <div className="flex flex-row-reverse">
          <BorderButton
            className="w-8 h-8 sm:w-11 sm:h-11"
            onClick={() => onClose()}>
            <Close />
          </BorderButton>
        </div>
        <div className="xl:pr-20 flex flex-col items-center mx-auto max-w-[320px] xl:max-w-none w-full">
          <span className="text-[28px] font-semibold py-5">
            Welcome To Vagavoy!
          </span>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 mb-1.5">Full Name</div>
            <TextField
              value={name}
              textFieldHeight={44}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 mb-1.5">Email</div>
            <TextField
              value={emails}
              textFieldHeight={44}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 pb-1.5">Pasword</div>
            <TextField
              value={password}
              textFieldHeight={44}
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="items-start mb-4">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: theme.palette.green.dark,
                    '&.Mui-checked': {
                      color: theme.palette.green.dark
                    }
                  }}
                  value={agree}
                  onChange={() => {
                    if (!agree) setShowError(false)
                    setAgree(!agree)
                  }}
                />
              }
              sx={{
                '& .MuiTypography-root': {
                  color: theme.palette.green.dark,
                  lineHeight: '24px'
                }
              }}
              label="I accept the User Agreement"
            />
            <br />
            {showError ? (
              <span className="text-red-500 text-sm">
                * Must accept user agreement
              </span>
            ) : (
              <></>
            )}
          </div>
          <Button
            fullWidth
            variant="contained"
            buttonLabel="Sign Up"
            onClick={handleSignup}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default SignUpModal
