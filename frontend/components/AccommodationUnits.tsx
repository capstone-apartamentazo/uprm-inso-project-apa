import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const unit = {
	amenities: 'water, balcony, electricity',
	description: 'Test Description',
	number: '2',
	price: '400',
	available: 'Available',
};

const AccommodationUnits = ({ accm_id }) => {
	let allUnits = [];
	const [units, setUnits] = useState([]);
	const [amount, setAmount] = useState([]);

	useEffect(() => {
		if (accm_id) {
			const data = {
				accm_id: accm_id,
			};

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
						allUnits.push(
							<tr>
								<td>
									<div className='flex items-center space-x-3'>
										<div>
											<div className='font-bold'>Unit {accm['Unit Number']}</div>
											<div className='text-sm opacity-50'>{accm['Available'] ? 'Available' : 'Unavailable'}</div>
										</div>
									</div>
								</td>
								<td>
									{unit.description}
									<br />
									<span className='badge badge-ghost badge-sm'>{unit.amenities}</span>
								</td>
								<td className='font-bold'>${accm['Price']}/m</td>
								<th>
									<button className='btn btn-ghost btn-xs'>details</button>
								</th>
							</tr>
						);
					});
					setUnits(allUnits);
				})
				.catch((err) => {
					var noListings = [];
					noListings.push(
						<tr>
							<td className='text-center font-semibold'>No Units Found</td>
						</tr>
					);
					setUnits(noListings);
				});
		}
	}, [accm_id]);

	return (
		<div id={accm_id + '_units'} className={`h-full card card-compact shadow text-primary-content translate-y-1 bg-accent transition-all delay-150 duration-300 overflow-hidden w-full`}>
			<div className='card-body p-0'>
				<h3 className='card-title'>Accommodation Units</h3>
				<div className='overflow-x-auto w-full'>
					<table className='table w-full rounded-xl'>
						<tbody>{units}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AccommodationUnits;
