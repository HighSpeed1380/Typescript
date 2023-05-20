import { ConnectStatus } from './IConnectStatus'

export interface IMainInfo {
  name?: string
  location?: string
  lastTripLocation?: string
  nextSpotOnBucketList?: string
}
export interface IProfile {
  _id?: string
  mainInfo?: IMainInfo
  profileImage?: string
  bannerImage?: string
  about?: string
  connectionStatus?: ConnectStatus
}
