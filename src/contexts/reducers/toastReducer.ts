import { Dispatch } from 'react'
import { IToastState } from 'src/types'

export type TToastReducerType = 'SHOW_TOAST' | 'HIDE_TOAST'

export interface IToastAction {
  type: TToastReducerType
  payload?: IToastState
}

export const initialToastState: IToastState = {
  open: false,
  message: '',
  type: 'warning',
  anchorOrigin: { vertical: 'top', horizontal: 'right' }
}

export const toastReducer = (
  state: IToastState,
  action: IToastAction
): IToastState => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...action.payload,
        type: action.payload?.type || 'warning',
        open: true
      }
    case 'HIDE_TOAST':
      return {
        ...state,
        open: false
      }
    default:
      return state
  }
}

export const showToast =
  (dispatch: Dispatch<IToastAction>) =>
  (toastState: IToastState): void =>
    dispatch({
      type: 'SHOW_TOAST',
      payload: toastState
    })

export const hideToast = (dispatch: Dispatch<IToastAction>) => (): void =>
  dispatch({
    type: 'HIDE_TOAST'
  })
