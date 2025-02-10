import { Recipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";


const fetchRecipes = async ({ searchTerm, withinWeek }: RecipeSearchParams): Promise<Recipe[]> => {
    const params = new URLSearchParams({
        search: searchTerm ?? '',
        withinWeek: withinWeek?.toString() ?? ''
    });

    const response = await fetch(`/api/protected/recipes?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.recipes;
};


export type RecipeSearchParams = {
    searchTerm?: string;
    withinWeek?: boolean;
}

export const useGetRecipes = ({ searchTerm, withinWeek }: RecipeSearchParams) => {
    return useQuery({
        queryKey: ['recipes', searchTerm, withinWeek],
        queryFn: () => fetchRecipes({ searchTerm, withinWeek }),
    });
}; 