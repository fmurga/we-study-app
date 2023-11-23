'use client'
import { ChatProvider } from "@/context/ChatContext"
import ChatButton from "./ChatButton"
import ChatContainer from "./ChatContainer"

const Chat = () => {
  return (
    <>
      <ChatProvider>
        <ChatButton />
        <ChatContainer />
      </ChatProvider>
    </>
  )
}

export default Chat
