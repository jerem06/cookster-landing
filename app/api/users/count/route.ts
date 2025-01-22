import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const { count, error } = await supabase
            .from("users")
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        return NextResponse.json({ count });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get user count', errorMessage: error }, { status: 500 });
    }
}