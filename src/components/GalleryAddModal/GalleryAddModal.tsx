import { Dialog, Paper, styled } from '@mui/material'
import React, { FC, memo, useState } from 'react'
import { Button, CloseButton } from 'src/components'
import { updateTripLog } from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripImage } from 'src/types'
import { UploadFile } from 'src/utils/UploadFile'

import TripImageCard from '../UserProfilePage/TripGalleryUploadForm/TripImageCard'

export interface IGalleryAddModalProps {
  open: boolean
  gallery?: ITripImage[]
  tripLogId: string
  userId: string
  handleAddTripGallery: (tripGallery: ITripImage[]) => void
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

const Input = styled('input')(() => ({
  display: 'none'
}))

const readFile = (file: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const GalleryAddModal: FC<IGalleryAddModalProps> = memo(
  ({
    open,
    gallery,
    tripLogId,
    userId,
    handleAddTripGallery,
    onClose
  }: IGalleryAddModalProps) => {
    const dispatch = useAppDispatch()
    const [tripGallery, setTripGallery] = useState<ITripImage[]>([])
    const [newFiles, setNewFiles] = useState<File[]>([])

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files)
        setNewFiles(newFiles.concat(files))

        const newTripGallery = [...tripGallery]

        await Promise.all(
          files.map(async (file) => {
            const imageDataUrl = (await readFile(file)) as string
            newTripGallery.push({
              tripImageId: (Math.random() + 1).toString(36).slice(2),
              src: imageDataUrl,
              backgroundInfo: ''
            })
          })
        ).catch((err) => {
          console.log(err)
        })

        setTripGallery(newTripGallery)
      }
    }

    const handleSaveButtonClick = async () => {
      const newTripGallery: ITripImage[] = tripGallery

      if (newFiles.length > 0) {
        await Promise.all(
          newFiles.map(async (file, index) => {
            try {
              await UploadFile(file, 'tripImage').then(async (resp) => {
                newTripGallery[index] = {
                  ...newTripGallery[index],
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
      }

      const updatedTripGallery = gallery?.concat(newTripGallery)

      dispatch(
        updateTripLog({
          userId,
          tripLog: {
            tripLogId,
            tripGallery: updatedTripGallery
          }
        })
      )

      handleAddTripGallery(updatedTripGallery || [])
      setTripGallery([])
      setNewFiles([])

      onClose()
    }

    const handleRemoveTripImage = (index: number) => {
      setTripGallery(tripGallery.filter((_, i) => i !== index))
      setNewFiles(newFiles.filter((_, i) => i !== index))
    }

    const onChangeImageFile = (
      tripImageFile: File,
      tempURL: string,
      index: number
    ) => {
      setNewFiles(newFiles.map((f, i) => (i === index ? tripImageFile : f)))
      setTripGallery(
        tripGallery.map((ti, i) => (i === index ? { ...ti, src: tempURL } : ti))
      )
    }

    const onChangeDescription = (index: number, description: string) => {
      setTripGallery(
        tripGallery.map((ti, i) =>
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
                Add To Trip Gallery
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <CloseButton onClose={onClose} />
            </div>
          </div>
          <div className="overflow-auto flex-1 max-h-[calc(100vh-200px)]">
            <div className="flex flex-col p-8">
              <span className="font-bold text-lg leading-6">Trip Gallery</span>
              <span className="font-normal text-xs leading-4 text-green-500">
                You can upload a maximum of 10 pictures at a time. Please save
                and return to this screen to add more photos.
              </span>
              <div className="flex flex-col">
                {tripGallery.length > 0 ? (
                  tripGallery?.map((tripImage, index) => (
                    <div
                      key={index}
                      className="pb-[10px] pt-[10px] border-b border-b-green-100 last:border-none">
                      <TripImageCard
                        tripImage={tripImage}
                        tripImageId={index}
                        handleEditGalleryFile={(tripImageFile, tempURL) =>
                          onChangeImageFile(tripImageFile, tempURL, index)
                        }
                        handleRemoveTripImage={() =>
                          handleRemoveTripImage(index)
                        }
                        handleChangeDescription={(description: string) =>
                          onChangeDescription(index, description)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>

              {/** Additional Photos Button */}
              <div className="flex justify-start items-center mt-[5px]">
                <label htmlFor="File-Upload-Travel-Log-Trip-Gallery">
                  <Input
                    id="File-Upload-Travel-Log-Trip-Gallery"
                    type="file"
                    accept="*"
                    onChange={onFileChange}
                    multiple
                  />
                  <div>
                    <Button
                      component="span"
                      buttonLabel="Add Additional Photos"
                      variant="outlined"
                      buttonFontBold
                      buttonLeftIconName="ButtonPicture"
                      sx={{
                        width: 225,
                        padding: '10px 14px',
                        justifyContent: 'flex-start',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                </label>
              </div>

              {/** Save Button */}
              <div className="flex justify-end items-center">
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

GalleryAddModal.displayName = 'GalleryAddModal'

export default GalleryAddModal
