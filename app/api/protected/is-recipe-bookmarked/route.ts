import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/serverAnon";


export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('userId');
        const recipeId = searchParams.get('recipeId');
        const supabase = await createAnonClient();

        if (!userId || !recipeId) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("user_recipe_list")
            .select("list_id")
            .eq("user_id", userId)
            .eq("recipe_id", recipeId)
            .single();

        if (error && error.code !== "PGRST116") {
            // PGRST116 is the error code for no rows returned
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ bookmarked: !!data });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error', errorMessage: error },
            { status: 500 }
        );
    }
} 