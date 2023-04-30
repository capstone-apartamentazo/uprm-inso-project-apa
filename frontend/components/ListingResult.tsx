import React, { useState } from 'react';
import AccommodationUnits from './AccommodationUnits';

type Props = {
	title: string;
	address: string;
	features: string;
	description: string;
	price: string;
	href: string;
	id: string;
};

const unit = {
	amenities: 'water, balcony, electricity',
	description: 'Test Description',
	number: '2',
	price: '400',
	available: 'Available',
};

const ListingResult: React.FC<Props> = ({ title, address, features, description, price, href, id }) => {
	const [active, setActive] = useState(false);
	const [units, setUnits] = useState([]);

	function handleClick(id: string, setActive: any, setUnits: any) {
		active ? setActive(false) : setActive(true);
		var element = document.getElementById(id + '_units');

		if (!element) setUnits(<AccommodationUnits accm_id={id} />);
		else {
			document.getElementById(id + '_units')?.classList.toggle('h-0');
			document.getElementById(id + '_units')?.classList.toggle('h-96');
		}
	}

	return (
		<div id={id} className='w-full' onClick={() => handleClick(id, setActive, setUnits)}>
			<div className={`card card-side bg-base-100 h-56 w-full shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-10 duration-150 cursor-pointer ${active ? 'border-[1px] border-accent' : ''}`}>
				<figure className='p-4 rounded-2xl h-56 w-56'>
					<img src='https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='rounded-xl h-48 w-48' alt='Listing' />
				</figure>
				<div className='card-body w-72'>
					<p className='card-title truncate'>{title}</p>
					<p className='truncate text-neutral-500'>{address}</p>
					<p className='truncate pt-2'>{features}</p>
					<p className='h-10 truncate'>{description}</p>
					<div className='card-actions justify-end'>
						<div className='font-bold'>{price}/m</div>
					</div>
				</div>
			</div>
			{units}
		</div>
	);
};
export default ListingResult;
