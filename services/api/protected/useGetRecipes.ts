import { Recipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";


type RecipeSearchParams = {
    searchTerm?: string;
    withinWeek?: boolean;
    page?: number;
    pageSize?: number;
}

interface RecipeResponse {
    recipes: Recipe[];
    count: number;
}

const fetchRecipes = async ({ searchTerm, withinWeek, page = 1, pageSize = 12 }: RecipeSearchParams): Promise<RecipeResponse> => {
    const params = new URLSearchParams({
        search: searchTerm ?? '',
        withinWeek: withinWeek?.toString() ?? '',
        page: page.toString(),
        pageSize: pageSize.toString()
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

    return await response.json();
};

export const useGetRecipes = ({ searchTerm, withinWeek, page, pageSize }: RecipeSearchParams) => {
    return useQuery({
        queryKey: ['recipes', searchTerm, withinWeek, page, pageSize],
        queryFn: () => fetchRecipes({ searchTerm, withinWeek, page, pageSize }),
    });
}; 