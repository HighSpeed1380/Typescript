import {
  Box,
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
  styled
} from '@mui/material'
import React, { FC, memo } from 'react'

export interface IDividerProps extends MuiDividerProps {}

const CustomDivider = styled(MuiDivider)<IDividerProps>(({ theme }) => ({
  color: theme.palette.divider,
  '& .MuiDivider-wrapper': {
    color: theme.palette.green.light2,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.5px'
  }
}))

export const Divider: FC<IDividerProps> = memo(
  ({ orientation, children, ...props }: IDividerProps) => {
    return (
      <Box sx={{ width: '100%' }} {...props}>
        <CustomDivider orientation={orientation}>{children}</CustomDivider>
      </Box>
    )
  }
)

Divider.displayName = 'Divider'

export default Divider
