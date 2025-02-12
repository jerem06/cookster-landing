import { createAnonClient } from "@/lib/supabase/serverAnon";
import { NextResponse } from "next/server";
import { ArticleCategoryTranslation, ArticleTranslation } from "../../datamodel";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createAnonClient();
        const { data, error } = await supabase
            .from("articles")
            .select(`
                *,
                translations:article_translations (
                    title,
                    content,
                    language_code,
                    meta_description,
                    meta_title
                    ),
                    categories:article_categories (
                        id,
                        category_order,
                        translations:article_categories_translations (
                            name,
                            description,
                            language_code
                            )
                            )`)
            .eq("id", id)
            .single();



        if (error) throw error;

        const article = {
            ...data,
            translations: data.translations.reduce(
                (acc: Record<string, ArticleTranslation>, translation: ArticleTranslation) => ({
                    ...acc,
                    [translation.language_code]: translation,
                }),
                {}
            ),
            categories: data.categories?.map(category => ({
                ...category,
                translations: category.translations.reduce(
                    (acc: Record<string, ArticleCategoryTranslation>, translation: ArticleCategoryTranslation) => ({
                        ...acc,
                        [translation.language_code]: translation,
                    }),
                    {}
                ),
            })),
        };

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get article', errorMessage: error },
            { status: 500 }
        );
    }
} 