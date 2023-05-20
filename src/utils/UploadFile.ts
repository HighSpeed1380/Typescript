import ReactS3Client from 'react-aws-s3-typescript'
import { s3Config } from 'src/config'

export const UploadFile = async (file: File, dirName: string) => {
  const s3 = new ReactS3Client({
    ...s3Config,
    dirName
  })

  try {
    const res = await s3.uploadFile(file)

    return res.location
  } catch (exception) {
    console.log(exception)
  }
}
