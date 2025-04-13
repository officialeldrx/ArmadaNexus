import { NextResponse } from 'next/server';
import { getConnection } from "@/lib/db";
import { auth0 } from "@/lib/auth0"

export async function GET() {
    const session = await auth0.getSession()
    if (!session?.user?.email) return NextResponse.json({ error: 'No User found' }, { status: 500 });

    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .input('email', session.user.email)
            .query(`select component_name, types, url from listings where vendor_email = @email`);

        return NextResponse.json(result.recordset);
    } catch (error) {
        console.error('Error inserting listing:', error);
        return NextResponse.json({ error: 'Failed to get components', details: error }, { status: 500 });
    }
}
