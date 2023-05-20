import { Typography } from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'src/components'
import { useAuth } from 'src/hooks'
import {
  fetchTripLogs,
  tripLogsSelectors
} from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripLog } from 'src/types'

import TripLogCard from './TripLogCard'
import TripLogEditModal from './TripLogEditModal'
import TripLogPlaceholder from './TripLogPlaceholder'

export interface ITravelLogProps {
  userId: string
}

export const TravelLog: FC<ITravelLogProps> = memo(
  ({ userId }: ITravelLogProps) => {
    const tripLogs: ITripLog[] = useSelector(tripLogsSelectors.selectAll)
    const dispatch = useAppDispatch()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [tripLogsByCountry, setTripLogsByCountry] = useState({})
    const { user } = useAuth()
    const currentUser = userId === user.id

    useEffect(() => {
      dispatch(
        fetchTripLogs({
          userId
        })
      )
    }, [userId])

    useEffect(() => {
      const newObj: { [key: string]: ITripLog[] } = {}
      if (tripLogs && tripLogs.length > 0) {
        tripLogs
          .sort((b, a) => {
            if (b.tripStartDate && a.tripStartDate)
              return a?.tripStartDate?.getTime() - b?.tripStartDate?.getTime()

            return 0
          })
          .forEach((tripLog: ITripLog) => {
            if (newObj[tripLog.tripCountryCode || '']?.length)
              newObj[tripLog.tripCountryCode || ''].push(tripLog)
            else
              Object.assign(newObj, {
                [tripLog.tripCountryCode || '']: [tripLog]
              })
          })

        setTripLogsByCountry(newObj)
      } else {
        setTripLogsByCountry([])
      }
    }, [tripLogs])

    return (
      <div className="flex flex-col mt-4 sm:mt-8 gap-y-4">
        {currentUser && tripLogs.length > 0 ? (
          <Button
            variant="contained"
            buttonLabel="Add New Travel"
            className="sm:hidden block"
            fullWidth
            onClick={() => setOpenEditModal(true)}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col sm:mb-16 mb-12 text-left py-4 sm:py-8 px-4 sm:px-8 rounded-[16px] border-[1px]">
          <div className="flex justify-between items-center">
            <Typography className="sm:text-[28px] text-[18px] leading-6 text-black font-bold font-700 sm:font-600 ml-1">
              Travel Log
            </Typography>
            {currentUser && tripLogs.length > 0 ? (
              <Button
                variant="contained"
                buttonLabel="Add New Travel"
                className="w-[176px] sm:block hidden"
                onClick={() => setOpenEditModal(true)}
              />
            ) : (
              <></>
            )}
          </div>
          {tripLogs && tripLogs.length ? (
            Object.keys(tripLogsByCountry).map((tripLogCountryCode, index) => (
              <TripLogCard
                key={index}
                userId={userId}
                tripLogCardCountryCode={tripLogCountryCode}
                tripLogs={
                  tripLogsByCountry[
                    tripLogCountryCode as keyof typeof tripLogsByCountry
                  ]
                }
              />
            ))
          ) : (
            <TripLogPlaceholder currentUser={currentUser} userId={userId} />
          )}
        </div>
        <TripLogEditModal
          open={openEditModal}
          userId={userId}
          mode="add"
          onClose={() => setOpenEditModal(false)}
        />
      </div>
    )
  }
)

TravelLog.displayName = 'TravelLog'

export default TravelLog
