import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { AxiosError } from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Button, EditButton, Icon, PlusButton } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import RecommendationEditModal from 'src/components/RecommendationEditModal'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile, ITripLog } from 'src/types'

interface ImagesType {
  [key: string]: string
}

const recommendationTypes = [
  'Accommodation',
  'Eating & Drinking',
  'Getting There & Getting Around',
  'Activities',
  'Other Tips'
]

const images: ImagesType = {
  Accommodation: '/images/accommodation.png',
  'Eating & Drinking': '/images/eating.png',
  'Getting There & Getting Around': '/images/getting_there.png',
  Activities: '/images/activities.png',
  'Other Tips': '/images/other_tips.png'
}

export const TripRecommendations = memo(() => {
  const { id } = useParams()
  const { tripLogId } = useParams()
  const [tripLog, setTripLog] = useState<ITripLog>()
  const { user } = useAuth()
  const currentUser = id === user.id
  const [userInfo, setUserInfo] = useState<IProfile>()
  const navigate = useNavigate()
  const [openEditModal, setOpenEditModal] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    if (tripLogId && openEditModal === false) {
      axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/travel/${tripLogId}`)
        .then((res) => {
          setTripLog(res.data)
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }
  }, [tripLogId, openEditModal])

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.response?.data
        })
      })
  }, [id])

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-y-8 w-full mt-8 xl:px-6">
        {/* Header */}
        <div className="flex items-center justify-center w-fit">
          <Icon
            iconName="ArrowLeft"
            className="mr-4 cursor-pointer"
            onClick={() => navigate(`/profile/${id}`)}
          />
          <span className="sm:text-[28px] sm:font-semibold font-bold text-[22px] leading-6 text-green-700 w-fit">
            {tripLog?.tripCountryCode
              ? `Trip Recommendations - ${tripLog?.tripLocation}`
              : ''}
          </span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center w-full">
          {currentUser ? (
            <Avatar
              id={id}
              className="w-[124px] h-[124px]"
              borderWidth={4}
              showAddLabel={false}
              editButtonPosClassName="xl:bottom-0 xl:right-0 sm:bottom-0 sm:right-0 bottom-1 right-1"
            />
          ) : userInfo?.profileImage ? (
            <Avatar
              src={userInfo?.profileImage}
              className="w-[124px] h-[124px]"
              borderWidth={4}
              editButtonPosClassName="xl:bottom-0 xl:right-0 sm:bottom-0 sm:right-0 bottom-1 right-1"
            />
          ) : (
            <AccountCircleOutlinedIcon className="text-green-700 w-[124px] h-[124px]" />
          )}
          <span className="font-semibold text-[28px] leading-6 text-green-700 mt-2 mb-4">
            {userInfo?.mainInfo?.name}
          </span>
          <div className="flex flex-row w-full gap-x-[18px] justify-center items-center relative">
            {currentUser ? (
              <div className="hidden sm:flex flex-row gap-x-4 absolute right-[44px]">
                <PlusButton onClick={() => setOpenEditModal(true)} />
                <EditButton onClick={() => setOpenEditModal(true)} />
              </div>
            ) : (
              <></>
            )}
            {currentUser ? (
              <PlusButton
                className="block sm:hidden"
                onClick={() => setOpenEditModal(true)}
              />
            ) : (
              <></>
            )}
            <Button
              buttonLabel="Share Recommendations"
              variant="outlined"
              buttonFontBold
              buttonRightIconName="Share"
              sx={{ width: 162 }}
            />
            {currentUser ? (
              <EditButton
                className="block sm:hidden"
                onClick={() => setOpenEditModal(true)}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex flex-col gap-y-6">
          {tripLog?.tripRecommendations &&
          tripLog.tripRecommendations.length > 0 ? (
            tripLog.tripRecommendations
              .sort(
                (a, b) =>
                  recommendationTypes.indexOf(a.title || '') -
                  recommendationTypes.indexOf(b.title || '')
              )
              .map((tripRecommendation, index) => (
                <div
                  key={tripRecommendation.tripRecommendationId || index}
                  className="max-w-962 w-full flex fle-row gap-x-8 justify-center">
                  <img
                    src={images[tripRecommendation.title || 'Accommodation']}
                    className="w-[44px] h-[44px]"
                  />
                  <div className="flex flex-col gap-y-4 border-b pb-6 border-b-green-100 w-full text-left">
                    <span className="font-bold text-lg leading-6 text-green-700">
                      {tripRecommendation.title}
                    </span>
                    <span className="font-normal text-base leading-6 text-green-700">
                      {tripRecommendation.description}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
        <RecommendationEditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          recommendations={tripLog?.tripRecommendations}
          userId={id || ''}
          tripLogId={tripLogId || ''}
        />
      </div>
    </MainContainer>
  )
})

TripRecommendations.displayName = 'TripRecommendations'

export default TripRecommendations
