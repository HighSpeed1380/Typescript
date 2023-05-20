import Snackbar from '@mui/material/Snackbar'
import { FC, memo } from 'react'
import { Alert } from 'src/components'
import { useToast } from 'src/hooks'
import { IToastState } from 'src/types'

export const Toast: FC<IToastState> = memo(
  ({ open, message, type, ...props }: IToastState) => {
    const { hideToast } = useToast()

    return (
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => hideToast()}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...props}>
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    )
  }
)

Toast.displayName = 'Toast'

export default Toast
