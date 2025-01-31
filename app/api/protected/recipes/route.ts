import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const withinWeek = searchParams.get('withinWeek') === 'true';

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

        if (withinWeek) {
            const today = new Date();
            const previousMonday = new Date(today);
            const previousSunday = new Date(today);

            // Go back to previous Sunday
            previousSunday.setDate(today.getDate() - today.getDay());
            previousSunday.setHours(23, 59, 59, 999); // End of Sunday

            // Go back to previous Monday
            previousMonday.setDate(previousSunday.getDate() - 6);
            previousMonday.setHours(0, 0, 0, 0); // Start of Monday

            query = query
                .gte("created_at", previousMonday.toISOString())
                .lte("created_at", previousSunday.toISOString());
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