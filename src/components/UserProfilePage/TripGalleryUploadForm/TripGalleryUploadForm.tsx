import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, useTheme } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import Button from 'src/components/Button'
import { ITripImage } from 'src/types'

import TripImageCard from './TripImageCard'

export interface ITripGalleryUploadFormProps {
  userId: string
  tripLogId: string
  gallery: ITripImage[]
  handleAddGalleryFiles: (galleryFiles: File[]) => void
  handleEditGalleryFile: (file: File, index: number) => void
  handleRemoveGalleryFile: (fileIndex: number) => void
  handleChangeDescription: (index: number, description: string) => void
}

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

export const TripGalleryUploadForm: FC<ITripGalleryUploadFormProps> = ({
  userId,
  tripLogId,
  gallery,
  handleAddGalleryFiles,
  handleEditGalleryFile,
  handleRemoveGalleryFile,
  handleChangeDescription
}) => {
  const theme = useTheme()
  const [tripGallery, setTripGallery] = useState<ITripImage[]>(gallery)

  useEffect(() => {
    setTripGallery(gallery)
  }, [gallery])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)

      handleAddGalleryFiles(files)

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

  const handleRemoveTripImage = (fileIndex: number) => {
    setTripGallery(tripGallery.filter((_, i) => i !== fileIndex))
    handleRemoveGalleryFile(fileIndex)
  }

  const onChangeImageFile = (
    tripImageFile: File,
    tempURL: string,
    index: number
  ) => {
    handleEditGalleryFile(tripImageFile, index)
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
    handleChangeDescription(index, description)
  }

  return (
    <div className="flex flex-col">
      <span className="font-bold text-lg leading-6 mb-1">Trip Gallery</span>

      {gallery.length > 0 ? (
        <></>
      ) : (
        <span className="text-xs leading-4 text-green-500 mb-3">
          Upload a maximum of 5 photos now. After saving, you can upload an
          unlimited number in your Trip Gallery link
        </span>
      )}

      {gallery.length > 0 ? (
        <a href={`/gallery/${userId}/${tripLogId}`}>
          {' '}
          <span className="text-base leading-6 text-green-500 cursor-pointer">
            Go to your Trip Gallery page to edit photos and videos for this
            trip.
          </span>{' '}
        </a>
      ) : tripGallery.length > 0 ? (
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-4">
            {tripGallery?.map((tripImage, index) => (
              <TripImageCard
                key={index}
                tripImage={tripImage}
                tripImageId={index}
                handleEditGalleryFile={(tripImageFile, tempURL) =>
                  onChangeImageFile(tripImageFile, tempURL, index)
                }
                handleRemoveTripImage={() => handleRemoveTripImage(index)}
                handleChangeDescription={(description: string) =>
                  onChangeDescription(index, description)
                }
              />
            ))}
          </div>
          <label htmlFor="File-Upload-Travel-Log-Trip-Gallery">
            <Input
              id="File-Upload-Travel-Log-Trip-Gallery"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              multiple
            />
            <div>
              <Button
                component="span"
                buttonLabel="Add Next"
                variant="outlined"
                buttonFontBold
                buttonLeftIconName="ButtonPicture"
                sx={{
                  width: 150,
                  padding: '10px 14px',
                  justifyContent: 'flex-start'
                }}
              />
            </div>
          </label>
        </div>
      ) : (
        <label htmlFor="File-Upload-Travel-Log-Trip-Gallery">
          <Input
            id="File-Upload-Travel-Log-Trip-Gallery"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            multiple
          />
          <div className="flex flex-col gap-y-1 h-[117px] bg-green-100 rounded-lg items-center justify-center cursor-pointer">
            <CloudDownloadOutlinedIcon
              sx={{
                width: 44,
                height: 44,
                color: theme.palette.green.middle
              }}
            />
            <span className="font-bold text-lg leading-6 text-green-500">
              Upload Files
            </span>
          </div>
        </label>
      )}
    </div>
  )
}

TripGalleryUploadForm.displayName = 'TripGalleryUploadForm'

export default TripGalleryUploadForm
