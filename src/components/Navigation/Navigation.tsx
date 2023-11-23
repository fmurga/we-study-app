import Logo from "@/components/Logo/Logo"
import NavLinks from "@/components/NavLinks/NavLinks"
import Notifications from "@/components/Notifications/Notifications"
import Profile from "@/components/Profile/Profile"
import SearchBar from "@/components/SearchBar/SearchBar"

const navigation = [
  { name: 'Autogestión', href: '#', current: true },
  { name: 'Archivos', href: '#', current: false },
  { name: 'Foros', href: '#', current: false },
  { name: 'Calendario', href: '#', current: false },
]

const Navigation = () => {
  return (
   <nav className="flex-no-wrap fixed top-0 flex w-full flex-row justify-between items-center h-20 px-20 bg-gray-900">
    <Logo />
    <div className="flex flex-row gap-3 items-center">
      <NavLinks links={navigation}/>
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
