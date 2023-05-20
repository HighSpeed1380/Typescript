import { SnackbarProps } from '@mui/material'

export interface IToastState extends SnackbarProps {
  /**
   * Toast Type
   */
  type: 'error' | 'warning' | 'success' | 'info'
}
