import type { PropsWithChildren } from 'react'
import React, { createContext, Reducer, useReducer } from 'react'
import { Toast } from 'src/components'
import { IToastState } from 'src/types'

import {
  hideToast,
  initialToastState,
  IToastAction,
  showToast,
  toastReducer
} from './reducers/toastReducer'

// eslint-disable-next-line @typescript-eslint/ban-types
export type WithChildren<T = {}> = T & PropsWithChildren<{}>

interface ProviderProps extends WithChildren {}

const createToastContext = (
  reducer: Reducer<IToastState, IToastAction>,
  actions: { [key: string]: CallableFunction },
  initialState: IToastState
) => {
  const Context = createContext<{
    state: IToastState
    actions: { [key: string]: CallableFunction }
  }>({
    state: {
      type: 'warning'
    },
    actions: {}
  })

  const Provider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const boundActions: { [key: string]: CallableFunction } = {}

    for (const key in actions) {
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{ state, actions: { ...boundActions } }}>
        {children}
        <Toast {...state} />
      </Context.Provider>
    )
  }

  return { Context, Provider }
}

export const { Context: ToastContext, Provider: ToastContextProvider } =
  createToastContext(toastReducer, { showToast, hideToast }, initialToastState)
