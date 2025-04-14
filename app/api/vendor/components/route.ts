import { NextResponse, NextRequest } from 'next/server';
import { getConnection } from "@/lib/db";

export async function GET() {
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(`SELECT component_name FROM Component`);

        return NextResponse.json(result.recordset);
    } catch (error) {
        console.error('Error inserting listing:', error);
        return NextResponse.json({ error: 'Failed to get components', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const listing: { component_name: string, types: string[] } = await req.json();

        const componentName = listing.component_name;
        const typesJson = JSON.stringify(listing.types);

        const pool = await getConnection();
        const request = pool.request();

        await request
            .input('component_name', componentName)
            .input('typesJson', typesJson)
            .query(`
                -- Step 1: Ensure the component exists
                IF NOT EXISTS (
                    SELECT 1 FROM Component WHERE component_name = @component_name
                )
                BEGIN
                    INSERT INTO Component (component_name)
                    VALUES (@component_name);
                END

                -- Step 2: Parse types JSON into a temp table
                DECLARE @types TABLE (type NVARCHAR(100));
                INSERT INTO @types (type)
                SELECT value FROM OPENJSON(@typesJson);

                -- Step 3: Remove old types not in new list
                DELETE FROM Component_Type
                WHERE component_name = @component_name
                AND type NOT IN (SELECT type FROM @types);

                -- Step 4: Insert new types
                INSERT INTO Component_Type (component_name, type)
                SELECT @component_name, t.type
                FROM @types t
                WHERE NOT EXISTS (
                    SELECT 1 FROM Component_Type ct
                    WHERE ct.component_name = @component_name
                    AND ct.type = t.type
                );
            `);

        return NextResponse.json({ message: 'Component and types synced successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error inserting component/types:', error);
        return NextResponse.json({ error: 'Failed to sync component and types', details: error }, { status: 500 });
    }
}