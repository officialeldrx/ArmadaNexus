import Image from "next/image"

export default function Home() {
    return (
        <>
            <div
                style={{ backgroundImage: 'url(background.jpg)' }}
                className="w-screen h-screen bg-cover bg-center flex flex-col p-10"
            >
                <Image src="/logo-full.svg" alt="Armada Nexus Logo" width="500" height="300" className="m-auto" />
            </div>
        </>
    )
}