import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import { Button, CloseButton } from 'src/components'
import TripRecommendationForm from 'src/components/UserProfilePage/TripRecommendationForm'
import { updateTripLog } from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripRecommendation } from 'src/types'

export interface IRecommendationEditModalProps {
  open: boolean
  onClose: () => void
  recommendations?: ITripRecommendation[]
  tripLogId: string
  userId: string
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

export const RecommendationEditModal: FC<IRecommendationEditModalProps> = memo(
  ({
    open,
    recommendations,
    tripLogId,
    userId,
    onClose
  }: IRecommendationEditModalProps) => {
    const dispatch = useAppDispatch()
    const [tripRecommendations, setTripRecommendations] = useState<
      ITripRecommendation[]
    >([])

    useEffect(() => {
      setTripRecommendations(recommendations || [])
    }, [recommendations])

    const handleChangeTripRecommendations = (
      recommendations: ITripRecommendation[]
    ) => {
      setTripRecommendations(recommendations)
    }

    const handleSaveButtonClick = () => {
      dispatch(
        updateTripLog({
          userId,
          tripLog: {
            tripLogId,
            tripRecommendations
          }
        })
      )
      onClose()
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="overflow-hidden">
          <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
            <div className="flex flex-col sm:flex-row">
              <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
                Edit Trip Recommendations
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <CloseButton onClose={onClose} />
            </div>
          </div>
          <div className="overflow-auto flex-1 max-h-[calc(100vh-200px)]">
            <div className="flex flex-col p-8">
              {/** Trip Recommendations */}
              <TripRecommendationForm
                tripRecommendations={tripRecommendations}
                handleChangeTripRecommendations={
                  handleChangeTripRecommendations
                }
                className="-sm:mt-12 -mt-10"
              />
              {/** Save Button */}
              <div className="flex justify-end items-center mt-8">
                <Button
                  buttonLabel="Save"
                  variant="contained"
                  className="w-[100px]"
                  onClick={handleSaveButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
)

RecommendationEditModal.displayName = 'RecommendationEditModal'

export default RecommendationEditModal
