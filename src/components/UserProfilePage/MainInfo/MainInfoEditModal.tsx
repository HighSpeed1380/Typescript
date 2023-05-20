import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { Button, CloseButton, TextField } from 'src/components'
import { IMainInfo } from 'src/types'

export interface IMainInfoEditModalProps {
  open: boolean
  userId: string
  mainInfo: IMainInfo
  handleSaveMainInfo: (mainInfo: IMainInfo) => void
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.5, 3),
  fontFamily: 'proxima_nova',
  fontSize: '14px',
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: '21px',
  color: '#003300',
  border: `1px solid ${theme.palette.green.light1}`,
  borderRadius: '4px',
  '&:focus': {
    border: `1px solid ${theme.palette.green.light1}`
  },
  '&::placeholder': {
    color: theme.palette.green.middle
  },
  outline: 'none'
}))

export const MainInfoEditModal: FC<IMainInfoEditModalProps> = memo(
  ({
    open,
    mainInfo,
    onClose,
    handleSaveMainInfo
  }: IMainInfoEditModalProps) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [lastTripLocation, setLastTripLocation] = useState('')
    const [nextSpotOnBucketList, setNextSpotOnBucketList] = useState('')

    useEffect(() => {
      if (mainInfo) {
        setName(mainInfo?.name || '')
        setLocation(mainInfo?.location || '')
        setLastTripLocation(mainInfo?.lastTripLocation || '')
        setNextSpotOnBucketList(mainInfo?.nextSpotOnBucketList || '')
      }
    }, [mainInfo])

    const handleSaveButtonClick = async () => {
      handleSaveMainInfo({
        name,
        location,
        lastTripLocation,
        nextSpotOnBucketList
      })
      onClose()
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
          <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
            Edit Info
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 p-8 items-end">
          <TextField
            value={name}
            label="Full Name"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="w-full flex flex-col gap-y-2">
            <span className="w-full text-green-500 leading-[21px] text-sm text-left">
              Currently In
            </span>
            <CustomAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setLocation(e.currentTarget.value)
              }
              onPlaceSelected={(place) => {
                setLocation(place?.formatted_address)
              }}
              defaultValue={location || ''}
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span className="w-full text-green-500 leading-[21px] text-sm text-left">
              Last Trip
            </span>
            <CustomAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setLastTripLocation(e.currentTarget.value)
              }
              onPlaceSelected={(place) => {
                setLastTripLocation(place?.formatted_address)
              }}
              defaultValue={lastTripLocation || ''}
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span className="w-full text-green-500 leading-[21px] text-sm text-left">
              Next Spot on Bucket List
            </span>
            <CustomAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNextSpotOnBucketList(e.currentTarget.value)
              }
              onPlaceSelected={(place) => {
                setNextSpotOnBucketList(place?.formatted_address)
              }}
              defaultValue={nextSpotOnBucketList || ''}
            />
          </div>
          <Button
            buttonLabel="Save"
            variant="contained"
            className="w-[100px] mt-[100px]"
            onClick={handleSaveButtonClick}
          />
        </div>
      </Dialog>
    )
  }
)

MainInfoEditModal.displayName = 'MainInfoEditModal'

export default MainInfoEditModal
