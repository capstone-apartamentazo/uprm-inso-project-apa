import { useRouter } from 'next/router';

const Listing = () => {
	const router = useRouter();
	const { listing } = router.query;

	return <p>Listing: {listing}</p>;
};

export default Listing;
