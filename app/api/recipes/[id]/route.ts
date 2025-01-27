import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Recipe, RecipeTranslation, Ingredient, RecipeStep, Equipment, RecipeStepTranslation } from "@/app/api/datamodel";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("recipes")
            .select(`
                *,
                translations:recipe_translations (
                    title,
                    language_code,
                    note
                ),
                ingredients:recipe_ingredient (
                    quantity,
                    unit,
                    ingredient:ingredients (
                        *,
                        translations:ingredient_translation (
                            name,
                            language_code
                        )
                    )
                ),
                recipe_steps:recipe_step (
                    *,
                    translations:recipe_step_translation (
                        instructions,
                        language_code
                    ),
                    step_ingredients:recipe_step_ingredient (
                        quantity,
                        unit,
                        ingredient:ingredients (
                            *,
                            translations:ingredient_translation (
                                name,
                                language_code
                            )
                        )
                    )
                ),
                equipments:recipe_equipment (
                    equipment:equipment(
                        equipment_id,
                        image_url,
                        equipment_url,
                        translations:equipment_translation (
                            name,
                            language_code
                        )
                    )
                )
            `)
            .eq("recipe_id", params.id)
            .single();

        if (error) throw error;

        const recipe: Recipe = {
            ...data,
            translations: data.translations.reduce(
                (acc: Record<string, RecipeTranslation>, translation: RecipeTranslation) => ({
                    ...acc,
                    [translation.language_code]: {
                        title: translation.title,
                        note: translation.note,
                        language_code: translation.language_code,
                    },
                }),
                {}
            ),
            ingredients: data.ingredients.map((ri): Ingredient => ({
                ingredient_id: ri.ingredient.ingredient_id,
                category: ri.ingredient.category,
                image_url: ri.ingredient.image_url,
                conversion_factor: ri.ingredient.conversion_factor,
                translations: ri.ingredient.translations.reduce(
                    (acc: Record<string, { name: string; language_code: string }>, trans: {
                        language_code: string;
                        name: string;
                    }) => ({
                        ...acc,
                        [trans.language_code]: {
                            name: trans.name,
                            language_code: trans.language_code,
                        },
                    }),
                    {}
                ),
                quantity: ri.quantity,
                unit: ri.unit,
            })),
            recipe_steps: data.recipe_steps.map((rs): RecipeStep => {
                const { step_ingredients, ...restStepData } = rs;
                return {
                    ...restStepData,
                    translations: rs.translations.reduce(
                        (acc: Record<string, RecipeStepTranslation>, trans: RecipeStepTranslation) => ({
                            ...acc,
                            [trans.language_code]: {
                                instructions: trans.instructions,
                                language_code: trans.language_code,
                            },
                        }),
                        {}
                    ),
                    ingredients: step_ingredients.map((si): Ingredient => ({
                        ingredient_id: si.ingredient.ingredient_id,
                        category: si.ingredient.category,
                        image_url: si.ingredient.image_url,
                        conversion_factor: si.ingredient.conversion_factor,
                        translations: si.ingredient.translations.reduce(
                            (acc: Record<string, { name: string; language_code: string }>, trans: {
                                language_code: string;
                                name: string;
                            }) => ({
                                ...acc,
                                [trans.language_code]: {
                                    name: trans.name,
                                    language_code: trans.language_code,
                                },
                            }),
                            {}
                        ),
                        quantity: si.quantity,
                        unit: si.unit,
                    })),
                };
            }),
            equipments: data.equipments.map((re): Equipment => ({
                equipment_url: re.equipment.equipment_url,
                image_url: re.equipment.image_url,
                equipment_id: re.equipment.equipment_id,
                translations: re.equipment.translations.reduce(
                    (acc: Record<string, { name: string; language_code: string }>, trans: {
                        language_code: string;
                        name: string;
                    }) => ({
                        ...acc,
                        [trans.language_code]: {
                            name: trans.name,
                            language_code: trans.language_code,
                        },
                    }),
                    {}
                ),
            })),
        };

        return NextResponse.json(recipe);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get recipe', errorMessage: error },
            { status: 500 }
        );
    }
} 