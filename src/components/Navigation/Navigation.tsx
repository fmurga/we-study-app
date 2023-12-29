'use client'
import Logo from '@/components/Logo/Logo'
import NavLinks from '@/components/NavLinks/NavLinks'
import Notifications from '@/components/Notifications/Notifications'
import SearchBar from '@/components/SearchBar/SearchBar'
import dynamic from 'next/dynamic'
const Profile = dynamic(() => import('@/components/Profile/Profile'), {
  ssr: true,
})

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Clases', href: '#', current: false },
  { name: 'Materiales', href: '#', current: false },
  { name: 'Calendario', href: '#', current: false },
]

const Navigation = () => {
  return (
    <nav className="flex-no-wrap fixed top-0 flex w-full flex-row justify-between items-center h-20 px-20 bg-gray-900">
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
  )
}

export default Navigation
