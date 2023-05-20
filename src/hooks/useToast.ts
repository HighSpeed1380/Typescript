import { useContext } from 'react'
import { ToastContext } from 'src/contexts'

export const useToast = () => {
  const {
    actions: { showToast, hideToast }
  } = useContext(ToastContext)

  return {
    showToast,
    hideToast
  }
}
