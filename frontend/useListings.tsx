import useSWR from 'swr';

const baseUrl2 = 'https://api.apartamentazo.com/api/';
const baseUrl = 'http://127.0.0.1:5000/api/';
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const useListings = (path: string | null | undefined) => {
	var url: string | null = baseUrl + path;
	if (path === null || path === undefined) url = null;
	const { data, error, isLoading } = useSWR(url, fetcher);

	return { data, error, isLoading };
};
