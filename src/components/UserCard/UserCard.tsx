import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Typography, useTheme } from '@mui/material'
import { AxiosError } from 'axios'
import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types/IProfile'

import { Avatar, Button } from '../index'

export interface IUserCardProps {
  /**
   * User Information
   */
  userProfile: IProfile
  /**
   * Show Connect Button?
   */
  showConnectButton?: boolean
}

export const UserCard: FC<IUserCardProps> = memo(
  ({ userProfile, showConnectButton }: IUserCardProps) => {
    const theme = useTheme()
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [connectRequestSent, setConnectRequestSent] = useState(false)

    const handleConnectButtonClick = async () => {
      await axiosInstance
        .post(`${process.env.REACT_APP_API_URL}/user/connectRequest`, {
          userId: userProfile._id
        })
        .then(() => {
          showToast({
            type: 'success',
            message: 'Connect Request Success'
          })
          setConnectRequestSent(true)
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }

    return (
      <div
        className={`rounded-2xl relative flex items-center flex-col shadow-3xl bg-white ${
          showConnectButton ? 'pb-8' : 'pb-[51px]'
        }`}>
        {userProfile.bannerImage ? (
          <img
            src={userProfile.bannerImage}
            className="w-full sm:h-[145px] h-[96px] rounded-2xl rounded-br-none rounded-bl-sm border-[1px] border-green-100"
          />
        ) : (
          <div className="w-full sm:h-[145px] h-[96px] rounded-2xl rounded-br-none rounded-bl-sm border-[1px] border-green-100 bg-green-300"></div>
        )}
        <div className="absolute top-[38px] sm:top-[99px] mx:auto">
          {userProfile.profileImage ? (
            <Avatar
              size={92}
              src={userProfile.profileImage}
              borderWidth={4}
              onClick={() => navigate(`/profile/${userProfile._id}`)}
            />
          ) : (
            <AccountCircleOutlinedIcon
              className="text-green-700 w-[92px] h-[92px] cursor-pointer"
              onClick={() => navigate(`/profile/${userProfile._id}`)}
            />
          )}
        </div>
        <div className="mt-[50px] sm:mt-[62px] flex flex-col gap-y-2 items-center justify-center">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: '24px',
              color: theme.palette.green.dark
            }}>
            {userProfile.mainInfo?.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 18,
              lineHeight: '24px',
              color: theme.palette.green.middle
            }}>
            Last Trip: {userProfile.mainInfo?.lastTripLocation?.split(',')[0]}
          </Typography>
          {showConnectButton ? (
            <Button
              buttonLabel={connectRequestSent ? 'Pending' : 'Connect'}
              variant="contained"
              disabled={connectRequestSent}
              className="w-[124px] mt-[11px]"
              onClick={handleConnectButtonClick}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }
)

UserCard.displayName = 'UserCard'

export default UserCard
