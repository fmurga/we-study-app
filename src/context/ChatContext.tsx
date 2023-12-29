'use client'
import socket, { conectToSocket } from '@/utils/socket'
import React, {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from 'react'

export const ChatContext = createContext({
  open: false,
  setOpen: React.Dispatch<React.SetStateAction<string | null>>,
})

export const ChatProvider: React.FC = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <ChatContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatContext.Provider>
  )
}
