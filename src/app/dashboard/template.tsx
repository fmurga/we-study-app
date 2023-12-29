'use client'
import Chat from '@/components/Chat/Chat'
import Navigation from '@/components/Navigation/Navigation'
import { UserContextProvider } from '@/context/UserContext'
import { redirect } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useLayoutEffect(() => {
    const user = sessionStorage.getItem('currentUser')
    if (!user) {
      redirect('/auth/login')
    }
  }, [])

  return (
    <main className="my-36">
      <UserContextProvider>
        <Navigation />
        {children}
        <Chat />
      </UserContextProvider>
    </main>
  )
}
