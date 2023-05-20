import { useTheme } from '@mui/material'
import { FC, memo } from 'react'

import { Icon, Logo } from '../../index'

export interface ISideNavigationHeaderProps {
  /**
   * Function fired when the close Icon clicked
   */
  onCloseSideNavigation: () => void
}

export const SideNavigationHeader: FC<ISideNavigationHeaderProps> = memo(
  ({ onCloseSideNavigation }) => {
    const theme = useTheme()

    return (
      <div className="flex justify-between items-center border-[1px] border-green-100 h-11 pl-2 pr-4">
        <Logo />
        <Icon
          iconName="Close"
          iconColor={theme.palette.green.dark}
          onClick={onCloseSideNavigation}
          className="cursor-pointer"
        />
      </div>
    )
  }
)

SideNavigationHeader.displayName = 'SideNavigationHeader'

export default SideNavigationHeader
