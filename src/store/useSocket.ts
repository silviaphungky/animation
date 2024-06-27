import PartySocket from 'partysocket'
import { create } from 'zustand'
import { useChats } from './useChats'

interface StoreType {
  ws: PartySocket
}

const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string

export enum SocketMessage {
  NEW_CHAT = 'new_chat',
  UPDATE_ANIMATION = 'update_animation',
}

const SocketStore = () => {
  return {
    ws: new PartySocket({
      host: wsUrl,
      room: 'my-room',
    }),
  }
}

export const useSocket = create<StoreType>(SocketStore)
