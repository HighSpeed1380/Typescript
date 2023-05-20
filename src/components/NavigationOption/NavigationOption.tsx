import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Typography, useTheme } from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Avatar, Icon } from '../index'

export interface INavigationOptionProps {
  navigationOptionDirection?: 'row' | 'column'
  navigationOptionIconName?: string
  navigationOptionAvatarSrc?: string
  navigationOptionLabel: string
  navigationOptionLink: string
  navigationOptionShowBottomBorder?: boolean
  onCloseSideNavigation?: () => void
}

export const NavigationOption: FC<INavigationOptionProps> = memo(
  ({
    navigationOptionDirection = 'column',
    navigationOptionIconName,
    navigationOptionAvatarSrc = '',
    navigationOptionLabel,
    navigationOptionLink,
    navigationOptionShowBottomBorder = true,
    onCloseSideNavigation,
    ...props
  }: INavigationOptionProps) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      if (
        location.pathname.split('/')[1] ===
          navigationOptionLabel.toLowerCase() ||
        (location.pathname === '/' && navigationOptionLabel === 'Home')
      )
        setIsActive(true)
      else setIsActive(false)
    }, [location])

    return (
      <div
        className={`cursor-pointer h-full flex justify-center items-center ${
          isActive && navigationOptionShowBottomBorder
            ? 'border-b-2 border-b-green-700'
            : ''
        }`}
        onClick={() => {
          navigate(navigationOptionLink)
          if (onCloseSideNavigation) onCloseSideNavigation()
        }}
        {...props}>
        {navigationOptionLabel === 'Profile' ? (
          <div
            className={`flex flex-col gap-y-[2px] justify-center items-center ${
              isActive ? 'mt-[2px]' : ''
            }`}>
            {navigationOptionAvatarSrc ? (
              <Avatar size={24} src={navigationOptionAvatarSrc} />
            ) : (
              <AccountCircleOutlinedIcon
                fontSize="medium"
                className="text-green-700"
              />
            )}

            <Typography className="text-xs leading-[18px] text-green-700">
              {navigationOptionLabel}
            </Typography>
          </div>
        ) : (
          <>
            {navigationOptionDirection === 'column' ? (
              <div
                className={`flex flex-col gap-y-0.5 justify-center items-center ${
                  isActive ? 'mt-[2px]' : ''
                }`}>
                <Icon
                  iconName={navigationOptionIconName}
                  iconColor={theme.palette.green.dark}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: '18px',
                    fontWeight: 400,
                    color: theme.palette.green.dark
                  }}>
                  {navigationOptionLabel}
                </Typography>
              </div>
            ) : (
              <div className="flex flex-row gap-x-[11px] items-center">
                <Icon
                  iconName={navigationOptionIconName}
                  iconColor={theme.palette.green.dark}
                />
                <Typography
                  sx={{
                    fontSize: 18,
                    lineHeight: '24px',
                    fontWeight: 400,
                    color: theme.palette.green.dark
                  }}>
                  {navigationOptionLabel}
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
    )
  }
)

NavigationOption.displayName = 'NavigationOption'

export default NavigationOption
