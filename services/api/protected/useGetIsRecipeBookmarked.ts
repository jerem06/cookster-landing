import { useQuery } from "@tanstack/react-query";

type UseGetIsRecipeBookmarkedParams = {
    userId: number;
    recipeId: string;

};

const fetchIsRecipeBookmarked = async (userId: number, recipeId: string): Promise<boolean> => {
    const response = await fetch(`/api/protected/is-recipe-bookmarked?userId=${userId}&recipeId=${recipeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errorMessage || 'Failed to fetch bookmark status');
    }

    const data = await response.json();
    return data.bookmarked;
};

export const useGetIsRecipeBookmarked = ({
    userId,
    recipeId,
}: UseGetIsRecipeBookmarkedParams) => {
    return useQuery({
        queryKey: ["isRecipeBookmarked", userId, recipeId],
        queryFn: () => fetchIsRecipeBookmarked(userId, recipeId),
        enabled: !!userId && !!recipeId
    });
}; 