import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { styled } from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '../Icon'

export interface ITripButtonProps {
  userId: string
  tripLogId: string
  tripButtonType?: 'Gallery' | 'Recommendation'
  tripButtonThumbnail?: string
  onClick?: () => void
}

const StyledDiv = styled('div')(({ theme }) => ({
  width: 'calc(100% - 105px)',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '-2px',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 58px)'
  }
}))

export const TripButton: FC<ITripButtonProps> = memo(
  ({
    userId,
    tripLogId,
    tripButtonType = 'Gallery',
    tripButtonThumbnail
  }: ITripButtonProps) => {
    const navigate = useNavigate()

    const handleGalleryButtonCLick = () => {
      navigate(`/gallery/${userId}/${tripLogId}`)
    }

    const handleRecommendationButtonCLick = () => {
      navigate(`/recommendations/${userId}/${tripLogId}`)
    }

    return (
      <>
        {tripButtonType === 'Gallery' ? (
          <div
            className="md:w-1/2 bg-[#e5e8db] bg-opacity-20 sm:h-[70px] h-[47px] rounded-lg w-full border border-green-100 p-2 pr-3 flex md:justify-between items-center max-w-[381px] cursor-pointer"
            onClick={handleGalleryButtonCLick}>
            <img
              src={tripButtonThumbnail}
              className="md:mr-3 mr-2 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px] rounded-md"
            />
            <StyledDiv>
              <span className="font-bold text-green-700 text-[14px] w-full truncate">
                Trip Gallery
              </span>
              <span className="text-green-700 text-[14px] w-full truncate">
                Pictures and videos from my trip
              </span>
            </StyledDiv>
            <Icon iconName="Next" iconSize={24} className="hidden md:block" />
          </div>
        ) : (
          <div
            className="md:w-1/2 bg-[#e5e8db] bg-opacity-20 sm:h-[70px] h-[47px] rounded-lg w-full border border-green-100 p-2 pr-3 flex md:justify-between items-center max-w-[381px] cursor-pointer"
            onClick={handleRecommendationButtonCLick}>
            <div className="flex md:mr-3 mr-2 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px] md:min-w-[69px] min-w-[50px] bg-green-300 rounded-lg items-center justify-center">
              <AssignmentOutlinedIcon className="sm:w-[37px] sm:h-[37px] w-[22px] h-[22px]" />
            </div>
            <StyledDiv>
              <span className="font-bold text-green-700 text-[14px] w-full truncate">
                Trip Recommendations
              </span>
              <span className="text-green-700 text-[14px] w-full truncate">
                Some of the more nitty-gritty details...
              </span>
            </StyledDiv>
            <Icon iconName="Next" iconSize={24} className="hidden md:block" />
          </div>
        )}
      </>
    )
  }
)

TripButton.displayName = 'TripButton'

export default TripButton
