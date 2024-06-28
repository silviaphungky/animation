import { useEffect } from 'react'
import dayjs from 'dayjs'

import { Button } from '@/components'
import { IconSend } from '@/components/Icons'

import { SocketMessage, useSocket } from '@/store/useSocket'
import { usernameKey } from '@/constants/key'
import { Controller, useForm } from 'react-hook-form'
import { useChats } from '@/store/useChats'

const ChatMenu = () => {
  const ws = useSocket((state) => state.ws)
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      message: '',
    },
  })

  const chats = useChats((state) => state.chats)
  const setChats = useChats((state) => state.setChats)

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      const data = e.data
      const parsedData = JSON.parse(data)
      if (parsedData.type === SocketMessage.NEW_CHAT) {
        setChats([
          ...chats,
          {
            message: parsedData.message,
            sender: parsedData.sender,
            time: parsedData.time,
          },
        ])
      }
    })
  }, [chats])

  const handleSendMessage = (value: { message: string }) => {
    const message = value.message
    const sender = localStorage.getItem(usernameKey)

    const socketMessage = {
      type: SocketMessage.NEW_CHAT,
      message,
      sender,
      time: dayjs(new Date()).format('HH:mm'),
    }
    setChats([
      ...chats,
      {
        message,
        sender: sender as string,
        time: dayjs(new Date()).format('HH:mm'),
      },
    ])

    ws.send(JSON.stringify(socketMessage))
    reset()
  }

  return (
    <div className="border-[1px] border-slate-300 rounded-md p-2 h-[70vh] relative">
      {chats.length === 0 ? (
        <div className="text-sm text-slate-300 mb-4 text-center h-[80%]">
          No chat history
        </div>
      ) : (
        <div className="h-[80%] overflow-y-auto">
          {chats.map((item, index) => {
            const isSender = item.sender === localStorage.getItem(usernameKey)
            return (
              <div
                key={index}
                className={`flex flex-col mb-3 ${
                  isSender ? 'right-[1rem] items-end' : 'left-[1rem]'
                }`}
              >
                <div
                  className={`text-xs text-slate-400 ${
                    isSender ? 'text-right' : 'text-left'
                  }`}
                >
                  {item.time}
                </div>
                <div className="text-primary font-semibold text-sm">
                  {item.sender}
                </div>
                <div className="text-sm">{item.message}</div>
              </div>
            )
          })}
        </div>
      )}

      <form
        className="flex items-center justify-between gap-2 absolute bottom-[1rem] right-[0.75rem] left-[0.75rem]"
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <textarea
              className="border-slate-300 border-[1px] rounded-md p-2 w-[80%]"
              {...field}
            />
          )}
        />

        <Button type="submit" variant="primary">
          <IconSend />
        </Button>
      </form>
    </div>
  )
}

export default ChatMenu
