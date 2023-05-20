import { Avatar } from '@mui/material'
import { AxiosError } from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import MainContainer from 'src/components/MainContainer'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile, ITripLog } from 'src/types'

export interface NewsfeedResponseType extends ITripLog {
  _id: string
  userId: IProfile
}

export const News = memo(() => {
  const { user } = useAuth()
  const [tripLogs, setTripLogs] = useState<NewsfeedResponseType[]>([])
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = user.id
    if (userId) {
      axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/newsfeed`)
        .then((res) => {
          setTripLogs(res.data)
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
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-row xl:gap-x-4 mt-8 xl:pl-6 justify-center">
        <div className="xl:w-2/3 flex flex-col items-start w-full max-w-[800px]">
          <span className="font-semibold text-[28px] leading-6 mb-8">
            Newsfeed
          </span>
          {tripLogs.length > 0 ? (
            tripLogs.map((tripLog, index) => (
              <div
                key={tripLog.tripLogId || index}
                className="flex flex-col gap-y-4 border-b border-b-green-100 pb-6 mb-6 w-full">
                {tripLog.tripGallery && tripLog.tripGallery?.length > 0 ? (
                  <a href={`/gallery/${tripLog.userId._id}/${tripLog._id}`}>
                    <img
                      src={tripLog.tripGallery[0].src}
                      alt={tripLog.tripGallery[0].backgroundInfo}
                      loading="lazy"
                      className="w-full max-w-[800px] sm:max-h-[586px] max-h-[250px]"
                    />
                  </a>
                ) : (
                  <></>
                )}
                <div className="w-full flex flex-row gap-x-4">
                  <Avatar
                    src={tripLog.userId.profileImage}
                    className="w-[44px] h-[44px] cursor-pointer"
                    onClick={() => navigate(`/profile/${tripLog.userId._id}`)}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-6 text-green-700 text-left">
                      {tripLog.userId.mainInfo?.name}
                    </span>
                    <span className="font text[14px] leading-[21px] text-green-500 text-left mb-1">
                      {tripLog.tripLocation}
                    </span>
                    <span className="text-[14px] leading-[21px] text-green-700 text-left">
                      {tripLog.tripDescription}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No News
            </span>
          )}
        </div>
        <div className="w-1/3 flex-col items-start xl:flex hidden">
          <span className="font-semibold text-[28px] leading-6 mb-8">
            Popular
          </span>
          {tripLogs.length > 0 ? (
            tripLogs.map((tripLog, index) => (
              <div
                key={tripLog.tripLogId || index}
                className="w-full flex flex-row gap-x-[14px] mb-4">
                {tripLog.tripGallery && tripLog.tripGallery?.length > 0 ? (
                  <a href={`/gallery/${tripLog.userId._id}/${tripLog._id}`}>
                    <img
                      src={tripLog.tripGallery[0].src}
                      alt={tripLog.tripGallery[0].backgroundInfo}
                      loading="lazy"
                      className="max-w-[144px] h-[104px] w-[144px] rounded-md"
                    />
                  </a>
                ) : (
                  <></>
                )}
                <div className="flex flex-1 flex-col gap-y-2">
                  <div className="flex flex-row gap-x-[14px]">
                    <Avatar
                      src={tripLog.userId.profileImage}
                      className="w-[44px] h-[44px] cursor-pointer"
                      onClick={() => navigate(`/profile/${tripLog.userId._id}`)}
                    />
                    <div className="w-full flex flex-col text-left">
                      <span className="font-bold text-lg leading-6 text-green-700 text-left">
                        {tripLog.userId.mainInfo?.name}
                      </span>
                      <span className="font text[14px] leading-[21px] text-green-500 text-left">
                        {tripLog.tripLocation}
                      </span>
                    </div>
                  </div>
                  <div className="text-green-700 text-[16px] leading-6 text-left">
                    <TextTruncate
                      line={2}
                      element="span"
                      truncateText="..."
                      text={tripLog.tripDescription}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No Popular Trips
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

News.displayName = 'News'

export default News
