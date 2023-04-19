import React from 'react';

type Props = {
	title: string;
	address: string;
	features: string;
	description: string;
	price: string;
	href: string;
};

const ListingResult: React.FC<Props> = ({ title, address, features, description, price, href }) => {
	return (
		<div className='card card-side bg-base-100 h-56 w-full shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200 cursor-pointer'>
			<figure className='p-4 rounded-2xl h-56 w-56'>
				<img src='/images/user.png' className='rounded-xl' alt='Listing' />
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
	);
};
export default ListingResult;
