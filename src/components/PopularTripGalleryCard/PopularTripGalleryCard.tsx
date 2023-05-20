import { Typography } from '@mui/material'
import { FC, memo } from 'react'

import { Button } from '../index'

export interface IPopularTripGalleryCardProps {
  /**
   * TripGalleryCard Image Source
   */
  tripGalleryCardImageSrc: string
  /**
   * TripGalleryCard Location Name
   */
  tripGalleryCardLocation: string
}

export const PopularTripGalleryCard: FC<IPopularTripGalleryCardProps> = memo(
  ({
    tripGalleryCardImageSrc,
    tripGalleryCardLocation
  }: IPopularTripGalleryCardProps) => {
    return (
      <div className="flex sm:items-center flex-col border-none relative cursor-pointer">
        <img src={tripGalleryCardImageSrc} className="w-full aspect-square" />
        <div className="w-full items-center absolute bottom-11 sm:bottom-8 flex flex-col gap-y-[12px]">
          <Typography className="font-bold text-[22px] landing-6 text-white">
            {tripGalleryCardLocation}
          </Typography>
          <Button
            variant="contained"
            buttonLabel="Discover"
            buttonFontBold={true}
            className="w-[128px] bg-orange-700 font-bold"
          />
        </div>
      </div>
    )
  }
)

PopularTripGalleryCard.displayName = 'PopularTripGalleryCard'

export default PopularTripGalleryCard
