'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
