import Typography from '@mui/material/Typography'
import { AxiosError } from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import Flag from 'react-world-flags'
import { useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { ITripLog } from 'src/types'

import { TripLogElement } from './TripLogElement'

export interface ITripLogCardProps {
  userId: string
  tripLogCardCountryCode: string
  tripLogs?: ITripLog[]
}

export const TripLogCard: FC<ITripLogCardProps> = memo(
  ({ userId, tripLogCardCountryCode, tripLogs = [] }: ITripLogCardProps) => {
    const [showAllLogs, setShowAllLogs] = useState(false)
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const { showToast } = useToast()
    const [username, setUsername] = useState('')

    useEffect(() => {
      axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        .then((res) => {
          setUsername(res.data.mainInfo.name)
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }, [userId])

    return (
      <div className="flex flex-col border-b border-b-green-100 sm:pt-8 pt-4 sm:pl-8 pl-5 showBottomBorder last:border-none relative">
        <Flag
          code={tripLogCardCountryCode}
          className="absolute sm:w-[64px] sm:h-[44px] w-[44px] h-[31px] sm:left-0 sm:top-8 z-10 left-0 top-[14px]"
        />
        <div>
          <TripLogElement
            userId={userId}
            tripLog={tripLogs.filter((t) => t.mainTrip)[0]}
            isFirstTripLog
          />
          {tripLogs
            .slice(0, showAllLogs ? undefined : 1)
            .filter((t) => !t.mainTrip)
            .map((tripLog, index) => (
              <TripLogElement key={index} userId={userId} tripLog={tripLog} />
            ))}
        </div>
        {!showAllLogs && tripLogs.length > 1 && (
          <div
            className="cursor-pointer sm:pl-[46px] pl-9 mb-5"
            onClick={() => setShowAllLogs(true)}>
            <Typography className="text-lg font-bold leading-6 text-green-700">
              {`See all ${username.split(' ')[0]}'s Stops In ${regionNames.of(
                tripLogCardCountryCode
              )}...`}
            </Typography>
          </div>
        )}
      </div>
    )
  }
)

TripLogCard.displayName = 'TripLogCard'

export default TripLogCard
