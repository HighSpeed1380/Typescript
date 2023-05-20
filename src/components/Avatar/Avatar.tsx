import { Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { AxiosError } from 'axios'
import { FC, memo, useEffect, useState } from 'react'
// import ReactS3Client from 'react-aws-s3-typescript'
import { EditButton, Icon } from 'src/components'
// import { AddImgButton } from 'src/components/AddImgButton'
// import { s3Config } from 'src/config/aws-config'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { setProfileImage } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'
import { UploadFile } from 'src/utils/UploadFile'

interface IAvatarProps {
  id?: string
  size?: number
  borderWidth?: number
  src?: string
  className?: string
  editButtonPosClassName?: string
  addButtonPosClassName?: string
  showAddLabel?: boolean
  onClick?: () => void
}

const CustomAvatar = styled('img')<IAvatarProps>(({ size, borderWidth }) => ({
  width: size,
  height: size,
  borderRadius: '100%',
  borderColor: 'white',
  borderWidth
}))

const Input = styled('input')(() => ({
  display: 'none'
}))

export const Avatar: FC<IAvatarProps> = memo(
  ({
    src = '',
    size,
    borderWidth,
    id,
    className,
    editButtonPosClassName,
    showAddLabel = true,
    onClick
  }) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const { user } = useAuth()
    const currentUser = user.id && id === user.id
    const [avatar, setAvatar] = useState('')
    const { showToast } = useToast()

    useEffect(() => {
      if (id) {
        axiosInstance
          .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
          .then((res) => {
            setAvatar(res.data.profileImage)
          })
          .catch((err: AxiosError) => {
            showToast({
              type: 'error',
              message: err.response?.data
            })
          })
      }
    }, [id])

    const avatarSrc = avatar || src

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]

        try {
          UploadFile(file, 'avatar').then(async (resp) => {
            dispatch(
              setProfileImage({ userId: id || '', profileImage: resp || '' })
            )
            setAvatar(resp || '')
          })
        } catch (exception) {
          console.log(exception)
        }
      }
    }

    return (
      <div className="w-fit relative" onClick={onClick}>
        {avatarSrc && (
          <CustomAvatar
            src={avatarSrc}
            size={size}
            borderWidth={borderWidth}
            className={className}
          />
        )}
        <div
          className={
            avatarSrc
              ? 'hidden'
              : 'block' +
                ' rounded-full border-white flex items-center justify-center bg-green-100 ' +
                className
          }>
          {currentUser ? (
            <label>
              <Input
                id="File-Upload-Avatar"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <Icon
                  iconName="Picture"
                  iconSize={44}
                  iconColor={theme.palette.green.middle}
                />
                {showAddLabel ? (
                  <Typography className="text-lg leading-6 font-bold mt-3 text-green-500 xl:flex hidden">
                    Add Your Profile Picture
                  </Typography>
                ) : (
                  <></>
                )}
              </div>
            </label>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Icon
                iconName="Picture"
                iconSize={44}
                iconColor={theme.palette.green.middle}
              />
            </div>
          )}
        </div>
        {avatarSrc && currentUser ? (
          <label
            htmlFor="File-Upload-Avatar"
            className={
              `w-fit absolute xl:bottom-3 xl:right-[38px] bottom-[0px] right-[0px] ` +
              editButtonPosClassName
            }>
            <div className="flex-col items-center justify-center cursor-pointer">
              <EditButton />
            </div>
          </label>
        ) : (
          <></>
          // <label
          //   htmlFor="File-Upload-Avatar"
          //   className={
          //     `w-fit absolute xl:bottom-3 xl:right-[38px] bottom-[0px] right-[0px] `
          //   }>
          //   <div className="flex-col items-center justify-center cursor-pointer">
          //     <AddImgButton />
          //   </div>
          // </label>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
