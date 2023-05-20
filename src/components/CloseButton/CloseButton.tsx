import { Close } from '@mui/icons-material'
import { IconButton, styled } from '@mui/material'
import React, { FC, memo } from 'react'

export interface ICloseButtonProps {
  onClose: () => void
}

const BorderButton = styled(IconButton)`
  border: 1px solid var(--var-green-light1);
  color: black;
`

export const CloseButton: FC<ICloseButtonProps> = memo(
  ({ onClose, ...props }: ICloseButtonProps) => {
    return (
      <BorderButton
        className="w-8 h-8 sm:w-11 sm:h-11"
        onClick={() => onClose()}
        {...props}>
        <Close className="text-green-700" />
      </BorderButton>
    )
  }
)

CloseButton.displayName = 'CloseButton'

export default CloseButton
