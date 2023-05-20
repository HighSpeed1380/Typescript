import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Avatar } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MainContainer from 'src/components/MainContainer'
import { useAuth } from 'src/hooks'
import { getAddress } from 'src/store/reducers/messageSlice'
import { RootState, useAppDispatch } from 'src/store/store'

import { Address } from './components/address'
import { MessagePanel } from './components/messages'

export const Messages = memo(() => {
  const { user } = useAuth()
  const [showMessagePanel, setShowMessagePanel] = useState<boolean>(false)
  const { activeAddress } = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch()

  useEffect(() => {}, [])

  useEffect(() => {
    if (user && user.id) dispatch(getAddress({ userId: user.id }))
  }, [user])

  const handleShowMessagePanel = (): void => {
    setShowMessagePanel(true)
  }
  const handleShowAddressPanel = (): void => {
    setShowMessagePanel(false)
  }

  return (
    <MainContainer className="relative w-full mt-5 min-h-[calc(100vh-80px)] border-[2px] rounded-[5px] border-[#E5E8DB]">
      <div className="md:w-[calc(100%-400px)] h-full ml-0 md:ml-[400px] bg-white">
        <div className="flex items-center pl-[20px] md:pl-[32px] h-[70px] md:h-[80px] border-b-[2px]  border-[#E5E8DB]">
          <div className="block md:hidden mr-1 md:mr-0">
            <KeyboardBackspaceIcon onClick={() => handleShowAddressPanel()} />
          </div>
          <Avatar
            src={activeAddress ? activeAddress.avatar : ''}
            sx={{ width: '44px', height: '44px' }}
          />
          <h1 className="ml-3 p-0 font-bold  text-[22px] md:text-[24px] ">
            {activeAddress ? activeAddress.name : ''}
          </h1>
        </div>
        <MessagePanel />
      </div>
      <div
        className={
          (showMessagePanel ? 'hidden md:block ' : '') +
          'absolute top-0 left-0 w-full md:w-[400px] h-full text-left bg-white border-r-[2px] border-[#E5E8DB]'
        }>
        <div className="flex items-center pl-[20px] md:pl-[32px] h-[70px] md:h-[80px] border-b-[2px] border-[#E5E8DB]">
          <h1 className="p-0  font-bold  text-[22px] md:text-[24px] ">
            Messages
          </h1>
        </div>
        <Address callback={handleShowMessagePanel} />
      </div>
    </MainContainer>
  )
})

Messages.displayName = 'Messages'

export default Messages
