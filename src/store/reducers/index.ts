import { combineReducers } from '@reduxjs/toolkit'

import account from './accountSlice'
import message from './messageSlice'
import tripLogs from './tripLogsSlice'

const reducer = combineReducers({
  account,
  tripLogs,
  message
})

export default reducer
