'use client'
import { UserContext } from '@/context/UserContext'
import TonyProfile from '@/public/images/Tony.jpg'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useContext, useEffect } from 'react'

const Profile = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    const verifyToken = async () => {
      if (user) {
        const payload = {
          token: user.token,
        }
        await fetch(`${process.env.BACKEND_API_URL}/auth/check-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          next: { revalidate: 300 },
        })
          .then((result) => {
            if (result.status === 401) {
              sessionStorage.removeItem('currentUser')
              redirect('/auth/login')
            }
          })
          .catch((err) => {})
      }
    }
    verifyToken()
  }, [user])
  return (
    <div className="inline-flex justify-center items-center gap-4">
      <div className="flex flex-col">
        <p>{user?.fullName || 'Tony Stark'}</p>
        <p className="text-sm">{user?.username || 'IronMan'}</p>
      </div>
      <div className="rounded-full h-12 w-12">
        <Image
          className="rounded-full h-12 w-12"
          src={user?.image || TonyProfile}
          alt="Profile picture"
          width={48}
          height={48}
        />
      </div>
    </div>
  )
}

export default Profile
