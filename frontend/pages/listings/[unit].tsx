import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Unit = () => {
	let allListings = [];
	const [listings, setListings] = useState([]);
	const [amount, setAmount] = useState([]);
	const router = useRouter();
	const { listing } = router.query;

	useEffect(() => {
		if (listing) {
			const data = {
				accm_id: listing,
			};
			console.log(data);

			const endpoint = 'http://127.0.0.1:5000/api/accommodations/units';

			const options = {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: JSON.stringify(data),
			};

			fetch(endpoint, options)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					data.map((accm) => {
						console.log(accm);
						allListings.push();
					});
					setListings(allListings);
					setAmount(allListings.length > 1 ? allListings.length + ' results' : allListings.length + ' result');
				})
				.catch((err) => {
					var noListings = [];
					noListings.push(<div className='col-start-1 row-span-2 p-2'>No results found</div>);
					setListings(noListings);
					setAmount('No results');
				});
			setListings(listings);
		}
	}, [listing]);

	return (
		<Layout>
			<section className='pt-24 pl-20'>
				<div className=''>Title</div>
				<div className=''>Rating</div>
				<div className=''>Reviews</div>
				<div className=''>Pictures</div>
				<div className=''>Summary</div>
				<div className=''>About</div>
				<div className=''>Amenities</div>
				<div className=''>Map</div>
				<div className=''>Reviews</div>

				<h1 className='text-5xl'>
					Listing: {listing}
					<div></div>
				</h1>
			</section>
		</Layout>
	);
};

export default Unit;
