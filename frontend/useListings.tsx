import useSWR from 'swr';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const baseUrl = host + '/';
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const useListings = (path: string | null | undefined) => {
	var url: string | null = baseUrl + path;
	if (path === null || path === undefined) url = null;
	const { data, error, isLoading } = useSWR(url, fetcher);

	return { data, error, isLoading };
};
