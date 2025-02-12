import { Article } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";

const fetchArticleById = async (id: string): Promise<Article> => {
    const response = await fetch(`/api/articles/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch article');
    }

    return response.json();
};

type UseGetArticleByIdProps = {
    initialData?: Partial<Article>;
    id?: string | null;
};

export const useGetArticleById = ({
    id,
    initialData,
}: UseGetArticleByIdProps) => {
    const query = useQuery({
        queryKey: ["article", id],
        queryFn: () => {
            if (!id) throw new Error("Article ID is required");
            return fetchArticleById(id);
        },
        initialData,
        enabled: !!id,
    });

    return {
        ...query,
        data: query.data,
    };
}; 