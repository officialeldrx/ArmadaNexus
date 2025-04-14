import { NextResponse, NextRequest } from 'next/server';
import { getConnection } from "@/lib/db";
import { auth0 } from "@/lib/auth0"
import { Listing } from "@/types"

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

export async function POST(req: NextRequest) {
    const session = await auth0.getSession()
    if (!session?.user?.email) return NextResponse.json({ error: 'No User found' }, { status: 500 });

    try {
        const listing: Listing = await req.json();

        const pool = await getConnection()
        await pool.request()
            .input('vendor_email', session.user.email)
            .input('component_name', listing.component_name)
            .input('types', JSON.stringify(listing.types))
            .input('url', listing.url)
            .query(`
                MERGE listings AS target
                USING (VALUES (@vendor_email, @component_name, @types, @url)) 
                    AS source (vendor_email, component_name, types, url)
                ON target.vendor_email = source.vendor_email 
                AND target.component_name = source.component_name
                WHEN MATCHED THEN
                    UPDATE SET 
                        types = source.types,
                        url = source.url
                WHEN NOT MATCHED THEN
                    INSERT (vendor_email, component_name, types, url)
                    VALUES (source.vendor_email, source.component_name, source.types, source.url);
            `);

        return NextResponse.json({ message: 'Listing added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error inserting listing:', error);
        return NextResponse.json({ error: 'Failed to insert listing', details: error }, { status: 500 });
    }
}
