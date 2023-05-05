import React, { useState } from 'react';
import AccommodationUnits from './AccommodationUnits';
import { useListings } from 'useListings';

type Props = {
	title: string;
	address: string;
	description: string;
	id: string;
	unitAmount: number;
	accmUnits: any;
};

function getAvailableAmenities(amenities: any) {
	let toReturn: any[] = [];
	var topAmenities = ['pets_allowed', 'shared_dryer', 'shared_washer', 'shared_kitchen'];
	var includedAmenities = Object.keys(amenities).filter((item) => (item != 'deleted_flag' ? amenities[item] === false : null));
	const filteredAmenities = includedAmenities.filter((value) => topAmenities.includes(value));

	const allAmenities: any = {
		pets_allowed: (
			<span className='badge badge-ghost badge-md'>
				<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-circle text-accent' viewBox='0 0 16 16'>
					{' '}
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />{' '}
					<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />{' '}
				</svg>
				<p className='ml-1'>Pets</p>
			</span>
		),
		shared_dryer: (
			<span className='badge badge-ghost badge-md'>
				<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check-circle text-primary' viewBox='0 0 16 16'>
					{' '}
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' /> <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />{' '}
				</svg>
				<p className='ml-1'>Dryer</p>
			</span>
		),
		shared_washer: (
			<span className='badge badge-ghost badge-md'>
				<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-circle text-accent' viewBox='0 0 16 16'>
					{' '}
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />{' '}
					<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />{' '}
				</svg>
				<p className='ml-1'>Washer</p>
			</span>
		),
		shared_kitchen: (
			<span className='badge badge-ghost badge-md'>
				<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-circle text-accent' viewBox='0 0 16 16'>
					{' '}
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />{' '}
					<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />{' '}
				</svg>
				<p className='ml-1'>Shared Kitchen</p>
			</span>
		),
	};

	filteredAmenities.forEach((amenity) => toReturn.push(allAmenities[amenity]));
	return toReturn;
}

const ListingResult: React.FC<Props> = ({ title, address, description, unitAmount, id, accmUnits }) => {
	const [active, setActive] = useState(false);
	const [units, setUnits] = useState([]);
	var picLink = '';
	var amenities: any[] = [];

	if (id) {
		const { data: accmData, error: accmError } = useListings(`images/accommodation/${id}`);
		const { data: accmAmenities, error: accmAmenitiesError } = useListings(`accommodations/amenities/${id}`);
		if (accmData) {
			if (accmData.length === 0 || typeof accmData === 'string') picLink = '/images/default.jpg';
			else picLink = accmData[0];
		}
		if (accmAmenities) amenities = getAvailableAmenities(accmAmenities);
	}

	function handleClick(id: string, setActive: any, setUnits: any) {
		active ? setActive(false) : setActive(true);
		var element = document.getElementById(id + '_units');

		if (!element) setUnits(<AccommodationUnits accmId={id} accmUnits={accmUnits} />);
		else {
			document.getElementById(id + '_units')?.classList.toggle('h-0');
			document.getElementById(id + '_units')?.classList.toggle('h-72');
		}
	}

	return (
		<>
			<div key={this} id={id} onClick={() => handleClick(id, setActive, setUnits)} className={`card lg:card-side shadow-xl transition ease-in-out hover:-translate-y-1 hover:scale-10 duration-150 cursor-pointer ${active ? 'border-[1px] border-accent' : ''}`}>
				<figure className='m-auto p-4 rounded-2xl h-auto w-auto'>
					<img src={picLink} className='rounded-xl h-48 w-48 object-cover' alt='' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>{title}</h2>
					<p className='text-neutral-500'>{address}</p>
					<div>{amenities}</div>
					<p>{description}</p>
					<div className='card-actions justify-end'>
						<button className='btn btn-ghost'>{unitAmount} units</button>
					</div>
				</div>
			</div>
			{units}
		</>
	);
};
export default ListingResult;
