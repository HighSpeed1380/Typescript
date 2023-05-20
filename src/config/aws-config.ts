export const s3Config = {
  bucketName: 'vagavoybucket',
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY || '',
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ''
}
