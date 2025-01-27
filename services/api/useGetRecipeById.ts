import { Recipe } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";

const fetchRecipeById = async (id: string): Promise<Recipe> => {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }

    return response.json();
};

type UseGetRecipeByIdProps = {
    initialData?: Partial<Recipe>;
    id?: string | null;
};

export const useGetRecipeById = ({
    id,
    initialData,
}: UseGetRecipeByIdProps) => {
    const query = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => {
            if (!id) throw new Error("Recipe ID is required");
            return fetchRecipeById(id);
        },
        initialData,
        enabled: !!id,
    });

    return {
        ...query,
        data: query.data,
    };
}; 