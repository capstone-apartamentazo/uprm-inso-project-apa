import Layout from '@/components/Layout';
import { useListings } from 'useListings';
import ReviewList from '@/components/ReviewList';
import { useRouter } from 'next/router';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Storage } from 'Storage';
import { Token } from 'Token';
import { useEffect, useState } from 'react';
import WriteReview from '@/components/WriteReview';
import Tour from '@/components/Tour';
import Contact from '@/components/Contact';
import Apply from '@/components/Apply';
import { Loading } from '@/components/Loading';

const Unit = () => {
	const router = useRouter();
	const { unit } = router.query;
	const [storage, setStorage] = useState<Storage>({ token: null, id: null, isLandlord: null });
	const [map, setMap] = useState<google.maps.Map>();

	const cookies = new Cookies();
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ['geometry', 'drawing'],
	});

	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
		} catch (err) {
			console.log('No tokens found in cookies');
		}
	}, []);

	const { data: unitData, error: unitError } = useListings(unit ? 'units/' + unit : null);
	const { data: unitAmenities, error: unitAmenitiesError } = useListings(unit ? 'units/amenities/' + unit : null);
	const { data: unitPics, error: unitPicsError } = useListings(unit ? 'images/unit/' + unit : null);

	// TODO start loading accommodation stuff
	const { data: accmData, error: accmError } = useListings(unitData ? 'accommodations/' + unitData.accm_id : null);
	const { data: accmAmenities, error: accmAmenitiesError } = useListings(unitData ? 'accommodations/amenities/' + unitData.accm_id : null);
	const { data: accmReviews, error: accmReviewsError } = useListings(unitData ? 'accommodations/reviews/' + unitData.accm_id : null);
	const { data: accmPics, error: accmPicsError } = useListings(unitData ? 'images/accommodation/' + unitData.accm_id : null);

	// TODO start loading landlord data
	const { data: landlord, error: landlordError } = useListings(accmData ? 'landlords/' + accmData.landlord_id : null);
	const { data: landlordPic, error: landlordPicError } = useListings(accmData ? 'images/landlord/' + accmData.landlord_id : null);

	// TODO: Add loading cards, default error cards
	// TODO: actual loading screen
	if (accmPicsError || unitError || accmError || unitAmenitiesError || accmAmenitiesError || landlordError || landlordPicError || unitPicsError) return <div>Failed to load</div>;
	if (!accmPics || accmPics === undefined || (!unitData && !accmData) || unitData === undefined || accmData === undefined || unitAmenities === undefined || accmAmenities === undefined || landlord === undefined || landlordPic === undefined || unitPics === undefined) return <Loading size={100} />;

	let tempAmenities = {
		'Air Conditioner': unitAmenities['air_conditioner'],
		Balcony: unitAmenities['balcony'],
		Electricity: unitAmenities['electricity'],
		Internet: unitAmenities['internet'],
		Parking: unitAmenities['parking'],
		Water: unitAmenities['water'],
		'Private Washer': unitAmenities['private_washer'],
		'Private Dryer': unitAmenities['private_dryer'],
		'Water Heater': unitAmenities['heater'],
	};

	let tempSharedAmenities = {
		Dryer: accmAmenities['shared_dryer'],
		Internet: accmAmenities['internet'],
		Kitchen: accmAmenities['shared_kitchen'],
		Pets: accmAmenities['pets_allowed'],
		Washer: accmAmenities['shared_washer'],
		'Shared Bathroom': accmAmenities['shared_bathroom'],
	};

	let amenities = [];

	var included = (
		<svg className='w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
			<path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'></path>
		</svg>
	);

	var notIncluded = (
		<svg className='w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
			<path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd'></path>
		</svg>
	);

	let displayName: keyof typeof tempAmenities;
	for (displayName in tempAmenities) {
		const isIncluded = tempAmenities[displayName];
		amenities.push(
			<li className='flex items-center'>
				{isIncluded ? included : notIncluded} {displayName}
			</li>
		);
	}

	let dName: keyof typeof tempSharedAmenities;
	for (dName in tempSharedAmenities) {
		const isIncluded = tempSharedAmenities[dName];
		amenities.push(
			<li className='flex items-center'>
				{isIncluded ? included : notIncluded} {dName === 'Pets' && isIncluded ? 'Pets Allowed' : dName === 'Pets' && !isIncluded ? 'No Pets Allowed' : dName}
			</li>
		);
	}

	const rating = landlord.landlord_rating;
	let ratingStars = [];

	for (let i = 0; i < 5; i++) {
		ratingStars.push(
			<svg aria-hidden='true' className={`w-5 h-5 ${Math.round(rating) > i ? 'text-accent' : 'text-gray-500'}`} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
				<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
			</svg>
		);
	}
	var landlordPicLink;
	try {
		landlordPicLink = landlordPic.resources[0].secure_url;
	} catch (ex) {
		landlordPicLink = '/images/user.png';
	}

	let allUnitPics: any[] = [];

	try {
		if (unitPics.length === 0 && accmPics.length === 0) {
			allUnitPics.push(
				<>
					<div className='carousel-item w-2/5'>
						<img src='/images/default.jpg' className='rounded-box object-cover' />
					</div>
					<div className='carousel-item w-2/5'>
						<img src='/images/default.jpg' className='rounded-box object-cover' />
					</div>
					<div className='carousel-item w-2/5'>
						<img src='/images/default.jpg' className='rounded-box object-cover' />
					</div>
				</>
			);
		}
		unitPics.forEach((pic: { secure_url: any }) => {
			allUnitPics.push(
				<div className='carousel-item w-2/5'>
					<img src={pic.secure_url} className='rounded-box object-cover' />
				</div>
			);
		});

		accmPics.forEach((pic: { secure_url: any }) => {
			allUnitPics.push(
				<div className='carousel-item w-2/5'>
					<img src={pic.secure_url} className='rounded-box object-cover' />
				</div>
			);
		});
	} catch (ex) {
		allUnitPics.push(
			<>
				<div className='carousel-item w-2/5'>
					<img src='/images/default.jpg' className='rounded-box object-cover' />
				</div>
				<div className='carousel-item w-2/5'>
					<img src='/images/default.jpg' className='rounded-box object-cover' />
				</div>
				<div className='carousel-item w-2/5'>
					<img src='/images/default.jpg' className='rounded-box object-cover' />
				</div>
			</>
		);
	}

	// INFO: MAP
	const mapOptions = {
		disableDefaultUI: true,
		zoomControl: true,
		clickableIcons: true,
		scrollwheel: true,
		rotateControl: true,
	};

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	const center = {
		lat: accmData.latitude,
		lng: accmData.longitude,
	};
	return (
		<Layout>
			<section className='pt-20 pl-4 md:pt-32 md:pl-20 md:pr-20 bg-gray-50'>
				<div className='grid grid-flow-row gap-4'>
					<div className=' row-span-2 row-start-1 col-start-1 col-end-5 text-3xl align-middle'>
						<h1 className='font-semibold w-full'>
							Unit {unitData.unit_number} <span className='text-accent'>|</span> {accmData.accm_title}
						</h1>
						<h3 className='text-lg'>
							{accmData.accm_street}, {accmData.accm_city}, {accmData.accm_country}, {accmData.accm_zipcode}
						</h3>
					</div>
					<div className={`row-span-1 row-start-2 col-start-4 align-middle text-end ${storage.isLandlord ? 'hidden' : storage.isLandlord === null ? 'hidden' : ''}`}>
						<WriteReview accmID={accmData.accm_id} token={storage.token} />
					</div>
					<div className='row-start-3 col-span-4 h-[20rem] md:h-[28rem] bg-gray-100 rounded-2xl shadow-inner md:mr-0 mr-4 p-4'>
						<div className='grid grid-rows-2 grid-flow-col gap-4 h-[20rem] md:h-[28rem] overflow-auto'>
							<div className='carousel carousel-center p-4 space-x-4 bg-neutral h-[18rem] rounded-box md:h-[26rem]'>{allUnitPics}</div>
						</div>
					</div>
					<div className='row-start-5 col-span-4 md:row-start-4 md:col-span-2 space-y-1'>
						<p className='font-semibold text-xl'>
							{unitAmenities['bedrooms']} <span className='font-normal'>beds</span> <span className='text-accent'>|</span> {unitAmenities['bathrooms']} <span className='font-normal'>baths</span>
						</p>
						<p className='font-semibold text-xl'>
							${unitData.price} <span className='font-normal'>per month</span>
						</p>
						<p className='font-semibold'>
							{unitData.contract_duration} month <span className='font-normal'>contract</span>
						</p>
						<p className=''>Available {unitData.date_available}</p>
					</div>
					<div className='row-start-4 col-start-1 md:row-start-4 md:col-start-4 text-end flex md:block'>
						<button className='mr-4 text-white'>
							<Tour unitID={unitData.unit_id} token={storage.token} />
						</button>
						<button className=''>
							<Apply unitID={unitData.unit_id} token={storage.token} />
						</button>
					</div>
					<div className='row-start-6 md:row-start-5 col-start-1 col-span-4 md:col-span-2 pr-2 mt-10'>
						<h3 className='text-2xl'>About</h3>
						<div className='w-full break-all'>
							<p className='mt-4 mb-4'>{accmData.accm_description}</p>
						</div>
						<div className='rounded-2xl shadow-lg w-full py-4 flex bg-white'>
							<div className='w-32 overflow-hidden mx-4'>
								<img src={landlordPicLink} alt='landlord' className='rounded-2xl h-full w-full object-cover' />
							</div>
							<div className='mt-3 mx-auto w-3/4 self-center'>
								<p className='text-xl text-gray-800 tracking-wide leading-5'>{landlord.landlord_name}</p>
								<p className='text-lg text-primary tracking-wide leading-5'>Property Manager</p>
								<div className='flex items-center mt-2'>
									{ratingStars}
									<p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:block'>{landlord.landlord_rating} out of 5</p>
									<span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
									<a href='#' className='text-sm font-medium text-gray-900 underline hover:no-underline'>
										{typeof accmReviews === 'string' ? 0 : accmReviews.length} {typeof accmReviews === 'string' ? 'reviews' : accmReviews.length > 1 ? 'reviews' : 'review'}
									</a>
								</div>
								<button className='leading-5 mt-2'>
									<Contact unitID={unitData.unit_id} token={storage.token} landlordID={landlord.landlord_id} />
								</button>
							</div>
						</div>
					</div>
					<div className='row-start-6 md:row-start-5 col-start-3 bg-gray-50 col-span-2 text-center mt-10 ring-2 ring-accent rounded-md p-1 hidden md:block'>
						{isLoaded && (
							<GoogleMap
								onLoad={(map) => {
									setMap(map);
								}}
								id='map'
								options={mapOptions}
								mapContainerStyle={containerStyle}
								center={center}
								zoom={17}>
								<Marker position={center} />
							</GoogleMap>
						)}
					</div>
					<div className='row-start-7 md:row-start-6 col-span-4 mt-10'>
						<h3 className='text-2xl'>Amenities</h3>
						<ul className='space-y-1 text-gray-500 list-inside mt-4 max-h-60 md:max-h-32 w-full flex flex-wrap flex-col'>{amenities}</ul>{' '}
					</div>
					<div className='row-start-8 md:row-start-7 col-span-4 mt-10'>
						<h3 className='text-2xl'>Accommodation Reviews</h3>
						<div className='mb-24 pr-2 md:pr-0'>
							<ReviewList route={`accommodations/reviews/${unitData.accm_id}`} />
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Unit;
