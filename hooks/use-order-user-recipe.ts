import { CategoryType, UserRecipe } from "@/app/api/datamodel";
import { useMemo } from "react";


type CategorizedRecipes = {
    [K in CategoryType]: UserRecipe[];
} & {
    UNCATEGORIZED: UserRecipe[];
};

export const useRecipeCategories = (data: UserRecipe[]) => {
    const categorizedRecipes = useMemo(() => {
        if (!data) return {} as CategorizedRecipes;

        const initialCategories: CategorizedRecipes = {
            LUNCH: [],
            DESSERT: [],
            BREAKFAST: [],
            BEVERAGE: [],
            SNACK: [],
            BRUNCH: [],
            UNCATEGORIZED: [],
        };

        return data.reduce((acc, recipe) => {
            const category = recipe.recipe.category;
            if (!category) {
                acc.UNCATEGORIZED.push(recipe);
            } else if (category in acc) {
                acc[category].push(recipe);
            }
            return acc;
        }, initialCategories);
    }, [data]);

    return {
        recentRecipes: data,
        ...categorizedRecipes,
    };
};
