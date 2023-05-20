import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types'

const initialState: IProfile = {}

export const setProfileImage = createAsyncThunk(
  'account/setProfileImage',
  async ({
    userId,
    profileImage
  }: {
    userId: string
    profileImage: string
  }) => {
    return await axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        profileImage
      })
      .then(() => {
        return profileImage
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

export const setBannerImage = createAsyncThunk(
  'account/setBannerImage',
  async ({ userId, bannerImage }: { userId: string; bannerImage: string }) => {
    return await axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        bannerImage
      })
      .then(() => {
        return bannerImage
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateProfile: (state, action) => action.payload
  },
  extraReducers: {
    [setProfileImage.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        profileImage: action.payload
      }
    },
    [setBannerImage.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        bannerImage: action.payload
      }
    }
  }
})

export const { updateProfile } = accountSlice.actions

export default accountSlice.reducer
