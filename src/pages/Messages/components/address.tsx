import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Avatar } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField } from 'src/components'
import { useAuth } from 'src/hooks'
import {
  filterAddress,
  getMessage,
  setActiveAddress
} from 'src/store/reducers/messageSlice'
import { RootState, useAppDispatch } from 'src/store/store'
import { AddressUser } from 'src/types/IAddressUser'

interface AddressType {
  callback: () => void
}

export const Address: FC<AddressType> = memo((props) => {
  const { callback } = props
  const { address, activeAddress } = useSelector(
    (state: RootState) => state.message
  )
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (user && activeAddress && activeAddress.id !== '')
      dispatch(
        getMessage({
          userId: user.id,
          partnerId: activeAddress.id
        })
      )
  }, [])
  useEffect(() => {
    if (user && activeAddress && activeAddress.id !== '')
      dispatch(
        getMessage({
          userId: user.id,
          partnerId: activeAddress.id
        })
      )
  }, [activeAddress])

  useEffect(() => {
    console.log('address address', address)
  }, [address])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleAddressClick = (address: AddressUser): void => {
    dispatch(setActiveAddress(address))
    callback()
  }

  const handleSeachChange = (e: any): void => {
    setSearchTerm(e.target.value)
    const value = e.target.value
    console.log(e)
    console.log(e.target.value)
    dispatch(filterAddress(value))
  }

  return (
    <div className="pl-[20px] md:pl-[32px] pr-[21px] md:pr-[20px]">
      <div className="hidden md:block mt-5 pr-[35px] md:pr-[20px]">
        <TextField
          value={searchTerm}
          textFieldHeight={40}
          textFieldLeftIconName="Search"
          placeholder="Search..."
          sx={{ width: '100%' }}
          onChange={(e) => handleSeachChange(e)}
        />
      </div>
      <div className="pr-0 md:pr-[20px] overflow-y-auto scroll-smooth">
        {address.length > 0 &&
          address.map((item: any, index: number) => (
            <div
              key={'item' + index}
              className={
                activeAddress.id === item.id
                  ? 'flex items-center flex-wrap justify-between h-[64px] md:h-[80px] border-b-[2px] border-[#E5E8DB] pl-1 pr-1 cursor-pointer bg-[#c4c4c9]'
                  : 'flex items-center flex-wrap justify-between h-[64px] md:h-[80px] border-b-[2px] border-[#E5E8DB] pl-1 pr-1 cursor-pointer'
              }
              onClick={() => {
                handleAddressClick(item)
              }}>
              <div className="w-[44px]">
                <Avatar src={item.avatar} />
              </div>
              <div className="w-[calc(100%-60px)]  flex items-center justify-between">
                <div>
                  <h4 className="mb-0 p-0 text-[18px] font-bold">
                    {item.name}
                  </h4>
                  <p className="text-[16px]">
                    {item.content && item.content.length > 15
                      ? item.content.slice(0, 14)
                      : item.content}
                  </p>
                </div>
                <div>
                  <p className="text-[16px]">
                    {item.time ? item.time.split('T')[0] : 'Today'}
                  </p>
                  {(!item.unreadNumber || item.unreadNumber === 0) && (
                    <div className="flex justify-end">
                      <DoneAllIcon />
                    </div>
                  )}
                  {item.unreadNumber > 0 && (
                    <div className="flex justify-end">
                      <div className="flex items-center justify-center text-[18px] text-white w-[24px] h-[24px] bg-[#DFA224] rounded-[50%]">
                        {item.unreadNumber}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
})
