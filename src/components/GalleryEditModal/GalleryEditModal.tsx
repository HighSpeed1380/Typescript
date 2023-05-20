import { Dialog, Paper, styled } from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'
import { Button, CloseButton } from 'src/components'
import { updateTripLog } from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripImage } from 'src/types'
import { UploadFile } from 'src/utils/UploadFile'

import TripImageCard from '../UserProfilePage/TripGalleryUploadForm/TripImageCard'

export interface IGalleryEditModalProps {
  open: boolean
  gallery?: ITripImage[]
  tripLogId: string
  userId: string
  handleChangeTripGallery: (tripGallery: ITripImage[]) => void
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

type ChangedFile = {
  id: string
  file: File
}

export const GalleryEditModal: FC<IGalleryEditModalProps> = memo(
  ({
    open,
    gallery,
    tripLogId,
    userId,
    handleChangeTripGallery,
    onClose
  }: IGalleryEditModalProps) => {
    const dispatch = useAppDispatch()
    const [tripGallery, setTripGallery] = useState<ITripImage[]>([])
    const [changedFiles, setChangedFiles] = useState<ChangedFile[]>([])

    useEffect(() => {
      setTripGallery(gallery || [])
    }, [gallery])

    const handleSaveButtonClick = async () => {
      const newTripGallery: ITripImage[] = tripGallery

      if (changedFiles.length > 0) {
        await Promise.all(
          changedFiles.map(async (changedFile) => {
            try {
              await UploadFile(changedFile.file, 'tripImage').then(
                async (resp) => {
                  newTripGallery.map((ti) =>
                    ti.tripImageId === changedFile.id
                      ? { ...ti, src: resp }
                      : ti
                  )
                }
              )
            } catch (exception) {
              console.log(exception)
            }
          })
        ).catch((err) => {
          console.log(err)
        })
      }

      setChangedFiles([])
      setTripGallery(newTripGallery)

      dispatch(
        updateTripLog({
          userId,
          tripLog: {
            tripLogId,
            tripGallery: newTripGallery
          }
        })
      )

      handleChangeTripGallery(newTripGallery)

      onClose()
    }

    const handleRemoveTripImage = (id: string) => {
      setTripGallery(tripGallery.filter((ti) => ti.tripImageId !== id))
    }

    const onChangeImageFile = (
      tripImageFile: File,
      tempURL: string,
      id: string
    ) => {
      const newFiles = [...changedFiles]
      newFiles.push({
        id,
        file: tripImageFile
      })
      setChangedFiles(newFiles)
      setTripGallery(
        tripGallery.map((ti) =>
          ti.tripImageId === id ? { ...ti, src: tempURL } : ti
        )
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
                Edit Trip Gallery
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <CloseButton onClose={onClose} />
            </div>
          </div>
          <div className="overflow-auto flex-1 max-h-[calc(100vh-200px)]">
            <div className="flex flex-col p-8">
              <span className="font-bold text-lg leading-6 mb-6">
                Trip Gallery
              </span>
              <div className="flex flex-col gap-y-4">
                {tripGallery.length > 0 ? (
                  tripGallery?.map((tripImage, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-b-green-100 last:border-none">
                      <TripImageCard
                        tripImage={tripImage}
                        tripImageId={index}
                        handleEditGalleryFile={(tripImageFile, tempURL) =>
                          onChangeImageFile(
                            tripImageFile,
                            tempURL,
                            tripImage.tripImageId || ''
                          )
                        }
                        handleRemoveTripImage={() =>
                          handleRemoveTripImage(tripImage.tripImageId || '')
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
              {/** Save Button */}
              <div className="flex justify-end items-center mt-8">
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

GalleryEditModal.displayName = 'GalleryEditModal'

export default GalleryEditModal
