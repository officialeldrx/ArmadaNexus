import Image from "next/image"
import { auth0 } from "@/lib/auth0"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function User() {
    const session = await auth0.getSession()

    return (
        <div className="max-w-128 mx-auto flex flex-col gap-2">
            <a href="/auth/logout">
                <Button>Logout</Button>
            </a>
        </div>
    )
}