import React, { FC, memo } from 'react'

import Icon from '../Icon'

export interface IPlusButtonProps {
  onClick?: () => void
  className?: string
}

export const PlusButton: FC<IPlusButtonProps> = memo(
  ({ onClick, className, ...props }: IPlusButtonProps) => {
    return (
      <div
        onClick={onClick}
        className={
          'sm:w-[44px] sm:h-[44px] w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center cursor-pointer border border-green-300 ' +
          className
        }
        {...props}>
        <Icon
          iconName="Plus"
          iconSize={24}
          className="text-green-700 sm:w-6 sm:h-6 w-[18px] h-[18px]"
        />
      </div>
    )
  }
)

PlusButton.displayName = 'PlusButton'

export default PlusButton
