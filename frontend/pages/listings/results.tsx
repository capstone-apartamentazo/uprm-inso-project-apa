import Layout from '@/components/Layout';
import ListingResult from '@/components/ListingResult';
import React, { useState, useEffect } from 'react';
import { useListings } from '../../useListings';
import { useRouter } from 'next/router';

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
					console.log('Something went wrong!');
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
					<div className='relative col-start-1 row-start-2'>
						<input type='text' id='simple-search' className='bg-gray-50 bg-opacity-50 border border-accent text-gray-900 text-sm rounded-full focus:ring-accent focus:border-accent block w-full pl-5 p-2.5 ' placeholder='Search for a location...' required />
						<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
							<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20'>
								<path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
							</svg>
						</div>
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
