import { Article } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";

type ArticleSearchParams = {
    searchTerm?: string;
    withinWeek?: boolean;
    page?: number;
    pageSize?: number;
}

interface ArticleResponse {
    articles: Article[];
    count: number;
}

const fetchArticles = async ({ searchTerm, withinWeek, page = 1, pageSize = 12 }: ArticleSearchParams): Promise<ArticleResponse> => {
    const params = new URLSearchParams({
        search: searchTerm ?? '',
        withinWeek: withinWeek?.toString() ?? '',
        page: page.toString(),
        pageSize: pageSize.toString()
    });

    const response = await fetch(`/api/articles?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }

    return await response.json();
};

export const useGetArticles = ({ searchTerm, withinWeek, page, pageSize }: ArticleSearchParams) => {
    return useQuery({
        queryKey: ['articles', searchTerm, withinWeek, page, pageSize],
        queryFn: () => fetchArticles({ searchTerm, withinWeek, page, pageSize }),
    });
};
