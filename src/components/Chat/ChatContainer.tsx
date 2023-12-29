'use client'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { ChatContext } from '@/context/ChatContext'
import { useContext, useEffect, useState } from 'react'
import { connectToServer } from '@/utils/socket'
import { UserContext } from '@/context/UserContext'
import { Socket } from 'socket.io'

interface Message {
  fullName: string
  message: string
}

const ChatContainer = () => {
  const { open, setOpen } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const [socket, setSocket] = useState<Socket>()
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (user && open) {
      setSocket(connectToServer(user?.token))
    }
  }, [user, open])

  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', (message) => {
        setMessages([...messages, message])
      })
    }
  }, [messages, socket])

  const sendMessage = () => {
    if (socket) {
      socket.emit('message-from-client', {
        message: inputValue,
      })
      setInputValue('')
    }
  }

  return (
    <div
      id="chat-container"
      className={`${open ? '' : 'hidden'} fixed bottom-16 mb-3 right-4 w-96`}
    >
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-lg font-semibSold">Chat General</p>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400 h-8 w-8"
          >
            <XMarkIcon />
          </button>
        </div>
        <div id="messages-ul" className="p-4 h-80 overflow-y-auto">
          {messages &&
            messages.map((message, index) =>
              message.fullName === user?.fullName ? (
                <div className="mb-2 text-right" key={index}>
                  <p className="text-black text-xs mr-1">{message.fullName}</p>
                  <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                    {message.message}
                  </p>
                </div>
              ) : (
                <div className="mb-2" key={index}>
                  <p className="text-black text-xs mr-1">{message.fullName}</p>
                  <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                    {message.message}
                  </p>
                </div>
              )
            )}
        </div>
        <div className="p-4 border-t flex" id="message-form">
          <input
            id="message-input"
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            autoSave="false"
            autoComplete="false"
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            id="send-button"
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
