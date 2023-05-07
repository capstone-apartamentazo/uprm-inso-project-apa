import Layout from '@/components/Layout';
import ListingResult from '@/components/ListingResult';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';
import getConfig from 'next/config';
import { FaSearchengin } from 'react-icons/fa';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Listings = () => {
	let allListings: any = [];
	const [listings, setListings] = useState<any | null>(null);
	const [amount, setAmount] = useState<any | null>(null);
	const [location, setLocation] = useState<any | null>(null);

	const router = useRouter();
	const { search, filter, amenities } = router.query;

	useEffect(() => {
		if (search && filter === 'false') {
			const endpoint = `${host}/api/search?input=${search}&offset=0`;

			const options = {
				method: 'GET',
				headers: new Headers({ 'content-type': 'application/json' }),
			};

			fetch(endpoint, options)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					allListings = []
					console.log('results');
					console.log(data);
					data.map((accm: any, i: any) => {
						allListings.push(
							<div key={i} className='col-start-1 row-span-2 p-2'>
								<ListingResult key={i} title={accm.accm_title} address={accm.accm_street + ', ' + accm.accm_city} description={accm.accm_description} unitAmount={accm.accm_units.length} id={accm.accm_id} accmUnits={accm.accm_units} />
							</div>
						);
					});
					setListings(allListings);
					setAmount(allListings.length > 1 ? allListings.length + ' results' : allListings.length + ' result');
					setLocation(search);
				})
				.catch((err) => {
					var noListings: any = [];
					noListings.push(<div key={0} className='col-start-1 row-span-2 p-2'>No results found</div>);
					setListings(noListings);
					setAmount('No results');
					setLocation(search);
				})
		}
		if (search && filter) {
			const endpoint = `${host}/api/filter/amenities?input=${search}&offset=0`;

			const options = {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: (amenities as string)
			};
			fetch(endpoint, options)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				allListings = []
				console.log('results');
				console.log(data);
				data.map((accm: any, i: any) => {
					allListings.push(
						<div key={i} className='col-start-1 row-span-2 p-2'>
							<ListingResult key={i} title={accm.accm_title} address={accm.accm_street + ', ' + accm.accm_city} description={accm.accm_description} unitAmount={accm.accm_units.length} id={accm.accm_id} accmUnits={accm.accm_units} />
						</div>
					);
				});
				setListings(allListings);
				setAmount(allListings.length > 1 ? allListings.length + ' results' : allListings.length + ' result');
				setLocation(search);
			})
			.catch((err) => {
				var noListings: any = [];
				noListings.push(<div key={0} className='col-start-1 row-span-2 p-2'>No results found</div>);
				setListings(noListings);
				setAmount('No results');
				setLocation(search);
			})
		}
	}, [search, filter, amenities]);

	return (
		<Layout>
			<section className='pt-24 pl-20 bg-gray-50 min-h-screen'>
				<div className='grid grid-cols-2 grid-flow-row gap-4'>
					<div className='row-span-1'>
						<p className='font-bold text-2xl'>
							{amount} for <span className='text-accent'>'{location}'</span>
						</p>
					</div>
					<div className='col-start-1 row-start-2 col-end-2'>
						<SearchBar className='w-full' width='' />
					</div>
					{listings}
					<div className='col-start-1 row-start-3 flex justify-center'>
						<Filter className='w-full'></Filter>
					</div>
					<div className='col-start-2 row-start-4'>Map here</div>
				</div>
			</section>
		</Layout>
	);
};

export default Listings;
