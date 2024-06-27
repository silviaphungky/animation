import { create } from 'zustand'

import { Dispatch, SetStateAction } from 'react'

interface StoreType {
  chats: Array<{
    message: string
    sender: string
    time: string
  }>
  setChats: (
    chats: Array<{ message: string; sender: string; time: string }>
  ) => void
}

const chatsStore = (set: any, get: any) => ({
  chats: [],
  setChats: (
    chats: Array<{ message: string; sender: string; time: string }>
  ) => {
    set({ chats: chats })
  },
})

export const useChats = create<StoreType>()(chatsStore)
