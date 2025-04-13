import { NextResponse, type NextRequest } from "next/server"
import { auth0 } from "@/lib/auth0"

export async function middleware(request: NextRequest) {
    const response = await auth0.middleware(request)
    const url = new URL(request.url)

    if (url.pathname === "/auth/logout") {
        response.cookies.set("nx_user", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0),
        })
    }

    return response
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}
