
import { User } from "@/app/api/datamodel";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (supabaseId: string): Promise<Partial<User>> => {
    const response = await fetch(`/api/protected/users/${supabaseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data.user;
};

type UseGetUserParams = {
    supabaseId: string;
};

export const useGetUser = ({ supabaseId }: UseGetUserParams) => {
    return useQuery({
        queryKey: ['user', supabaseId],
        queryFn: () => fetchUser(supabaseId),
        enabled: !!supabaseId,
    });
}; 