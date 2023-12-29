'use client'
import { redirect } from 'next/navigation'
import React, { createContext, useEffect, useState, ReactNode } from 'react'

export interface User {
  id: number
  username: string
  email: string
  fullName: string
  image: string
  token: string
}

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (userData: User) => void
  registerUser: (userData: User) => void
  logout: () => void
  isAlwaysLogged: boolean
  setIsAlwaysLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  login: () => null,
  registerUser: () => null,
  logout: () => null,
  isAlwaysLogged: false,
  setIsAlwaysLogged: () => null,
})

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAlwaysLogged, setIsAlwaysLogged] = useState<boolean>(false)

  const login = (userData: User) => {
    sessionStorage.setItem('currentUser', JSON.stringify(userData))
    const user = JSON.parse(sessionStorage.getItem('currentUser'))
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('currentUser')
  }

  const registerUser = (userData: User) => {
    sessionStorage.setItem('currentUser', JSON.stringify(userData))
    const user = JSON.parse(sessionStorage.getItem('currentUser'))
    setUser(user)
  }

  useEffect(() => {
    if (isAlwaysLogged) {
      const userStringFromStorage = sessionStorage.getItem('currentUser')

      if (userStringFromStorage) {
        const userFromStorage: User = JSON.parse(userStringFromStorage)

        setUser(userFromStorage)

        fetch(`${process.env.BACKEND_API_URL}/renew-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: userFromStorage.token }),
        })
          .then((response) => {
            if (response.ok) {
            } else {
              userFromStorage.token = response.token
              sessionStorage.setItem(
                'currentUser',
                JSON.stringify(userFromStorage)
              )
            }
          })
          .catch((error) => {
            console.error('Error checking token status:', error)
          })
      }
    }
  }, [isAlwaysLogged])

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
      if (currentUser) {
        setUser(currentUser)
      }
    }
  }, [])

  return (
    // Provide the UserContext.Provider with values
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        registerUser,
        isAlwaysLogged,
        setIsAlwaysLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
