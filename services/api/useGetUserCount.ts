import { useQuery } from "@tanstack/react-query";

const fetchUserCount = async () => {
    const response = await fetch('/api/users/count', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user count');
    }

    const data = await response.json();
    return data.count;
};

export const useGetUserCount = () => {
    return useQuery({
        queryKey: ['userCount'],
        queryFn: fetchUserCount,
    });
};
