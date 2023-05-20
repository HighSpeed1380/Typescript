import { styled } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import { Icon, TextField } from 'src/components'
import { ITripImage } from 'src/types'

export interface ITripImageCardProps {
  tripImageId: number
  tripImage: ITripImage
  // handleChangeTripImage: (tripImage: ITripImage, tripImageFile: File) => void
  handleRemoveTripImage: () => void
  handleEditGalleryFile: (file: File, tempURL: string) => void
  handleChangeDescription: (description: string) => void
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

export const TripImageCard: FC<ITripImageCardProps> = memo(
  ({
    tripImageId,
    tripImage,
    handleEditGalleryFile,
    handleRemoveTripImage,
    handleChangeDescription
  }: ITripImageCardProps) => {
    const [image, setImage] = useState('')

    useEffect(() => {
      setImage(tripImage.src)
    }, [tripImage])

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const imageDataUrl = (await readFile(file)) as string
        setImage(imageDataUrl)
        handleEditGalleryFile(file, imageDataUrl)
      }
    }

    return (
      <div className="flex sm:flex-row flex-col gap-x-6 gap-y-[6px]">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="sm:w-[150px] sm:h-[117px] w-[82px] h-[79px] rounded-lg flex items-center justify-center bg-cover bg-center relative">
          <label htmlFor={`File-Upload-Trip-Image-Card-${tripImageId}`}>
            <Input
              id={`File-Upload-Trip-Image-Card-${tripImageId}`}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              multiple
            />
            <span className="text-lg leading-6 font-bold text-white cursor-pointer">
              Edit
            </span>
          </label>

          <div
            className="w-5 h-5 bg-[#FF4F55] absolute top-[6px] right-[6px] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleRemoveTripImage()}>
            <Icon iconSize={14} className="text-white" iconName="Cross" />
          </div>
        </div>

        <div className="flex-1 flex-col sm:justify-center">
          <div className="text-sm leading-[21px] text-green-500">
            Background Info
          </div>
          <div className="h-[89px] mt-[7px]">
            <TextField
              rows={3}
              value={tripImage.backgroundInfo}
              multiline={true}
              placeholder="Background Information"
              onChange={(e) => handleChangeDescription(e.target.value)}
              sx={{
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  padding: '10px 16px !important',
                  height: '100%'
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
)

TripImageCard.displayName = 'TripImageCard'

export default TripImageCard
