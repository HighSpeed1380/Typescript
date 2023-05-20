import { AxiosResponse } from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { UserCard } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import UserConnectContainer from 'src/components/UserConnectContainer'
import { useAuth } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { ConnectActionType, ConnectionResponse, IProfile } from 'src/types'

export const Connections = memo(() => {
  const [requestingUsers, setRequestingUsers] = useState<IProfile[]>([])
  const [recommendedUsers, setRecommendedUsers] = useState<IProfile[]>([])
  const [connectedUsers, setConnectedUsers] = useState<IProfile[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const userId = user.id
    if (userId) {
      axiosInstance
        .get(`/connection/${userId}`)
        .then((res: AxiosResponse<ConnectionResponse>) => {
          setConnectedUsers(res.data.connectedUsers)
          setRequestingUsers(res.data.requestingUsers)
          setRecommendedUsers(res.data.recommendedUsers)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const onActionButtonClick = (actionType: ConnectActionType, id: string) => {
    if (actionType === 'Accept') {
      const user = requestingUsers.filter((user) => user._id === id)
      setRequestingUsers(requestingUsers.filter((user) => user._id !== id))
      setConnectedUsers(connectedUsers.concat(user))
    } else if (actionType === 'Reject')
      setRequestingUsers(requestingUsers.filter((user) => user._id !== id))
    else if (actionType === 'Remove')
      setConnectedUsers(connectedUsers.filter((user) => user._id !== id))
  }

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:gap-y-9 gap-y-8 w-full h-full mt-8 xl:px-6 items-start">
        <span className="text-[28px] font-semibold leading-6">
          Connection Requests
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full">
          {requestingUsers && requestingUsers.length > 0 ? (
            requestingUsers.map((profile, index) => (
              <UserConnectContainer
                key={index}
                profile={profile || []}
                type="request"
                handleActionButtonClick={onActionButtonClick}
              />
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4">
              No Pending Connections
            </span>
          )}
        </div>

        <span className="text-[28px] font-semibold leading-6">
          Recommended Connections
        </span>

        <div className="flex flex-wrap w-full mb-8">
          {recommendedUsers && recommendedUsers.length > 0 ? (
            recommendedUsers
              .filter((r) => r._id !== user.id)
              .map((profile, index) => (
                <div
                  key={index}
                  className="flex flex-wrap md:w-1/4 sm:w-1/3 w-1/2">
                  <div className="w-full p-2">
                    <UserCard
                      key={profile?._id || index}
                      userProfile={profile || []}
                      showConnectButton={true}
                    />
                  </div>
                </div>
              ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4 w-full">
              No Recommended Connections
            </span>
          )}
        </div>

        <span className="text-[28px] font-semibold leading-6">
          Existing Connections
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full mb-8">
          {connectedUsers && connectedUsers.length > 0 ? (
            connectedUsers.map((profile, index) => (
              <UserConnectContainer
                key={profile?._id || index}
                profile={profile || []}
                type="existing"
                handleActionButtonClick={onActionButtonClick}
              />
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4">
              No Existing Connections
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

Connections.displayName = 'Connections'

export default Connections
