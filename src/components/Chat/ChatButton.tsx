'use client'
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid"
import { ChatContext } from "@/context/ChatContext"
import { useContext } from "react"


const ChatButton = () => {
  const {setOpen, open} = useContext(ChatContext)
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <button onClick={() => setOpen(!open)} id="open-chat" className="bg-blue-700 h-12 w-12 text-white p-1 rounded-full hover:bg-blue-500 transition duration-300 flex items-center">
        <div className="h-4/5 w-4/5 m-auto">
          <ChatBubbleLeftIcon />
        </div>
      </button>
    </div>
  )
}

export default ChatButton
