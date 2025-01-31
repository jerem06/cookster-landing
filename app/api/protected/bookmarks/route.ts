import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId, recipeId } = await request.json();
        const supabase = await createAnonClient();

        // Check if bookmark exists
        const { data: existingBookmark, error: checkError } = await supabase
            .from("user_recipe_list")
            .select("list_id")
            .eq("user_id", userId)
            .eq("recipe_id", recipeId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }

        if (existingBookmark) {
            // Delete existing bookmark
            const { error: deleteError } = await supabase
                .from("user_recipe_list")
                .delete()
                .eq("user_id", userId)
                .eq("recipe_id", recipeId);

            if (deleteError) throw deleteError;
            return NextResponse.json({ bookmarked: false });
        } else {
            // Create new bookmark
            const { error: insertError } = await supabase
                .from("user_recipe_list")
                .insert([{ user_id: userId, recipe_id: recipeId }]);

            if (insertError) throw insertError;
            return NextResponse.json({ bookmarked: true });
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update bookmark', errorMessage: error },
            { status: 500 }
        );
    }
} 