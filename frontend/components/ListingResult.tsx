import React, { useState } from 'react';
import AccommodationUnits from './AccommodationUnits';
import { useListings } from 'useListings';
import { FaBullseye } from 'react-icons/fa';

type Props = {
	title: string;
	address: string;
	description: string;
	id: string;
	unitAmount: number;
	accmUnits: any;
	map: google.maps.Map | null;
	coords: { lat: number; lng: number };
};

function getAvailableAmenities(amenities: any, id: string) {
	let toReturn: any[] = [];

	var included = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check-circle text-primary' viewBox='0 0 16 16'>
			{' '}
			<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' /> <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />{' '}
		</svg>
	);
	var notIncluded = (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-circle text-accent' viewBox='0 0 16 16'>
			{' '}
			<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' /> <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />{' '}
		</svg>
	);

	toReturn.push(
		<span key={id + '_shared_dryer'} className='badge badge-ghost badge-md'>
			{amenities['shared_dryer'] === true ? included : notIncluded}
			<p className='ml-1'>Dryer</p>
		</span>
	);
	toReturn.push(
		<span key={id + '_shared_washer'} className='badge badge-ghost badge-md'>
			{amenities['shared_washer'] === true ? included : notIncluded}
			<p className='ml-1'>Washer</p>
		</span>
	);
	toReturn.push(
		<span key={id + '_pets_allowed'} className='badge badge-ghost badge-md'>
			{amenities['pets_allowed'] === true ? included : notIncluded}
			<p className='ml-1'>Pets</p>
		</span>
	);

	return toReturn;
}

const ListingResult: React.FC<Props> = ({ title, address, description, unitAmount, id, accmUnits, map, coords }) => {
	const [active, setActive] = useState(false);
	const [units, setUnits] = useState([]);
	var picLink = '';
	var amenities: any[] = [];

	if (id) {
		const { data: accmData, error: accmError } = useListings(`images/accommodation/${id}`);
		const { data: accmAmenities, error: accmAmenitiesError } = useListings(`accommodations/amenities/${id}`);
		if (accmData) {
			if (accmData.length === 0 || typeof accmData === 'string') picLink = '/images/default.jpg';
			else picLink = accmData[0].secure_url;
		}
		if (accmAmenities) amenities = getAvailableAmenities(accmAmenities, id);
	}

	function handleClick(id: string, setActive: any, setUnits: any) {
		active ? setActive(false) : setActive(true);
		var element = document.getElementById(id + '_units');

		try {
			map!.setCenter(coords);
			map!.setZoom(17);
		} catch (err) {
			console.log(err);
		}

		if (!element) setUnits(<AccommodationUnits key={'accmUnitsID_' + id} accmId={id} accmUnits={accmUnits} />);
		else {
			if (unitAmount === 1) document.getElementById(id + '_units')?.classList.toggle('h-[10rem]');
			else if (unitAmount == 2) document.getElementById(id + '_units')?.classList.toggle('h-[15rem]');
			else document.getElementById(id + '_units')?.classList.toggle('h-[19rem]');

			document.getElementById(id + '_units')?.classList.toggle('h-0');
		}
	}

	return (
		<div key={'accmID_' + id}>
			<div id={id} onClick={() => handleClick(id, setActive, setUnits)} className={`card lg:h-[17rem] lg:card-side shadow-xl ring-1 ring-stone-200 transition ease-in-out hover:-translate-y-1 hover:scale-10 duration-150 cursor-pointer ${active ? 'border-[1px] border-accent' : ''}`}>
				<figure className='p-4 rounded-2xl lg:w-4/12'>
					<img src={picLink} className='rounded-xl lg:object-cover lg:h-full' alt='' />
				</figure>
				<div className='card-body lg:w-8/12'>
					<span className='card-actions justify-end right-10 absolute font-semibold text-accent text-lg'>8.7</span>
					<h2 className='card-title lg:w-[95%]'>{title}</h2>
					<p className='text-neutral-500'>{address}</p>
					<div className='space-x-1'>{amenities}</div>
					<div className={`${description.length > 90 ? 'tooltip text-left tooltip-accent' : ''}`} data-tip={description}>
						<p className='break-all h-auto'>{description.length > 90 ? description.slice(0, 90) + '...' : description}</p>
					</div>
					<div className='card-actions justify-end'>
						<button className='btn btn-ghost'>{unitAmount} units</button>
					</div>
				</div>
			</div>
			{units}
		</div>
	);
};
export default ListingResult;
