
import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';

        const supabase = await createAnonClient();
        let query = supabase
            .from("recipes")
            .select(`
                *,
                translations:recipe_translations!inner (
                    title,
                    language_code
                )
            `, { count: 'exact' })
            .eq('public', true);

        if (search) {
            query = query.ilike("recipe_translations.title", `%${search}%`);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        const recipes = data.map((recipe) => ({
            ...recipe,
            translations: recipe.translations.reduce(
                (acc: Record<string, { title: string; language_code: string }>, translation: {
                    language_code: string;
                    title: string;
                }) => ({
                    ...acc,
                    [translation.language_code]: {
                        title: translation.title,
                        language_code: translation.language_code,
                    },
                }),
                {}
            ),
        }));

        return NextResponse.json({ recipes, count: count || 0 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get recipes', errorMessage: error }, { status: 500 });
    }
} 