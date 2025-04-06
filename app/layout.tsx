import type { Metadata } from "next"
import Navigation from "@/components/navigation"
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
                className="bg-center bg-cover "
                style={{ backgroundImage: 'url(background.jpg)' }}
            >
                <Navigation />
                <div className="ml-16 flex flex-col items-center h-screen p-10">
                    {children}
                </div>
            </body>
        </html>
    )
}