import { NextResponse } from 'next/server';
import { getConnection } from "@/lib/db";

export async function GET() {
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(`SELECT type FROM ComponentType`);

        return NextResponse.json(result.recordset);
    } catch (error) {
        console.error('Error getting types:', error);
        return NextResponse.json({ error: 'Failed to get types', details: error }, { status: 500 });
    }
}