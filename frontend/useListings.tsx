import useSWR from 'swr';

const baseUrl2 = 'https://api.apartamentazo.com/api/';
const baseUrl = 'http://127.0.0.1:5000/api/';
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const useListings = (path: string) => {
	if (!path) {
		throw new Error('Path is required');
	}
	const url = baseUrl + path;
	const { data, error, isLoading } = useSWR(url, fetcher);

	return { data, error, isLoading };
};
