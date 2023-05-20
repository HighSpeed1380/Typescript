import { Typography } from '@mui/material'
import React, { FC, memo, useState } from 'react'
import { Button, Icon } from 'src/components'

import TripLogEditModal from './TripLogEditModal'

export interface ITripLogPlaceholderProps {
  userId: string
  currentUser?: boolean
}

export const TripLogPlaceholder: FC<ITripLogPlaceholderProps> = memo(
  ({ userId, currentUser = true }: ITripLogPlaceholderProps) => {
    const [openEditModal, setOpenEditModal] = useState(false)

    return (
      <>
        {currentUser ? (
          <>
            <div className="flex flex-1 flex-col gap-y-4 justify-center items-center">
              <Icon
                iconName="Travel"
                className="sm:w-[44px] sm:h-[44px] w-6 h-6"
              />
              <Typography className="font-bold text-lg leading-6 text-green-700 text-center">
                Share your travels
              </Typography>
              <Button
                variant="contained"
                buttonLabel="Add Info"
                onClick={() => setOpenEditModal(true)}
                sx={{ width: 124 }}
              />
            </div>
            <TripLogEditModal
              open={openEditModal}
              mode="add"
              userId={userId}
              onClose={() => setOpenEditModal(false)}
            />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Typography className="font-bold text-2xl leading-6 text-green-700 text-center">
              No Trip Logs Yet
            </Typography>
          </div>
        )}
      </>
    )
  }
)

TripLogPlaceholder.displayName = 'TripLogPlaceholder'

export default TripLogPlaceholder
