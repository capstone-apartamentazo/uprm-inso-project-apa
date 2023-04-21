import Layout from '@/components/Layout';
import ListingResult from '@/components/ListingResult';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/SearchBar';

const Listings = () => {
	let allListings = [];
	const [listings, setListings] = useState([]);
	const [amount, setAmount] = useState([]);
	const [location, setLocation] = useState([]);

	const router = useRouter();
	const { search } = router.query;

	useEffect(() => {
		if (search) {
			const data = {
				input: search,
				offset: 0,
			};

			const endpoint = 'http://127.0.0.1:5000/api/search';

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
						allListings.push(
							<div key={accm} className='col-start-1 row-span-2 p-2'>
								<ListingResult key={accm} title={accm['Accommodation Title']} address={accm['Street'] + ', ' + accm['City']} features={'2 bed • 2 baths'} description={accm['Description']} price={'$800'} href={''} />{' '}
							</div>
						);
					});
					setListings(allListings);
					setAmount(allListings.length > 1 ? allListings.length + ' results' : allListings.length + ' result');
					setLocation(search);
				})
				.catch((err) => {
					var noListings = [];
					noListings.push(<div className='col-start-1 row-span-2 p-2'>No results found</div>);
					setListings(noListings);
					setAmount('No results');
					setLocation(search);
				});
			setListings(listings);
		}
	}, [search]);

	return (
		<Layout>
			<section className='pt-24 pl-20'>
				<div className='grid grid-cols-2 grid-flow-row gap-4'>
					<div className='row-span-1'>
						<p className='font-bold text-2xl'>
							{amount} for <span className='text-accent'>'{location}'</span>
						</p>
					</div>
					<div className='col-start-1 row-start-2 col-end-2'>
						<SearchBar className='w-full' width='' />
					</div>
					<div className='col-start-2 row-start-2 flex gap-4 overflow-wrap'>
						<select className='select w-24 drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
					</div>
					<div className='col-start-2 row-start-3'>Map here</div>
					{listings}
				</div>
			</section>
		</Layout>
	);
};

export default Listings;
