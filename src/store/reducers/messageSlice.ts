import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { axiosInstance } from 'src/services/jwtService'
import { AddressUser, MessageGroup, MessagePack } from 'src/types/IAddressUser'

interface AddressStateType {
  address: AddressUser[]
  totalAddress: AddressUser[]
  messages: MessageGroup[]
  activeAddress: AddressUser | null
  directMessages: MessagePack[]
}

const addressState: AddressStateType = {
  address: [],
  totalAddress: [],
  messages: [],
  activeAddress: null,
  directMessages: []
}

export const getAddress = createAsyncThunk(
  'message/getAddress',
  async ({ userId }: { userId: string }) => {
    return await axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/message/address/${userId}`)
      .then((res) => {
        console.log('address~~~~~~~~~', res)
        return res.data
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

export const findUsers = createAsyncThunk(
  'message/findUsers',
  async ({ userId, searchText }: { userId: string; searchText: string }) => {
    return await axiosInstance
      .get(
        `${process.env.REACT_APP_API_URL}/message/users/${userId}/${searchText}`
      )
      .then((res) => {
        console.log('filtered users: ', res)
        return res.data
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

export const getMessage = createAsyncThunk(
  'message/getMessage',
  async ({ userId, partnerId }: { userId: string; partnerId: string }) => {
    return await axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/message/messages`, {
        userId,
        partnerId
      })
      .then((res) => {
        console.log('getmessages~~~~~~~~~', res)
        return res.data
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data)
      })
  }
)

const messageSlice = createSlice({
  name: 'message',
  initialState: addressState,
  reducers: {
    setActiveAddress: (state, action): any => {
      const activeAddress = { ...state.activeAddress }
      if (activeAddress) {
        const newAddr = state.address.map((item) =>
          item.id === activeAddress.id
            ? { ...item, unreadNumber: 0 }
            : { ...item }
        )
        return {
          ...state,
          address: [...newAddr],
          activeAddress: { ...action.payload },
          directMessages: []
        }
      } else
        return {
          ...state,
          activeAddress: { ...action.payload },
          directMessages: []
        }
    },
    addDirectMessage: (state, action): any => {
      const { senderId, content, time, direction, name, avatar } =
        action.payload
      console.log(action.payload)

      if (
        senderId &&
        state.activeAddress &&
        senderId !== state.activeAddress.id
      ) {
        const address = [...state.address]
        address.forEach((item: any) => {
          if (item.id === senderId) item.unreadNumber += 1
        })
        if (address.filter((item) => item.id === senderId).length === 0) {
          address.push({
            id: senderId,
            name,
            avatar,
            content,
            time,
            unreadNumber: 1
          })
        }
        return {
          ...state,
          address: [...address]
        }
      }
      const address = state.address.map((item: any) => {
        if (item.id === senderId) {
          const newItem = {
            ...item,
            content,
            time
          }
          return newItem
        }
        return item
      })

      const arr = [...state.directMessages]
      if (arr.length === 0) {
        arr.push({
          direction,
          message: [
            {
              content,
              time
            }
          ]
        })
        console.log(1)
      } else {
        if (arr[arr.length - 1].direction === direction) {
          console.log(arr.length - 1)
          console.log(arr[arr.length - 1].message.length)
          // arr[arr.length - 1].message.push({
          //   content,
          //   time
          // })
          const msg = [...arr[arr.length - 1].message]
          msg.push({
            content,
            time
          })
          const dir = arr[arr.length - 1].direction
          arr.pop()
          arr.push({ direction: dir, message: [...msg] })
        } else {
          arr.push({
            direction,
            message: [
              {
                content,
                time
              }
            ]
          })
          console.log(3)
        }
        console.log(333)
      }
      console.log(444)
      return {
        ...state,
        directMessages: [...arr],
        address: [...address]
      }
    },
    filterAddress: (state, action): any => {
      const searchText = action.payload
      const filteredAddress = state.totalAddress.filter(
        (address) =>
          address.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
      )
      return {
        ...state,
        address: [...filteredAddress],
        activeAddress:
          filteredAddress.length > 0 ? { ...filteredAddress[0] } : null,
        messages: filteredAddress.length > 0 ? [...state.messages] : []
      }
    }
  },
  extraReducers: {
    [getAddress.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        address: action.payload.length > 0 ? [...action.payload] : [],
        totalAddress: action.payload.length > 0 ? [...action.payload] : [],
        activeAddress:
          action.payload.length > 0 ? { ...action.payload[0] } : null
      }
    },
    [getMessage.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        messages: [...action.payload]
      }
    },
    [findUsers.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        address: action.payload.length > 0 ? [...action.payload] : [],
        activeAddress:
          action.payload.length > 0 ? { ...action.payload[0] } : null
      }
    }
  }
})
export const { setActiveAddress, addDirectMessage, filterAddress } =
  messageSlice.actions
export default messageSlice.reducer
