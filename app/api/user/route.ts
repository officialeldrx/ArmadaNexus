// /app/api/user/route.ts
import { NextResponse } from 'next/server'
import { auth0 } from "@/lib/auth0"
import { getConnection } from "@/lib/db"

export async function GET() {
    const session = await auth0.getSession()

    if (!session?.user?.email) return

    const email = session.user.email
    const displayName = session.user.name || ''
    const picture = session.user.picture

    const pool = await getConnection()
    const result = await pool
        .request()
        .input('email', email)
        .query(`
            SELECT u.display_name, u.dark_mode_enabled, ur.role
            FROM users u
            LEFT JOIN user_roles ur ON u.email = ur.email
            WHERE u.email = @email
        `)

    console.log(result.recordset);

    let userData = {
        email,
        displayName,
        darkModeEnabled: true,
        picture,
        roles: []
    }

    if (result.recordset.length > 0) {
        const roles = result.recordset
            .map(({ role }: { role: string | null }) => role)
            .filter(({ role }: { role: string }) => role !== null)

        const dbUser = result.recordset[0]
        userData = {
            ...userData,
            displayName: dbUser.display_name,
            darkModeEnabled: dbUser.dark_mode_enabled,
            roles: roles,
        }
    } else {
        await pool
            .request()
            .input('email', email)
            .input('display_name', displayName)
            .query(`
                INSERT INTO users (email, display_name, dark_mode_enabled)
                VALUES (@email, @display_name, 1)
            `)
    }

    const response = NextResponse.json(userData)

    response.cookies.set('nx_user', JSON.stringify(userData), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    return response
}
