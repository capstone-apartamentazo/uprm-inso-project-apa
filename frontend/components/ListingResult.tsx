import React, { useState } from 'react';
import AccommodationUnits from './AccommodationUnits';
import { useListings } from 'useListings';

type Props = {
	title: string;
	address: string;
	description: string;
	id: string;
	unitAmount: number;
};

const unit = {
	amenities: 'water, balcony, electricity',
	description: 'Test Description',
	number: '2',
	price: '400',
	available: 'Available',
};

const ListingResult: React.FC<Props> = ({ title, address, description, unitAmount, id }) => {
	const [active, setActive] = useState(false);
	const [units, setUnits] = useState([]);
	var picLink = '';
	var beds = '';
	var baths = '';

	if (id) {
		const { data: accmData, error: accmError } = useListings(`images/accommodation/${id}`);
		const { data: accmAmenities, error: accmAmenitiesError } = useListings(`accommodations/amenities/${id}`);
		if (accmData) {
			console.log(accmData);
			picLink = accmData.resources[0].secure_url;
		}
		if (accmAmenities) {
			console.log(accmAmenities);
			beds = accmAmenities.bedrooms;
			baths = accmAmenities.bathrooms;
		}
	}

	function handleClick(id: string, setActive: any, setUnits: any) {
		active ? setActive(false) : setActive(true);
		var element = document.getElementById(id + '_units');

		if (!element) setUnits(<AccommodationUnits accm_id={id} />);
		else {
			document.getElementById(id + '_units')?.classList.toggle('h-0');
			document.getElementById(id + '_units')?.classList.toggle('h-72');
		}
	}

	return (
		<div id={id} className='w-full' onClick={() => handleClick(id, setActive, setUnits)}>
			<div className={`card card-side bg-base-100 h-56 w-full shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-10 duration-150 cursor-pointer ${active ? 'border-[1px] border-accent' : ''}`}>
				<figure className='p-4 rounded-2xl h-56 w-56'>
					<img src={picLink} className='rounded-xl h-48 w-48' alt='' />
				</figure>
				<div className='card-body w-72'>
					<p className='card-title truncate'>{title}</p>
					<p className='truncate text-neutral-500'>{address}</p>
					<p className='truncate pt-2'>
						<span className='font-semibold'>{beds}</span> bedrooms <span className='font-semibold text-accent'>•</span> <span className='font-semibold'>{baths}</span> bathrooms
					</p>
					<p className='h-10 truncate'>{description}</p>
					<div className='card-actions justify-end'>
						<div className='font-bold'>{unitAmount} units</div>
					</div>
				</div>
			</div>
			{units}
		</div>
	);
};
export default ListingResult;
