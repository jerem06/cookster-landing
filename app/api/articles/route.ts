import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    console.log("GET articles request received");
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const withinWeek = searchParams.get('withinWeek') === 'true';
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '12');

        const supabase = await createAnonClient();

        let query = supabase
            .from("articles")
            .select(`
                *,
                translations:article_translations!inner (
                    title,
                    content,
                    language_code,
                    meta_description,
                    meta_title
                )
            `, { count: 'exact' })
            .eq('public', true)
            .range((page - 1) * pageSize, page * pageSize - 1);

        if (search) {
            query = query.ilike("article_translations.title", `%${search}%`);
        }

        if (withinWeek) {
            query = query.order("created_at", { ascending: false })
            query = query.limit(3);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        const articles = data.map((article) => ({
            ...article,
            translations: article.translations.reduce(
                (acc: Record<string, { title: string; language_code: string }>, translation: {
                    language_code: string;
                    title: string;
                    content: string;
                    meta_description: string;
                    meta_title: string;
                }) => ({
                    ...acc,
                    [translation.language_code]: {
                        title: translation.title,
                        language_code: translation.language_code,
                        content: translation.content,
                        meta_description: translation.meta_description,
                        meta_title: translation.meta_title,
                    },
                }),
                {}
            ),
        }));

        return NextResponse.json({ articles, count: count || 0 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get articles', errorMessage: error }, { status: 500 });
    }
} 