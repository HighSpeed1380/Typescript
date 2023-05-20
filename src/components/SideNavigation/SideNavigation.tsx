import { Box, styled } from '@mui/material'
import { FC, memo } from 'react'

import SideNavigationHeader from './SideNavigationHeader'
import SideNavigationOptions from './SideNavigationOptions'

export interface ISideNavigationProps {
  onCloseSideNavigation: () => void
  onLogin: () => void
  onSignup: () => void
}

const SideNavigationContainer = styled(Box)(() => ({
  width: '100%'
}))

export const SideNavigation: FC<ISideNavigationProps> = memo(
  ({ onCloseSideNavigation, onLogin, onSignup }: ISideNavigationProps) => {
    return (
      <SideNavigationContainer>
        <SideNavigationHeader onCloseSideNavigation={onCloseSideNavigation} />
        <SideNavigationOptions
          onLogin={onLogin}
          onSignup={onSignup}
          onCloseSideNavigation={onCloseSideNavigation}
        />
      </SideNavigationContainer>
    )
  }
)

SideNavigation.displayName = 'SideNavigation'

export default SideNavigation
