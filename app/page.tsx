import Image from "next/image"
import { auth0 } from "@/lib/auth0"

export default async function Home() {
    const session = await auth0.getSession()

    return (
        <>
            <div
                style={{ backgroundImage: 'url(background.jpg)' }}
                className="w-screen h-screen bg-cover bg-center flex flex-col p-10 justify-center items-center gap-4"
            >
                <Image src="/logo-full.svg" alt="Armada Nexus Logo" width="500" height="300" />
                <h1 className="text-white text-4xl">{session ? session.user.name : 'Please Log In'}</h1>
            </div>
        </>
    )
}