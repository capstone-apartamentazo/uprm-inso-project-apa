import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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

function handleClick(id, active, setActive) {
	active ? setActive(false) : setActive(true);
}
const ListingResult: React.FC<Props> = ({ title, address, features, description, price, href, id }) => {
	const [active, setActive] = useState(false);
	return (
		<div id={id} className='w-full' onClick={() => handleClick(id, active, setActive)}>
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
			<div id={id + '_units'} className={`${active ? 'h-96' : 'h-0'} card card-compact w-full shadow text-primary-content translate-y-1 bg-accent transition-all delay-150 duration-300 overflow-hidden w-full`}>
				<div className='card-body p-0'>
					<h3 className='card-title'>Accommodation Units</h3>
					<div className='overflow-x-auto w-full'>
						<table className='table w-full rounded-xl'>
							<tbody>
								{/* row 1 */}
								<tr>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div className='font-bold'>Unit {unit.number}</div>
												<div className='text-sm opacity-50'>{unit.available}</div>
											</div>
										</div>
									</td>
									<td>
										{unit.description}
										<br />
										<span className='badge badge-ghost badge-sm'>{unit.amenities}</span>
									</td>
									<td className='font-bold'>${unit.price}/m</td>
									<th>
										<button className='btn btn-ghost btn-xs'>details</button>
									</th>
								</tr>
								{/* row 2 */}
								<tr>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div className='font-bold'>Unit {unit.number}</div>
												<div className='text-sm opacity-50'>{unit.available}</div>
											</div>
										</div>
									</td>
									<td>
										{unit.description}
										<br />
										<span className='badge badge-ghost badge-sm'>{unit.amenities}</span>
									</td>
									<td className='font-bold'>${unit.price}/m</td>
									<th>
										<button className='btn btn-ghost btn-xs'>details</button>
									</th>
								</tr>
								{/* row 3 */}
								<tr>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div className='font-bold'>Unit {unit.number}</div>
												<div className='text-sm opacity-50'>{unit.available}</div>
											</div>
										</div>
									</td>
									<td>
										{unit.description}
										<br />
										<span className='badge badge-ghost badge-sm'>{unit.amenities}</span>
									</td>
									<td className='font-bold'>${unit.price}/m</td>
									<th>
										<button className='btn btn-ghost btn-xs'>details</button>
									</th>
								</tr>
								{/* row 4 */}
								<tr>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div className='font-bold'>Unit {unit.number}</div>
												<div className='text-sm opacity-50'>{unit.available}</div>
											</div>
										</div>
									</td>
									<td>
										{unit.description}
										<br />
										<span className='badge badge-ghost badge-sm'>{unit.amenities}</span>
									</td>
									<td className='font-bold'>${unit.price}/m</td>
									<th>
										<button className='btn btn-ghost btn-xs'>details</button>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ListingResult;
