import { Recipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";


const fetchRecipes = async (searchTerm: string = '', withinWeek: boolean = false): Promise<Recipe[]> => {
    const params = new URLSearchParams({
        search: searchTerm,
        withinWeek: withinWeek.toString()
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

export const useGetRecipes = (searchTerm: string = '', withinWeek: boolean = false) => {
    return useQuery({
        queryKey: ['recipes', searchTerm, withinWeek],
        queryFn: () => fetchRecipes(searchTerm, withinWeek),
    });
}; 