import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useListings } from 'useListings';

const Unit = () => {
	const { data, error } = useListings('units/1');

	// TODO: Add loading cards, default error cards
	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;
	console.log(data);
	// let allUnits: any[] = [];
	// const [units, setUnits] = useState([]);
	// const router = useRouter();
	// const { unit } = router.query;
	// const [unitData, setUnitData] = useState();

	// useEffect(() => {
	// 	if (unit) {
	// 		const data = {
	// 			accm_id: unit,
	// 		};
	// 		console.log(data);
	// 		const endpoint = 'http://127.0.0.1:5000/api/units/1';
	// 		const options = {
	// 			method: 'GET',
	// 			// headers: new Headers({ 'content-type': 'application/json' }),
	// 		};
	// 		fetch(endpoint, options)
	// 			.then((data) => {
	// 				return data.json();
	// 			})
	// 			.then((data) => {
	// 				setUnitData(data);
	// 				console.log(data);
	// 				data.map((accm: any) => {
	// 					console.log(accm);
	// 					allUnits.push();
	// 				});
	// 			})
	// 			.catch((err) => {
	// 				var noListings: any = [];
	// 				noListings.push(<div className='col-start-1 row-span-2 p-2'>No results found</div>);
	// 				setUnits(noListings);
	// 			});
	// 		setUnits(units);
	// 	}
	// }, [unit]);
	return (
		<Layout>
			<section className='pt-36 pl-20 pr-20'>
				<div className='grid grid-flow-row gap-4'>
					<div className='row-span-2 row-start-1 col-start-1 text-3xl align-middle'>Unit {data.unit_number} | Accommodation Title</div>
					<div className='row-start-1 text-end col-start-4'>Landlord Rating</div>
					<div className='flex items-center col-start-4 row-start-2 justify-end '>
						<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>First star</title>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
						</svg>
						<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>Second star</title>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
						</svg>
						<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>Third star</title>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
						</svg>
						<svg aria-hidden='true' className='w-5 h-5 text-accent' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>Fourth star</title>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
						</svg>
						<svg aria-hidden='true' className='w-5 h-5 text-gray-300 dark:text-gray-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>Fifth star</title>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
						</svg>
						<p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>4.95 out of 5</p>
						<span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
						<a href='#' className='text-sm font-medium text-gray-900 underline hover:no-underline'>
							73 reviews
						</a>
					</div>
					<div className='row-start-3 col-span-4'>
						<div id='indicators-carousel' className='relative w-full bg-gray-200' data-carousel='static'>
							<div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
								<div className='hidden duration-700 ease-in-out' data-carousel-item='active'>
									<img src='/docs/images/carousel/carousel-1.svg' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' alt='...' />
								</div>

								<div className='hidden duration-700 ease-in-out' data-carousel-item>
									<img src='/docs/images/carousel/carousel-2.svg' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' alt='...' />
								</div>

								<div className='hidden duration-700 ease-in-out' data-carousel-item>
									<img src='/docs/images/carousel/carousel-3.svg' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' alt='...' />
								</div>

								<div className='hidden duration-700 ease-in-out' data-carousel-item>
									<img src='/docs/images/carousel/carousel-4.svg' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' alt='...' />
								</div>

								<div className='hidden duration-700 ease-in-out' data-carousel-item>
									<img src='/docs/images/carousel/carousel-5.svg' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' alt='...' />
								</div>
							</div>

							<div className='absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
								<button type='button' className='w-3 h-3 rounded-full' aria-current='true' aria-label='Slide 1' data-carousel-slide-to='0'></button>
								<button type='button' className='w-3 h-3 rounded-full' aria-current='false' aria-label='Slide 2' data-carousel-slide-to='1'></button>
								<button type='button' className='w-3 h-3 rounded-full' aria-current='false' aria-label='Slide 3' data-carousel-slide-to='2'></button>
								<button type='button' className='w-3 h-3 rounded-full' aria-current='false' aria-label='Slide 4' data-carousel-slide-to='3'></button>
								<button type='button' className='w-3 h-3 rounded-full' aria-current='false' aria-label='Slide 5' data-carousel-slide-to='4'></button>
							</div>

							<button type='button' className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none' data-carousel-prev>
								<span className='inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
									<svg aria-hidden='true' className='w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7'></path>
									</svg>
									<span className='sr-only'>Previous</span>
								</span>
							</button>
							<button type='button' className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none' data-carousel-next>
								<span className='inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
									<svg aria-hidden='true' className='w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
									</svg>
									<span className='sr-only'>Next</span>
								</span>
							</button>
						</div>
					</div>
					<div className='row-start-4 col-span-2'>
						<p className='font-semibold'>Unit Description</p>
						<p className='font-semibold'>${data.price} per month</p>
						<p className='font-semibold'>{data.contract_duration} month contract</p>
						<p>Available {data.date_available}</p>
					</div>
					<div className='row-start-4 col-start-4 text-end'>
						<button className='btn btn-primary mr-4 text-white'>Request Tour</button>
						<button className='btn btn-secondary bg-transparent text-secondary hover:bg-primary-200 hover:text-white'>Apply</button>
					</div>
					<div className='row-start-5 col-span-2 col-start-1'>
						<h3 className='text-2xl'>About</h3>
						<div className=''>accm_description</div>
						<div className=''>Card with Landlord</div>
					</div>
					<div className='row-start-5 col-span-2 col-start-3 bg-gray-200 text-center'>Map</div>
					<div className='row-start-6 col-span-4'>
						<h3 className='text-2xl'>Amenities</h3>
						<div>All bullet points of amenities</div>
					</div>
					<div className='row-start-7 col-span-4'>
						<h3 className='text-2xl'>Reviews</h3>
						<div className=''>Reviews...</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Unit;
