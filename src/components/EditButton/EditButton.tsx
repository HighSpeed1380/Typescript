import React, { FC, memo } from 'react'

import Icon from '../Icon'

export interface IEditButtonProps {
  onClick?: () => void
  className?: string
}

export const EditButton: FC<IEditButtonProps> = memo(
  ({ onClick, className, ...props }: IEditButtonProps) => {
    return (
      <div
        onClick={onClick}
        className={
          'sm:w-[44px] sm:h-[44px] w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center cursor-pointer border border-green-300 ' +
          className
        }
        {...props}>
        <Icon
          iconName="Pencil"
          iconSize={24}
          className="text-green-700 sm:w-6 sm:h-6 w-[18px] h-[18px]"
        />
      </div>
    )
  }
)

EditButton.displayName = 'EditButton'

export default EditButton
