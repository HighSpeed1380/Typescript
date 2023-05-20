import { Typography } from '@mui/material'
import React, { FC, memo } from 'react'

export interface IFaqCardProps {
  /**
   * Faq Card Name
   */
  faqCardName: string
  /**
   * Faq Card Image Source
   */
  faqCardImageSrc: string
  /**
   * faqCardDescription
   */
  faqCardDescription: string
}

export const FaqCard: FC<IFaqCardProps> = memo(
  ({ faqCardName, faqCardImageSrc, faqCardDescription }: IFaqCardProps) => {
    return (
      <div className="flex sm:items-center flex-col border-none sm:px-0 px-4">
        <img src={faqCardImageSrc} className="w-[72px] h-[72px]" />
        <div className="sm:items-center itmes-start mt-6 flex flex-col gap-y-2">
          <Typography className="w-fit sm:text-center text-left font-bold sm:text-[28px] text-[24px] leading-6 text-green-700">
            {faqCardName}
          </Typography>
          <Typography className="w-fit sm:text-center text-left sm:text-[18px] text-[16px] leading-6 text-green-700">
            {faqCardDescription}
          </Typography>
        </div>
      </div>
    )
  }
)

FaqCard.displayName = 'FaqCard'

export default FaqCard
