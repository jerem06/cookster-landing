import { Recipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";


const fetchRecipes = async (searchTerm: string = ''): Promise<Recipe[]> => {
    const response = await fetch(`/api/protected/recipes?search=${encodeURIComponent(searchTerm)}`, {
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

export const useGetRecipes = (searchTerm: string = '') => {
    return useQuery({
        queryKey: ['recipes', searchTerm],
        queryFn: () => fetchRecipes(searchTerm),
    });
}; 