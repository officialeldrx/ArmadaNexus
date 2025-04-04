import type { Metadata } from "next"
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
        <html lang="en" className="bg-black">
            <body>
                {children}
            </body>
        </html>
    )
}
