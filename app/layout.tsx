import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import { UserProvider } from "@/context/userContext"
import "./globals.css"

export const metadata: Metadata = {
    title: "Armada Nexus",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className="bg-center bg-cover h-screen"
                style={{ backgroundImage: 'url(background.jpg)' }}
            >
                <UserProvider>
                    <Navigation />
                    <div className="ml-16 flex flex-col items-center h-full p-10 pointer-coarse:ml-0 pointer-coarse:pt-24">
                        {children}
                    </div>
                </UserProvider>
            </body>
        </html>
    )
}
