'use client'
import Logo from '@/components/Logo/Logo'
import NavLinks from '@/components/NavLinks/NavLinks'
import Notifications from '@/components/Notifications/Notifications'
import SearchBar from '@/components/SearchBar/SearchBar'
import { UserContextProvider } from '@/context/UserContext'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import { useLayoutEffect } from 'react'
const Profile = dynamic(() => import('@/components/Profile/Profile'), {
  ssr: true,
})

const navigation = [
  { name: 'Dashboard', href: '/we/dashboard', current: true },
  { name: 'Clases', href: '/we/lessons', current: false },
  { name: 'Materiales', href: '/we/materials', current: false },
  { name: 'Calendario', href: '/we/calendar', current: false },
]

const Navigation = () => {
  return (
    <UserContextProvider>
      <nav className="flex-no-wrap fixed top-0 flex w-full flex-row justify-between items-center h-20 px-20 bg-gray-900 z-10">
        <Logo />
        <div className="flex flex-row gap-3 items-center">
          <NavLinks links={navigation} />
          <SearchBar />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Notifications />
          <Profile />
        </div>
      </nav>
    </UserContextProvider>
  )
}

export default Navigation
