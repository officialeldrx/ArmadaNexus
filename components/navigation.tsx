"use client"
import { useState } from "react"
import { User, Settings, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import StarForge from "@/components/StarForge"
import Nexus from "@/components/Nexus"
import { FaSteam } from 'react-icons/fa';
import { SessionData } from "@auth0/nextjs-auth0/types"
import { Button } from "./ui/button"

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

const NavItem = ({ props, onClick }: { props: NavItemProps, onClick: () => void }) => {
    return (
        <Link
            href={props.href}
            onClick={onClick}
            className="flex hover:bg-foreground/10 py-3"
        >
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

export default function Navigation({ session }: { session: SessionData | null }) {
    const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState<boolean>(false)

    return (
        <div className="group">
            <div
                className={
                    `fixed top-0 bottom-0 left-0 right-0 z-30 pointer-events-none transition-bg tranisition-backdrop duration-200
                    group-hover:backdrop-blur-smgroup-hover:bg-black/20
                    ${isMobileNavMenuOpen ? 'backdrop-blur-sm bg-black/20 pointer-events-auto' : ''}
                `}
                onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)}
            />

            <div
                className="hidden fixed right-0 left-0 top-0 pointer-coarse:flex bg-background border h-16 px-3 items-center z-40"
            >
                {isMobileNavMenuOpen
                    ? <X className="w-5 h-5 m-2" onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)} />
                    : <Menu className="w-5 h-5 m-2" onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)} />
                }
            </div>


            <div
                className={
                    `bg-background w-16 z-50 fixed top-0 left-0 bottom-0 transition-w duration-200 overflow-hidden flex flex-col py-6
                    hover:w-80
                    pointer-coarse:-translate-x-80 pointer-coarse:w-80 pointer-coarse:top-16
                    ${isMobileNavMenuOpen ? 'pointer-coarse:translate-x-0' : ''}
                `}
            >
                {testNavItems.map((navItem) => (
                    <NavItem
                        key={navItem.href + navItem.label}
                        props={navItem}
                        onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)}
                    />
                ))}

                <div className="flex-grow" />

                <NavItem
                    props={{
                        label: session?.user.name ? session.user.name : "Log in",
                        href: session ? "/user" : "/auth/login",
                        icon: <User className="w-5 h-5" />,
                        imageSrc: session ? session.user.picture : undefined
                    }}
                    onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)}
                />

                <NavItem
                    props={{
                        label: "Settings",
                        href: "/settings",
                        icon: <Settings className="w-5 h-5" />
                    }}
                    onClick={() => setIsMobileNavMenuOpen(!isMobileNavMenuOpen)}
                />
            </div>
        </div>
    );
}
