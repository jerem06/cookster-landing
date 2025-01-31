import { useQueryClient, useMutation } from "@tanstack/react-query";

type UpdateBookmarkParams = {
    userId: number;
    recipeId: string;
};

const toggleBookmark = async ({ userId, recipeId }: UpdateBookmarkParams): Promise<boolean> => {
    const response = await fetch('/api/protected/bookmarks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, recipeId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errorMessage || 'Failed to update bookmark');
    }

    const data = await response.json();
    return data.bookmarked;
};

export const useUpdateBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleBookmark,
        onSuccess: (_, variables) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({
                queryKey: ["isRecipeBookmarked", variables.userId, variables.recipeId],
            });
            queryClient.invalidateQueries({
                queryKey: ["userRecipes", variables.userId],
            });
            /* queryClient.invalidateQueries({
                queryKey: ["profile-recipe-numbers", variables.userId],
            }); */
        },
    });
}; 