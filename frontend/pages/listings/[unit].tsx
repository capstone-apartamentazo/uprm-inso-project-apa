import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Unit = () => {
	let allUnits = [];
	const [units, setUnits] = useState([]);
	const [amount, setAmount] = useState([]);
	const router = useRouter();
	const { unit } = router.query;

	useEffect(() => {
		if (unit) {
			const data = {
				accm_id: unit,
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
						allUnits.push();
					});
					setListings(allUnits);
					setAmount(allUnits.length > 1 ? allUnits.length + ' results' : allUnits.length + ' result');
				})
				.catch((err) => {
					var noListings = [];
					noListings.push(<div className='col-start-1 row-span-2 p-2'>No results found</div>);
					setUnits(noListings);
					setAmount('No results');
				});
			setUnits(units);
		}
	}, [unit]);

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
					Listing: {unit}
					<div></div>
				</h1>
			</section>
		</Layout>
	);
};

export default Unit;
