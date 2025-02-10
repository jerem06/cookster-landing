import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    console.log("GET request received");
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const withinWeek = searchParams.get('withinWeek') === 'true';
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '12');

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
            .eq('public', true)
            .range((page - 1) * pageSize, page * pageSize - 1);

        if (search) {
            query = query.ilike("recipe_translations.title", `%${search}%`);
        }

        if (withinWeek) {
            /*  const today = new Date();
 
             // Get last Sunday (end of previous week)
             const lastSunday = new Date(today);
             lastSunday.setDate(today.getDate() - today.getDay() - 1);
             lastSunday.setHours(23, 59, 59, 999); // End of day
 
             // Get last Monday (start of previous week)
             const lastMonday = new Date(lastSunday);
             lastMonday.setDate(lastSunday.getDate() - 6);
             lastMonday.setHours(0, 0, 0, 0); // Start of day
 
 
             query = query
                 .gte("created_at", lastMonday.toISOString())
                 .lte("created_at", lastSunday.toISOString()); */
            query = query.order("created_at", { ascending: false })

            query = query.limit(3);


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