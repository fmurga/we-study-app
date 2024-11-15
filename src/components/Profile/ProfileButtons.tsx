'use client'
import { useContext } from 'react'
import CustomButton from '../Buttons/CustomButton'
import { ChatBubbleLeftIcon, PencilIcon } from '@heroicons/react/20/solid'
import { UserContext } from '@/context/UserContext'

export const ProfileButtons = ({ user, setIsEditable, isEditable }) => {
  const { currentUser } = useContext(UserContext)
  return (
    <>
      {currentUser?.username === user && (
        <CustomButton
          classNames="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transition duration-200"
          onClick={() => setIsEditable(!isEditable)}
        >
          <PencilIcon className="h-5 w-5 inline mr-2" /> Edit Profile
        </CustomButton>
      )}
      {currentUser?.username !== user && (
        <CustomButton
          classNames="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transition duration-200"
          onClick={() => console.log('hi')}
        >
          <ChatBubbleLeftIcon className="h-5 w-5 inline mr-2" /> Message
        </CustomButton>
      )}
    </>
  )
}

