import { useQuery } from "@tanstack/react-query";
import { Variant } from "@lemonsqueezy/lemonsqueezy.js";


type ProductVariant = Variant['data'] & {
    isCurrentPlan: boolean;
    userIsActive: boolean;
    hasMobileSubscription: boolean;
}

interface ProductsResponse {
    products: ProductVariant[];
    hasMobileSubscription: boolean;
    subscriptionId: string | null;
}

const fetchProducts = async (): Promise<ProductsResponse> => {
    const response = await fetch('/api/protected/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return data;
};

export const useGetProducts = () => {
    return useQuery<ProductsResponse>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
}; 