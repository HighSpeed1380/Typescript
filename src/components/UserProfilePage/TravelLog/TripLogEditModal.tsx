import { Dialog, Paper, styled } from '@mui/material'
import { AxiosError } from 'axios'
import React, { FC, memo, useEffect, useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import Autocomplete from 'react-google-autocomplete'
import Flag from 'react-world-flags'
import {
  Button,
  Calendar,
  Checkbox,
  CloseButton,
  TextField,
  TripGalleryUploadForm
} from 'src/components'
import { useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import {
  addTripLog,
  removeTrip,
  updateTripLog
} from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripImage, ITripLog, ITripRecommendation } from 'src/types'
import { UploadFile } from 'src/utils/UploadFile'

import TripRecommendationForm from '../../UserProfilePage/TripRecommendationForm/TripRecommendationForm'

export interface ITripLogEditModalProps {
  userId: string
  tripLog?: ITripLog
  open: boolean
  mode?: 'add' | 'edit'
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

const CountrySelector = styled(ReactFlagsSelect)(({ theme }) => ({
  paddingBottom: 0,
  minWidth: 'calc(100% - 96px)',
  [theme.breakpoints.up('sm')]: {
    minWidth: 320
  },
  '& [data-testid="rfs-selected-flag"]': {
    display: 'none'
  },
  '& [data-testid="rfs-btn"]': {
    color: theme.palette.green.dark,
    fontSize: '14px !important',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: '21px'
  }
}))

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.5, 4),
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

export const TripLogEditModal: FC<ITripLogEditModalProps> = memo(
  ({ open, mode, userId, tripLog, onClose }: ITripLogEditModalProps) => {
    const dispatch = useAppDispatch()
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const [tripStartDate, setTripStartDate] = useState<Date>(new Date())
    const [tripEndDate, setTripEndDate] = useState<Date>(new Date())
    const [tripLocation, setTripLocation] = useState('')
    const [tripDescription, setTripDescription] = useState('')
    const [tripGallery, setTripGallery] = useState<ITripImage[]>([])
    const [tripGalleryTemp, setTripGalleryTemp] = useState<ITripImage[]>([])
    const [tripRecommendations, setTripRecommendations] = useState<
      ITripRecommendation[]
    >([])
    const [notification, setNotification] = useState(false)
    const { showToast } = useToast()
    const [selectedCountry, setSelectedCountry] = useState('')
    const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([])
    const [mainTrip, setMainTrip] = useState(false)

    useEffect(() => {
      if (mode === 'add') {
        setTripStartDate(new Date())
        setTripEndDate(new Date())
        setTripLocation('')
        setTripDescription('')
        setTripGallery([])
        setTripGalleryTemp([])
        setTripRecommendations([])
        setSelectedCountry(tripLog?.tripCountryCode || '')
        setNotification(false)
      } else if (mode === 'edit') {
        setTripStartDate(tripLog?.tripStartDate || new Date())
        setTripEndDate(tripLog?.tripEndDate || new Date())
        setTripLocation(tripLog?.tripLocation || '')
        setTripDescription(tripLog?.tripDescription || '')
        setTripGallery(tripLog?.tripGallery || [])
        setTripGalleryTemp(tripLog?.tripGallery || [])
        setTripRecommendations(tripLog?.tripRecommendations || [])
        setSelectedCountry(tripLog?.tripCountryCode || '')
        setNotification(tripLog?.notification || false)
      }

      if (tripLog && tripLog?.tripCountryCode) setMainTrip(false)
      else setMainTrip(true)
    }, [tripLog, mode])

    const handleSaveButtonClick = async () => {
      if (!tripLocation || !tripDescription || !selectedCountry) {
        showToast({
          type: 'warning',
          message: 'Please input all necessary fields...'
        })
        return
      }

      if (tripStartDate > tripEndDate) {
        showToast({
          type: 'warning',
          message: 'Trip End Date cannot be earlier than Trip Start Date...'
        })
        return
      }

      const newTripGallery: ITripImage[] = tripGalleryTemp
      if (newGalleryFiles.length > 0) {
        await Promise.all(
          newGalleryFiles.map(async (file, index) => {
            try {
              await UploadFile(file, 'tripImage').then(async (resp) => {
                newTripGallery[index] = {
                  ...newTripGallery[index],
                  tripImageId: (Math.random() + 1).toString(36).slice(2),
                  src: resp || ''
                }
              })
            } catch (exception) {
              console.log(exception)
            }
          })
        ).catch((err) => {
          console.log(err)
        })

        setNewGalleryFiles([])
        setTripGalleryTemp(newTripGallery)
      }

      if (mode === 'add') {
        dispatch(
          addTripLog({
            userId,
            tripLog: {
              tripStartDate,
              tripEndDate,
              tripDescription,
              tripGallery: newTripGallery,
              tripRecommendations: tripRecommendations.filter(
                (tr) => tr.title !== '' && tr.description !== ''
              ),
              tripLocation,
              tripCountryCode: selectedCountry,
              notification,
              mainTrip
            }
          })
        )
      } else if (mode === 'edit') {
        dispatch(
          updateTripLog({
            userId,
            tripLog: {
              tripLogId: tripLog?.tripLogId,
              tripStartDate,
              tripEndDate,
              tripDescription,
              tripGallery: newTripGallery,
              tripRecommendations: tripRecommendations.filter(
                (tr) => tr.title !== '' && tr.description !== ''
              ),
              tripLocation,
              tripCountryCode: selectedCountry,
              notification
            }
          })
        )
      }
      onClose()
    }

    const handleDeleteButtonClick = async () => {
      axiosInstance
        .delete(
          `${process.env.REACT_APP_API_URL}/travel/${userId}/${tripLog?.tripLogId}`
        )
        .then(() => {})
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })

      dispatch(removeTrip(tripLog?.tripLogId || ''))
      onClose()
    }

    const handleChangeTripRecommendations = (
      recommendation: ITripRecommendation[]
    ) => {
      setTripRecommendations(recommendation)
    }

    const handleAddGalleryFiles = (files: File[]) => {
      setNewGalleryFiles(newGalleryFiles.concat(files))
      setTripGalleryTemp(
        tripGalleryTemp.concat(
          Array(files.length).fill({
            src: '',
            backgroundInfo: ''
          })
        )
      )
    }

    const handleEditGalleryFile = (file: File, index: number) => {
      setNewGalleryFiles(
        newGalleryFiles.map((f, i) => (i === index ? file : f))
      )
    }

    const handleRemoveGalleryFile = (fileIndex: number) => {
      setNewGalleryFiles(newGalleryFiles.filter((_, i) => i !== fileIndex))
      setTripGalleryTemp(tripGalleryTemp.filter((_, i) => i !== fileIndex))
    }

    const handleChangeDescription = (index: number, description: string) => {
      setTripGalleryTemp(
        tripGalleryTemp.map((ti, i) =>
          i === index ? { ...ti, backgroundInfo: description } : ti
        )
      )
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="overflow-hidden">
          <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
            <div className="flex flex-col sm:flex-row">
              <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
                {mode === 'edit'
                  ? 'Edit Travel Log'
                  : tripLog?.tripCountryCode
                  ? `Add a Stop to Your ${regionNames.of(
                      tripLog?.tripCountryCode || ''
                    )} Trip`
                  : 'Add New Travel'}
              </span>
              <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
                {mode === 'edit' ? ` - ${tripLog?.tripLocation}` : ''}
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <CloseButton onClose={onClose} />
            </div>
          </div>
          <div className="overflow-auto flex-1 h-[calc(100vh-200px)]">
            <div className="flex flex-col p-8">
              {/** Image Upload */}
              <div className="flex sm:flex-row flex-col gap-x-[148px] gap-y-3 sm:mb-6 mb-4 sm:items-center">
                <div className="ml-1 flex flex-row gap-x-8 items-center sm:justify-center min-h-[56px]">
                  {selectedCountry ? (
                    <Flag
                      code={selectedCountry}
                      style={{
                        width: 64
                      }}
                    />
                  ) : (
                    <div className="min-w-[64px] h-[44px] bg-green-100"></div>
                  )}

                  <CountrySelector
                    searchable
                    selected={selectedCountry || ''}
                    placeholder="Select Trip Country *"
                    onSelect={(code) => setSelectedCountry(code)}
                  />
                </div>
              </div>

              {/** Trip Information Input */}
              <div className="flex flex-col gap-y-4 sm:mb-2 mb-4">
                <div className="flex flex-col gap-y-[7px]">
                  <span className="text-green-500 leading-[21px] text-sm">
                    Trip Location *
                  </span>
                  <CustomAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setTripLocation(e.currentTarget.value)
                    }
                    onPlaceSelected={(place) => {
                      setTripLocation(place?.formatted_address)
                    }}
                    options={{
                      componentRestrictions: selectedCountry
                        ? { country: selectedCountry }
                        : undefined
                    }}
                    defaultValue={tripLocation || ''}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-x-7 gap-y-4">
                  <Calendar
                    value={tripStartDate}
                    label="Travel Start Date *"
                    calendarPlaceholder="Select Starting Date"
                    renderInput={() => <></>}
                    onChange={(newDate) =>
                      setTripStartDate(newDate || new Date())
                    }
                  />
                  <Calendar
                    value={tripEndDate}
                    label="Travel End Date *"
                    calendarPlaceholder="Select End Date"
                    renderInput={() => <></>}
                    onChange={(newDate) =>
                      setTripEndDate(newDate || new Date())
                    }
                  />
                </div>
                <TextField
                  value={tripDescription}
                  label="Trip Description *"
                  multiline={true}
                  placeholder="Trip Description"
                  rows={5}
                  onChange={(e) => setTripDescription(e.target.value)}
                  helperText={`${tripDescription.length}/2600`}
                  inputProps={{ maxLength: 2600 }}
                />
              </div>

              {/** Trip Gallery */}
              <TripGalleryUploadForm
                userId={userId}
                tripLogId={tripLog?.tripLogId || ''}
                gallery={tripGallery}
                handleAddGalleryFiles={handleAddGalleryFiles}
                handleEditGalleryFile={handleEditGalleryFile}
                handleRemoveGalleryFile={handleRemoveGalleryFile}
                handleChangeDescription={handleChangeDescription}
              />

              {/** Trip Recommendations */}
              <TripRecommendationForm
                tripRecommendations={tripRecommendations}
                handleChangeTripRecommendations={
                  handleChangeTripRecommendations
                }
              />

              {/** Agreement */}
              <div className="flex flex-col mt-6">
                <span className="font-bold text-sm leading-6 text-green-700 mb-2">
                  Do you want to notify your connections about this trip now?
                  You can come back and do this at any time
                </span>
                <Checkbox
                  checkboxLabel="Yes"
                  checked={notification}
                  onClick={() => setNotification((state) => !state)}
                />
              </div>

              {/** Save Button */}
              <div className="flex justify-between items-center mt-8">
                {mode === 'edit' ? (
                  <span
                    className="font-bold text-lg leading-6 text-green-500 cursor-pointer"
                    onClick={handleDeleteButtonClick}>
                    Delete Trip
                  </span>
                ) : (
                  <div></div>
                )}
                <Button
                  buttonLabel="Save"
                  variant="contained"
                  className="w-[100px]"
                  onClick={handleSaveButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
)

TripLogEditModal.displayName = 'TripLogEditModal'

export default TripLogEditModal
