import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Unit } from '../Unit';
import axios from 'axios';
import Link from 'next/link';

type Props = {
	id: number;
	title: string;
	address: string;
	description: string;
	host: string;
};

interface shAmenitiesType {
	accm_id: number;
	deleted_flag: boolean;
	shared_amenities_id: number;
	shared_bathroom: boolean;
	shared_dryer: boolean;
	shared_kitchen: boolean;
	shared_washer: boolean;
	pets_allowed: boolean;
}

const SpecialAccommodation: React.FC<Props> = ({ id, title, address, description, host }) => {
	const [accmImg, setAccmImg] = useState('/images/default.jpg');

	useEffect(() => {
		axios
			.get(`${host}/api/images/accommodation/${id}`)
			.then((res) => {
				return res.data;
			})
			.then((result) => {
				return result[0];
			})
			.then((result) => {
				setAccmImg(result['secure_url']);
			})
			.catch((err) => console.error(err));
	}, [host]);

	const [openUnits, setOpenUnits] = useState(false);

	var unitList: [] = [];
	const { data: units, error: unitsError, isLoading: isLoadingUnits } = useSWR(`${host}/api/accommodations/units/${id}`, (url: string) => fetch(url, {}).then((res) => res.json()));
	if (!units || units == 'Units Not Found in Accommodation') {
		unitList = [];
	} else {
		unitList = units;
	}

	return (
		<div className='flex justify-center w-72 h-74 min-h-82  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200    rounded-lg bg-white shadow-lg ring-1 ring-stone-200 overflow-hidden'>
			<div className={openUnits ? 'hidden' : ''}>
				<div className='max-w-full w-72 '>
					<div>
						<img className='rounded-t-lg aspect-video h-56 object-cover' src={accmImg} alt='' />
					</div>
					<div className='flex flex-col m-3  '>
						<div className='h-8  w-full block'>
							<h1 className='font-bold text-xl text-left truncate'>{title}</h1>
						</div>
						<div>
							<div className='flex align-center '>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-5 h-5 shrink-0'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
								</svg>

								<h2 className='block truncate w-[90%]'>{address}</h2>
							</div>
						</div>

						<div className='flex justify-end mb-2 mt-2'>
							<button onClick={() => setOpenUnits(!openUnits)} className='btn  font-bold text-right'>
								{unitList.length} units
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={openUnits ? 'relative max-w-full w-72' : 'hidden'}>
				<div className='flex absolute shadow-md p-2 w-full bg-primary text-white justify-center'>
					<button onClick={() => setOpenUnits(!openUnits)}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-6 h-6'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
						</svg>
					</button>
					<h1 className='font-semibold grow ml-2'>Available Units</h1>
					<span className='grow'></span>
				</div>
				<div className='pt-10'>
					<div className='flex flex-col overflow-auto max-h-full pb-1'>
						{unitList.map((unit: Unit) => (
							<Link className={unit.available ? '' : 'hidden'} href={`/listings/${unit.unit_id}`}>
								<div
									className={
										unit.available
											? 'flex h-10 items-center px-2  border-b-2  border-stone-200 hover:bg-stone-100 active:bg-primary active:text-white'
											: 'flex h-10 items-center px-2  border-b-2 bg-red-600 text-white  border-stone-200 hover:bg-stone-100 active:bg-primary active:text-white'
									}>
									<h1 className='text-left grow font-semibold'>{`Unit ${unit.unit_number}`}</h1>
									<h1 className='font-medium'>{unit.available ? `$${unit.price}` : 'Unavailable'}</h1>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default SpecialAccommodation;
