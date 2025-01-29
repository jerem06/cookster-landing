import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { supabaseId: string } }
) {
    try {
        const supabaseId = params.supabaseId;
        const supabase = await createAnonClient();

        const { data, error } = await supabase
            .from("users")
            .select("user_id, user_role")
            .eq("supabase_id", supabaseId)
            .single();

        if (error) throw error;

        return NextResponse.json({ user: data });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get user', errorMessage: error },
            { status: 500 }
        );
    }
} 