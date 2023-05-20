import "../Modal/style.css"

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, Typography, useTheme } from '@mui/material'
import { AxiosError } from 'axios'
import React, { FC, memo, useEffect, useState } from 'react'
import EditButton from 'src/components/EditButton'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { setBannerImage } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'
import { UploadFile } from 'src/utils/UploadFile'

import useModal from '../Modal/hooks/useModal'
import Modal from '../Modal/modal'


export interface IBannerImageProps {
  id: string
}

const Input = styled('input')(() => ({
  // display: 'none'
}))

export const BannerImage: FC<IBannerImageProps> = memo(
  ({ id }: IBannerImageProps) => {
    const theme = useTheme()
    const { user } = useAuth()
    const currentUser = id === user.id
    const dispatch = useAppDispatch()
    const [bannerImageSrc, setBannerImageSrc] = useState('')
    const { showToast } = useToast()

    useEffect(() => {
      if (id) {
        axiosInstance
          .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
          .then((res) => {
            setBannerImageSrc(res.data.bannerImage)
          })
          .catch((err: AxiosError) => {
            showToast({
              type: 'error',
              message: err.response?.data
            })
          })
      }
    }, [id])

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]

        try {
          UploadFile(file, 'bannerImage').then(async (resp) => {
            dispatch(
              setBannerImage({ userId: id || '', bannerImage: resp || '' })
            )
            setBannerImageSrc(resp || '')
          })
        } catch (exception) {
          console.log(exception)
        }
      }
    }

    const { isOpen, toggle } = useModal();
    
    return (
      <div className="bg-green-300 flex items-center justify-center w-full min-h-[100px] h-auto sm:h-[200px] xl:h-[300px] relative">
        
        {bannerImageSrc ? (
          <img
            src={bannerImageSrc}
            className="w-full min-h-[100px] h-[100px] sm:h-[200px] xl:h-[300px] object-cover object-[100%_50%]"
          />
        ) : (
          <>
           <div className={bannerImageSrc ? 'hidden' : 'block'} >
          {currentUser && (
            <>
              <div className="sm:flex flex-col cursor-pointer items-center justify-center hidden" onClick={toggle} >
                <CloudDownloadOutlinedIcon
                  sx={{
                    width: 44,
                    height: 44,
                    color: theme.palette.green.dark
                  }}
                />
                <Typography className="text-[28px] leading-6 font-semibold mt-[21px]">
                  Add Your Banner Photo
                </Typography>
                <Typography className="text-[14px] leading-[21px] text-green-700 mt-2">
                  Recomended size 1600x300 px
                </Typography>
              </div>
              <Modal isOpen={isOpen} openModal={toggle}>
                <Input
                  id="File-Upload-BannerImage"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </Modal>
            </>
          )}
        </div>
        </>
        )}
       
        {bannerImageSrc && currentUser && (
          <label
            htmlFor="File-Upload-BannerImage"
            className="w-fit absolute xl:bottom-[13px] xl:right-[calc((100%-1176px)/2)] sm:top-8 sm:right-8 top-5 right-5">
            <div className="flex-col items-center justify-center cursor-pointer">
              <EditButton />
            </div>
          </label>
        )}
      </div>
    )
  }
)

BannerImage.displayName = 'BannerImage'

export default BannerImage
