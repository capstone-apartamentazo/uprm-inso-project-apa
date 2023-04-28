import Listing from './Listing';
import { useListings } from '../useListings';
import Link from 'next/link';

interface Listing {
	'Accommodation ID': number;
	'Accommodation Title': string;
	Street: string;
	City: string;
}

export default function Explore() {
	let listings: JSX.Element[] = [];
	const { data, error } = useListings('accommodations/all');

	// TODO: Add loading cards, default error cards
	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	const top = data.slice(0, 4);

	try {
		top.map((accm: Listing) => {
			listings.push(<Listing key={accm['Accommodation ID']} title={accm['Accommodation Title']} address={accm['Street'] + ', ' + accm['City']} features={'Water & Internet included'} price={'$800'} href={''} />);
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<section className='text-center m-10'>
			<h1 className='font-light text-4xl'>Explore Apartments in Mayagüez, PR</h1>
			<div className='items-center flex justify-center my-10 gap-5 flex-wrap'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{listings}
			</div>
			<Link className='btn btn-accent text-white mb-18' href='/listings/results?search=Mayaguez'>
				View More
			</Link>
		</section>
	);
}
