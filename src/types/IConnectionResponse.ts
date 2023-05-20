import { IProfile } from './IProfile'

export interface ConnectionResponse {
  connectedUsers: IProfile[]
  recommendedUsers: IProfile[]
  requestingUsers: IProfile[]
}
