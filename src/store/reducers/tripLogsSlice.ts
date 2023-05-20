/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { axiosInstance } from 'src/services/jwtService'
import { ITripLog } from 'src/types'

import { RootState } from '../store'

export const fetchTripLogs = createAsyncThunk(
  'account/fetchGallery',
  async ({ userId }: { userId: string }) => {
    return await axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/user/travels/${userId}`)
      .then((res) => {
        const resValue = res.data
        const newTripLogs: ITripLog[] = []
        resValue.forEach((value: any) => {
          newTripLogs.push({
            tripLogId: value._id,
            tripCountryCode: value.tripCountryCode,
            tripStartDate: new Date(value.tripStartDate),
            tripEndDate: new Date(value.tripEndDate),
            tripGallery: value.tripGallery,
            tripRecommendations: value.tripRecommendations,
            tripLocation: value.tripLocation,
            tripDescription: value.tripDescription,
            mainTrip: value.mainTrip
          })
        })
        return newTripLogs
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

export const addTripLog = createAsyncThunk(
  'account/addTripLog',
  async ({ userId, tripLog }: { userId: string; tripLog?: ITripLog }) => {
    return await axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/travel/`, {
        userId,
        tripLog
      })
      .then((res) => {
        return {
          ...res.data,
          tripLogId: res.data._id,
          tripStartDate: new Date(res.data.tripStartDate),
          tripEndDate: new Date(res.data.tripEndDate)
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

export const updateTripLog = createAsyncThunk(
  'account/updateTripLog',
  async ({ userId, tripLog }: { userId: string; tripLog?: ITripLog }) => {
    return await axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/travel/${tripLog?.tripLogId}`, {
        userId,
        tripLog
      })
      .then((res) => {
        return {
          ...res.data,
          tripLogId: res.data._id,
          tripStartDate: new Date(res.data.tripStartDate),
          tripEndDate: new Date(res.data.tripEndDate)
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

const tripLogsAdapter = createEntityAdapter<ITripLog>({
  selectId: (tripLog) => {
    return tripLog.tripLogId || ''
  },
  sortComparer: (a, b) => {
    if (b.tripStartDate && a.tripStartDate)
      return b?.tripStartDate?.getTime() - a?.tripStartDate?.getTime()

    return 0
  }
})

const tripLogsSlice = createSlice({
  name: 'tripLogs',
  initialState: tripLogsAdapter.getInitialState({
    loading: false
  }),
  reducers: {
    removeTrip: tripLogsAdapter.removeOne
  },
  extraReducers: {
    [fetchTripLogs.pending.toString()]: (state) => {
      state.loading = true
    },
    [fetchTripLogs.fulfilled.toString()]: (state, action) => {
      state.loading = false
      tripLogsAdapter.setAll(state, action.payload)
      return state
    },
    [addTripLog.pending.toString()]: (state) => {
      state.loading = true
    },
    [addTripLog.fulfilled.toString()]: (state, action) => {
      state.loading = false
      if (action.payload) {
        tripLogsAdapter.addOne(state, action.payload)
      }
      return state
    },
    [updateTripLog.pending.toString()]: (state) => {
      state.loading = true
    },
    [updateTripLog.fulfilled.toString()]: (state, action) => {
      state.loading = false
      if (action.payload) {
        state.entities[action.payload.tripLogId] = action.payload
      }
      return state
    }
  }
})

const { selectById } = tripLogsAdapter.getSelectors()

export const getTripLogsState = (rootState: RootState) => rootState.tripLogs

export const selectTripLogEntity = (id: number) => {
  return createSelector(getTripLogsState, (state) => selectById(state, id))
}

export const tripLogsSelectors = tripLogsAdapter.getSelectors<RootState>(
  (state) => state.tripLogs
)

export const { removeTrip } = tripLogsSlice.actions

export default tripLogsSlice.reducer
