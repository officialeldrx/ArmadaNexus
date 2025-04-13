'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { SessionData } from '@auth0/nextjs-auth0/types'

interface User {
    email: string
    displayName: string
    darkModeEnabled: boolean
    picture: string | undefined
    roles: string[] | null
}

interface UserContextValue {
    user: User | null
    loading: boolean
}

const UserContext = createContext<UserContextValue>({
    user: null,
    loading: true,
})

export const useUser = (): UserContextValue => useContext(UserContext)

export const UserProvider = ({ children, session }: { children: React.ReactNode, session: SessionData | null }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session) {
            document.cookie = "nx_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        const cookieUser = (() => {
            try {
                const raw = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('nx_user='))
                    ?.split('=')[1]
                return raw ? JSON.parse(decodeURIComponent(raw)) : null
            } catch {
                return null
            }
        })()

        if (cookieUser) {
            setUser(cookieUser)
            setLoading(false)
        } else {
            fetch('/api/user')
                .then(res => res.json())
                .then(data => setUser(data))
                .finally(() => setLoading(false))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}
