import useSWR from 'swr';

const baseUrl = 'https://api.apartamentazo.com/api/';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useListings = (path, name) => {
	if (!path) {
		throw new Error('Path is required');
	}
	const url = name ? baseUrl + path + '/' + name : baseUrl + path;
	const { data, error, isLoading } = useSWR(url, fetcher);

	return { data, error, isLoading };
};
