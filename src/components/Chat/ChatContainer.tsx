'use client'
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ChatContext } from '@/context/ChatContext';
import { useContext } from 'react';

const ChatContainer = () => {
  const {open, setOpen} = useContext(ChatContext)
  return (
    <div id="chat-container" className={`${open ? '' : 'hidden'} fixed bottom-16 mb-3 right-4 w-96`}>
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibSold">Chat General</p>
                <button onClick={() => setOpen(!open)} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400 h-8 w-8">
                  <XMarkIcon />
                </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">this example of chat</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">design with tailwind</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
            </div>
            <div className="p-4 border-t flex">
                <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatContainer
