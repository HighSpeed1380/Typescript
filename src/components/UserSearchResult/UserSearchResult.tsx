import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { AxiosError } from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { ConnectActionType, ConnectStatus } from 'src/types'
import { IProfile } from 'src/types/IProfile'

import { Avatar, Button, Icon } from '../index'

export interface IUserConnectContainerProps {
  profile: IProfile
}

export const UserConnectContainer: FC<IUserConnectContainerProps> = memo(
  ({ profile }: IUserConnectContainerProps) => {
    const navigate = useNavigate()
    const { showToast } = useToast()
    const [connectionStatus, setConnectionStatus] =
      useState<ConnectStatus>('NotConnected')
    const { user } = useAuth()

    useEffect(() => {
      setConnectionStatus(profile.connectionStatus || 'NotConnected')
    }, [profile])

    const handleConnectActionButtonClick = async (
      actionType: ConnectActionType
    ) => {
      await axiosInstance
        .post(`${process.env.REACT_APP_API_URL}/user/connect${actionType}`, {
          userId: profile._id
        })
        .then(() => {
          showToast({
            type: 'success',
            message: `Connect ${actionType}ed Successfully`
          })
          if (actionType === 'Request') setConnectionStatus('Pending')
          else if (actionType === 'Accept') setConnectionStatus('Connected')
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }

    return (
      <div className="flex sm:flex-row flex-col gap-x-6 relative w-full">
        {profile.profileImage ? (
          <Avatar
            src={profile.profileImage}
            className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:block hidden cursor-pointer"
            borderWidth={2}
            onClick={() => navigate(`/profile/${profile._id}`)}
          />
        ) : (
          <AccountCircleOutlinedIcon
            className="text-green-700 w-[92px] h-[92px] sm:block hidden cursor-pointer"
            onClick={() => navigate(`/profile/${profile._id}`)}
          />
        )}

        <div className="flex flex-1 flex-col gap-y-4 items-start border-b border-b-green-100 pb-6">
          <div className="flex flex-row gap-x-3 items-center justify-center">
            {profile.profileImage ? (
              <Avatar
                src={profile.profileImage}
                className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:hidden block"
                borderWidth={2}
                onClick={() => navigate(`/profile/${profile._id}`)}
              />
            ) : (
              <AccountCircleOutlinedIcon className="text-green-700 w-[92px] h-[92px] sm:hidden block" />
            )}

            <span
              className="text-[22px] leading-6 font-bold text-green-700"
              onClick={() => navigate(`/profile/${profile._id}`)}>
              <a href="">{profile.mainInfo?.name}</a>
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Icon
              iconName="Location"
              iconColor="var(--var-green-light1)"
              iconSize={22}
            />
            <span className="ml-2 sm:text-lg text-sm text-green-500">
              Currently In:
            </span>
            <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
              {profile.mainInfo?.location}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Icon
              iconName="Airplane"
              iconColor="var(--var-green-light1)"
              iconSize={22}
            />
            <span className="ml-2 sm:text-lg text-sm text-green-500">
              Last Trip:
            </span>
            <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
              {profile.mainInfo?.lastTripLocation}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Icon
              iconName="Map"
              iconColor="var(--var-green-light1)"
              iconSize={22}
            />
            <span className="ml-2 sm:text-lg text-sm text-green-500">
              Next Spot On Bucket List:
            </span>
            <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
              {profile.mainInfo?.nextSpotOnBucketList}
            </span>
          </div>
          <div className="flex flex-row gap-x-[30px] sm:absolute top-0 right-0 z-50">
            {user.id ? (
              <Button
                buttonLabel={
                  connectionStatus === 'Requested'
                    ? 'Accept'
                    : connectionStatus === 'NotConnected'
                    ? 'Connect'
                    : connectionStatus
                }
                variant="contained"
                disabled={
                  connectionStatus === 'Pending' ||
                  connectionStatus === 'Connected'
                }
                className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px] z-50"
                onClick={() =>
                  handleConnectActionButtonClick(
                    connectionStatus === 'Requested' ? 'Accept' : 'Request'
                  )
                }
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  }
)

UserConnectContainer.displayName = 'UserConnectContainer'

export default UserConnectContainer
