export interface AddressUser {
  id: string
  name: string
  avatar: string
  content: string
  time: string
  unreadNumber: number
}

interface Message {
  content: string
  time: string
}
export interface MessagePack {
  direction: boolean
  message: Message[]
}
export interface MessageGroup {
  date: string
  messagePack: MessagePack[]
}
