'use client'
import { UserContextProvider } from '@/context/UserContext'
import { ProfileButtons } from './ProfileButtons'
import { useState } from 'react'
import { EditProfileForm } from './EditProfileForm'

export const ProfileActions = ({ user }) => {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <>
      <UserContextProvider>
        <ProfileButtons user={user} setIsEditable={setIsEditable} isEditable={isEditable} />
        {isEditable &&
          <EditProfileForm isEditable={isEditable} setIsEditable={setIsEditable} />
        }

      </UserContextProvider>
    </>
  )
}
