import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
  Typography} from '@mui/material'
import React, { FC, memo } from 'react'

import Icon from '../Icon'

export interface IButtonProps extends MuiButtonProps {
  /**
   * ButtonSize
   */
  buttonSize?: 'big' | 'small'
  /**
   * Has left arrow?
   */
  buttonLeftIconName?: string
  /**
   * Has right arrow?
   */
  buttonRightIconName?: string
  /**
   * Button Label
   */
  buttonLabel?: string
  /**
   * Button Font Bold
   */
  buttonFontBold?: boolean
  /**
   * Component Type
   */
  component?: string
}

const CustomButton = styled(MuiButton, {
  shouldForwardProp: (propName) =>
    propName !== 'buttonSize' && propName !== 'buttonFontBold'
})<IButtonProps>(({ theme, buttonSize, buttonFontBold }) => ({
  borderRadius: '50px',
  columnGap: theme.spacing(2),
  minWidth: 'max-content',
  height: buttonSize === 'big' ? 44 : 32,
  boxShadow: 'none',

  '&.MuiButton-contained': {
    color: 'white',
    backgroundColor: theme.palette.green.dark
  },

  '&.MuiButton-outlined': {
    borderColor: theme.palette.green.dark,
    color: theme.palette.green.dark,
    backgroundColor: 'white'
  },

  '&.MuiButton-text': {
    color: theme.palette.green.dark,
    backgroundColor: '#F5F5F5'
  },

  '& .MuiTypography-root': {
    textTransform: 'capitalize',
    fontWeight: buttonFontBold ? 700 : 400,
    fontSize: '1rem',
    lineHeight: '24px'
  },

  '&:disabled': {
    backgroundColor: theme.palette.green.light1
  }
}))

export const Button: FC<IButtonProps> = memo(
  ({
    buttonSize = 'big',
    buttonLeftIconName = '',
    buttonRightIconName = '',
    buttonLabel = '',
    buttonFontBold = false,
    ...props
  }: IButtonProps) => {
    return (
      <CustomButton
        {...props}
        buttonSize={buttonSize}
        buttonFontBold={buttonFontBold}>
        {buttonLeftIconName && (
          <Icon iconName={buttonLeftIconName} iconSize={24} />
        )}
        {buttonLabel && <Typography variant="button">{buttonLabel}</Typography>}
        {buttonRightIconName && (
          <Icon iconName={buttonRightIconName} iconSize={24} />
        )}
      </CustomButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
