import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  styled,
  Typography} from '@mui/material'
import React, { FC, memo } from 'react'

export interface ICheckboxProps extends MuiCheckboxProps {
  /**
   * Checkbox label
   */
  checkboxLabel?: string
}

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0),

  '&.MuiFormControlLabel-root': {
    columnGap: theme.spacing(3)
  }
}))

const CustomCheckbox = styled(MuiCheckbox)<ICheckboxProps>(({ theme }) => ({
  '&.MuiCheckbox-root': {
    padding: theme.spacing(0),
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  '&.Mui-checked': {
    color: theme.palette.green.dark
  },
  '& .MuiSvgIcon-root': {
    width: 16,
    height: 16
  }
}))

export const Checkbox: FC<ICheckboxProps> = memo(
  ({ checkboxLabel = '', disabled, ...props }: ICheckboxProps) => (
    <FormControlLabel
      disabled={disabled}
      control={<CustomCheckbox {...props} />}
      label={
        <Typography className="text-[16px] leading-6">
          {checkboxLabel}
        </Typography>
      }
      className="w-fit"
    />
  )
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
