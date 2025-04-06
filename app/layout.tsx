import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import { auth0 } from "@/lib/auth0"
import "./globals.css"

export const metadata: Metadata = {
    title: "Armada Nexus",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth0.getSession()

    return (
        <html lang="en" className="dark">
            <body
                className="bg-center bg-cover h-screen"
                style={{ backgroundImage: 'url(background.jpg)' }}
            >
                <Navigation session={session} />
                <div className="ml-16 flex flex-col items-center h-full p-10 pointer-coarse:ml-0 pointer-coarse:pt-24">
                    {children}
                </div>
            </body>
        </html>
    )
}