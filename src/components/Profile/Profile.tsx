'use client'
import { UserContext } from '@/context/UserContext'
import TonyProfile from '@/public/images/Tony.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useContext, useEffect } from 'react'

const Profile = () => {
  const { currentUser } = useContext(UserContext)
  useEffect(() => {
    const verifyToken = async () => {
      if (currentUser) {
        const payload = {
          token: currentUser.token,
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
          .catch((err) => { })
      }
    }
    verifyToken()
  }, [currentUser])
  return (
    <div className="inline-flex justify-center items-center gap-4 text-slate-100">
      <div className="flex flex-col">
        <p>{currentUser?.fullName || 'Tony Stark'}</p>
        <p className="text-sm">{currentUser?.username || 'IronMan'}</p>
      </div>
      <div className="rounded-full h-12 w-12">
        <Link href={`/we/profile/${currentUser?.username}`}>
          <Image
            className="rounded-full h-12 w-12"
            src={currentUser?.image ? currentUser?.image : TonyProfile}
            alt="Profile picture"
            width={48}
            height={48}
          />
        </Link>
      </div>
    </div>
  )
}

export default Profile
