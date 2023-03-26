import React from 'react';

type Props = {
	title: string;
	address: string;
	features: string;
	price: string;
	href: string;
};

const Listing: React.FC<Props> = ({ title, address, features, price, href }) => {
	return (
		<div className='flex justify-center w-72'>
			<a href={href} data-te-ripple-init data-te-ripple-color='light'>
				<div className='block max-w-full rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700'>
					<img className='rounded-t-lg aspect-video h-56' src='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' alt='' />
					<div className='p-4 flex menu-vertical h-48 align-middle'>
						<h1 className='text-left mb-2 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{title}</h1>
						<div className='text-left text-base text-neutral-600 dark:text-neutral-200 flex align-middle gap-1 h-16'>
							<span>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
								</svg>
							</span>
							{address}
						</div>
						<div className='flex gap-1 align-middle w-64'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
								/>
							</svg>
							<p className='h-10 text-left font-semibold truncate'>{features}</p>
						</div>
						<h2 className='font-bold text-right'>{price}/m</h2>
					</div>
				</div>
			</a>
		</div>
	);
};
export default Listing;
