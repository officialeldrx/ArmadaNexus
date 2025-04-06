import { User, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { auth0 } from "@/lib/auth0"
import StarForge from "@/components/StarForge"
import Nexus from "@/components/Nexus"
import { FaSteam } from 'react-icons/fa';

interface NavItemProps {
    label: string
    href: string
    icon?: React.ReactElement,
    imageSrc?: string
}

const testNavItems: NavItemProps[] = [
    {
        label: "Nexus",
        href: "/",
        icon: Nexus()
    },
    {
        label: "Star Forge",
        href: "https://star-forge.tools/",
        icon: StarForge()
    },
    {
        label: "Tabletop Simulator",
        href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3281524362",
        icon: <FaSteam className="w-5 h-5" />
    }
]

const NavItem = (props: NavItemProps) => {
    return (
        <Link key={props.href} href={props.href} className="flex hover:bg-foreground/10 py-3">
            <div className="min-w-16 flex justify-center items-center">
                {props.imageSrc !== undefined
                    ? <Image src={props.imageSrc} alt={props.imageSrc} width="32" height="32" className="rounded-full" />
                    : props.icon ? props.icon : null
                }
            </div>

            <h1 className="text-nowrap flex pt-[5px] text-2xl">{props.label}</h1>
        </Link>
    )
}

export default async function Navigation() {
    const session = await auth0.getSession()

    return (
        <div className="group">
            <div className="fixed h-screen w-screen z-40 pointer-events-none group-hover:backdrop-blur-sm group-hover:bg-black/20 transition-bg tranisition-backdrop duration-200" />

            <div className="bg-background w-16 z-50 fixed top-0 left-0 h-screen hover:w-80 transition-w duration-200 overflow-hidden flex flex-col py-6">
                {testNavItems.map((navItem) => (
                    NavItem(navItem)
                ))}

                <div className="flex-grow" />

                {NavItem({
                    label: session?.user.name ? session.user.name : "Log in",
                    href: session ? "/user" : "/auth/login",
                    icon: <User className="w-5 h-5" />,
                    imageSrc: session ? session.user.picture : undefined
                })}

                {NavItem({
                    label: "Settings",
                    href: "/settings",
                    icon: <Settings className="w-5 h-5" />
                })}
            </div>
        </div>
    );
}
