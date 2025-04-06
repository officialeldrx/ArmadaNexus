import Image from "next/image"

export default async function Home() {
    return (
        <div className="h-full flex flex-col justify-center">
            <Image src="/logo-full.svg" alt="Armada Nexus Logo" width="500" height="300" />
        </div>
    )
}