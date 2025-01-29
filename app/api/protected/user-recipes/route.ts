import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const category = searchParams.get('category');
        const difficulty = searchParams.get('difficulty');
        const dietaryTags = searchParams.get('dietaryTags') ? JSON.parse(searchParams.get('dietaryTags')!) : [];
        const toTry = searchParams.get('toTry') === 'true';
        const sortBy = searchParams.get('sortBy') === 'true';
        const timeRange = searchParams.get('timeRange') ? JSON.parse(searchParams.get('timeRange')!) : null;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const supabase = await createAnonClient();
        let query = supabase
            .from("user_recipe_list")
            .select(`
                *,
                recipe:recipes(
                    *,
                    translations:recipe_translations (
                        title,
                        note,
                        language_code
                    )
                )
            `)
            .eq("user_id", userId);

        if (sortBy) {
            query = query.order("added_at", { ascending: false });
        }

        if (category) {
            if (category === "UNCATEGORIZED") {
                query = query.is("recipe.category", null);
            } else {
                query = query.eq("recipe.category", category);
            }
        }

        if (difficulty) {
            query = query.filter("recipe.difficulty", "eq", difficulty);
        }

        if (dietaryTags.length > 0) {
            query = query.contains("recipe.dietary", dietaryTags);
        }

        if (toTry) {
            query = query.filter("to_try", "eq", toTry);
        }

        if (timeRange) {
            query = query
                .gte("recipe.time", timeRange.min)
                .lte("recipe.time", timeRange.max);
        }

        const { data, error } = await query;

        if (error) throw error;

        const recipes = data
            .filter((userRecipe) => userRecipe.recipe !== null)
            .map((userRecipe) => ({
                ...userRecipe,
                recipe: {
                    ...userRecipe.recipe,
                    translations: userRecipe.recipe.translations.reduce(
                        (acc, translation) => ({
                            ...acc,
                            [translation.language_code]: {
                                title: translation.title,
                                language_code: translation.language_code,
                            },
                        }),
                        {}
                    ),
                },
            }));

        return NextResponse.json({ recipes });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get user recipes', errorMessage: error }, { status: 500 });
    }
} 