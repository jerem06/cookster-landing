import { CategorySearchType, DietaryTagType, DifficultyType, UserRecipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";


const fetchUserRecipes = async (
    userId: number,
    category?: CategorySearchType | null,
    difficulty?: DifficultyType | null,
    dietaryTags?: DietaryTagType[],
    toTry?: boolean,
    sortBy?: boolean,
    timeRange?: { min: number; max: number } | null
): Promise<UserRecipe[]> => {
    const params = new URLSearchParams({
        userId: userId.toString(),
        ...(category && { category }),
        ...(difficulty && { difficulty }),
        ...(dietaryTags && { dietaryTags: JSON.stringify(dietaryTags) }),
        ...(toTry !== undefined && { toTry: toTry.toString() }),
        ...(sortBy !== undefined && { sortBy: sortBy.toString() }),
        ...(timeRange && { timeRange: JSON.stringify(timeRange) }),
    });

    const response = await fetch(`/api/protected/user-recipes?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user recipes');
    }

    const data = await response.json();
    return data.recipes;
};

type UseGetUserRecipesParams = {
    userId: number;
    category?: CategorySearchType | null;
    difficulty?: DifficultyType | null;
    dietaryTags?: DietaryTagType[];
    toTry?: boolean;
    sortBy?: boolean;
    initialData?: UserRecipe[];
    timeRange?: { min: number; max: number } | null;
    refetchOnMount?: boolean;
};

export const useGetUserRecipes = ({
    userId,
    category,
    difficulty,
    dietaryTags = [],
    toTry,
    sortBy = true,
    initialData,
    timeRange,
    refetchOnMount = true,
}: UseGetUserRecipesParams) => {
    return useQuery({
        queryKey: [
            "userRecipes",
            userId,
            category,
            difficulty,
            dietaryTags,
            toTry,
            sortBy,
            timeRange,
        ],
        queryFn: () => fetchUserRecipes(
            userId,
            category,
            difficulty,
            dietaryTags,
            toTry,
            sortBy,
            timeRange
        ),
        refetchOnMount,
        initialData,
    });
};
