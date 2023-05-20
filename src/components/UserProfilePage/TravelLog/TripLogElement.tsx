import { Typography } from '@mui/material'
import { FC, memo, useState } from 'react'
import { EditButton, PlusButton, TripButton } from 'src/components'
import { useAuth } from 'src/hooks'
import { ITripLog } from 'src/types'

import TripLogEditModal from './TripLogEditModal'

export interface ITripLogElementProps {
  userId: string
  tripLog: ITripLog
  isFirstTripLog?: boolean
}

const getPeriod = (startDate: Date | undefined, endDate: Date | undefined) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  if (startDate && endDate) {
    let period = months[startDate.getMonth()] + ' ' + startDate.getDate()

    if (startDate.getFullYear() === endDate.getFullYear()) period += '-'
    else period += ', ' + startDate.getFullYear() + '-'

    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth()
    )
      period += ''
    else period += months[endDate.getMonth()] + ' '

    period += endDate.getDate() + ', ' + endDate.getFullYear()

    return period
  }
  return ''
}

export const TripLogElement: FC<ITripLogElementProps> = memo(
  ({ userId, tripLog, isFirstTripLog = false }: ITripLogElementProps) => {
    const { user } = useAuth()
    const [mode, setMode] = useState<'add' | 'edit'>('add')
    const [openEditModal, setOpenEditModal] = useState(false)

    return (
      <div className="flex flex-col relative sm:pl-[46px] pl-9 pb-8 w-full border-l border-dashed border-l-green-700 last:border-transparent">
        <div className="absolute w-[24px] h-[24px] sm:-left-3 -left-3 rounded-full bg-green-700 border-[6px] border-white" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col sm:mt-0 -mt-[6px]">
            <Typography className="font-bold text-lg leading-6 text-green-700">
              {tripLog?.tripLocation}
            </Typography>
            <Typography className="font-bold text-[14px] leading-[21px] text-green-500 -mt-[2px]">
              {getPeriod(tripLog?.tripStartDate, tripLog?.tripEndDate)}
            </Typography>
          </div>
          <div className="flex flex-row gap-x-4">
            {user.id === userId && isFirstTripLog ? (
              <PlusButton
                onClick={() => {
                  setMode('add')
                  setOpenEditModal(true)
                }}
              />
            ) : (
              <></>
            )}
            {user.id === userId ? (
              <EditButton
                onClick={() => {
                  setMode('edit')
                  setOpenEditModal(true)
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <Typography className="text-base leading-6 text-green-700 mt-3">
          {tripLog?.tripDescription || ''}
        </Typography>
        <div className="mt-4 flex flex-col gap-x-4 md:flex-row gap-y-2">
          {tripLog?.tripGallery && tripLog.tripGallery?.length > 0 ? (
            <TripButton
              tripButtonType="Gallery"
              tripLogId={tripLog?.tripLogId || ''}
              userId={userId}
              tripButtonThumbnail={tripLog?.tripGallery[0].src}
            />
          ) : (
            <></>
          )}
          {tripLog?.tripRecommendations &&
          tripLog?.tripRecommendations.length > 0 ? (
            <TripButton
              tripButtonType="Recommendation"
              tripLogId={tripLog?.tripLogId || ''}
              userId={userId}
            />
          ) : (
            <></>
          )}
        </div>
        <TripLogEditModal
          open={openEditModal}
          mode={mode}
          userId={user.id}
          tripLog={tripLog}
          onClose={() => setOpenEditModal(false)}
        />
      </div>
    )
  }
)

TripLogElement.displayName = 'TripLogElement'

export default TripLogElement
