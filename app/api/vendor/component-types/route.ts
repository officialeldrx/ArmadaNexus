import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const componentName = searchParams.get('component_name');

        if (!componentName) {
            return NextResponse.json({ error: "Missing component_name query parameter" }, { status: 400 });
        }

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("component_name", componentName)
            .query(`
                SELECT type
                FROM Component_Type
                WHERE component_name = @component_name;
            `);

        return NextResponse.json(result.recordset);
    } catch (error: any) {
        console.error('Error fetching component types:', error);
        return NextResponse.json(
            { error: 'Failed to get components', details: error.message },
            { status: 500 }
        );
    }
}
