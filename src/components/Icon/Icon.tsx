import { SvgIcon, SvgIconProps } from '@mui/material'
import React, { FC, memo } from 'react'

import RawIcons from './svgs/index'

export interface IIconProps extends SvgIconProps {
  /**
   * Icon Name
   */
  iconName?: string
  /**
   * Color
   */
  iconColor?: string
  /**
   * Size
   */
  iconSize?: number
}

export const Icon: FC<IIconProps> = memo(
  ({ iconName = '', iconColor, iconSize = 24, ...props }: IIconProps) => (
    <>
      {iconName && (
        <SvgIcon
          {...props}
          component={RawIcons[iconName]}
          sx={{ color: iconColor, width: iconSize, height: iconSize }}
        />
      )}
    </>
  )
)

Icon.displayName = 'Icon'

export default Icon
