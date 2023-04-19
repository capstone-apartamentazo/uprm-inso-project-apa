import Card from '@/components/Card';
import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import ListingResult from '@/components/ListingResult';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Listings() {
	return (
		<Layout>
			<section className='pt-24 pl-20'>
				<div className='grid grid-cols-2 grid-flow-row gap-4'>
					<div className='row-span-1'>
						<p className='font-bold text-2xl'>
							13 results for <span className='text-accent'>Mayagüez, PR</span>
						</p>
					</div>
					<div className='relative col-start-1 row-start-2'>
						<input type='text' id='simple-search' className='bg-gray-50 bg-opacity-50 border border-accent text-gray-900 text-sm rounded-full focus:ring-accent focus:border-accent block w-full pl-5 p-2.5 ' placeholder='Search for a location...' required />
						<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
							<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20'>
								<path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
							</svg>
						</div>
					</div>
					<div className='col-start-2 row-start-2 flex gap-4 overflow-wrap'>
						<select className='select w-24 drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
						<select className='select w-24  drop-shadow-md'>
							<option disabled selected>
								Price
							</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
					</div>
					<div className='col-start-2 row-start-3'>Map here</div>
					<div className='col-start-1 row-span-2 p-2'>
						<ListingResult title={'Bosque 65'} address={'65 Calle Bosque, Mayagüez'} features={'2 bed • 2 baths'} description={'This is a description of this unit'} price={'$475'} href={''} />
					</div>
					<div className='col-start-1 row-span-2 p-2'>
						<ListingResult title={'Bosque 65'} address={'65 Calle Bosque, Mayagüez'} features={'2 bed • 2 baths'} description={'This is a description of this unit'} price={'$475'} href={''} />
					</div>
					<div className='col-start-1 row-span-2 p-2'>
						<ListingResult title={'Bosque 65'} address={'65 Calle Bosque, Mayagüez'} features={'2 bed • 2 baths'} description={'This is a description of this unit'} price={'$475'} href={''} />
					</div>
					<div className='col-start-1 row-span-2 p-2'>
						<ListingResult title={'Bosque 65'} address={'65 Calle Bosque, Mayagüez'} features={'2 bed • 2 baths'} description={'This is a description of this unit'} price={'$475'} href={''} />
					</div>
				</div>
			</section>
		</Layout>
	);
}
