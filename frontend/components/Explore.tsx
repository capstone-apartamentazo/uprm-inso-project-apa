import Listing from './Listing';
import { useListings } from '../useListings';

export default function Explore() {
	const { data, error } = useListings('accommodations/all');

	// TODO: Add loading cards, default error cards
	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	const top = data.slice(0, 4);
	let listings = [];

	top.map((accm) => {
		listings.push(<Listing key={accm['Accommodation ID']} title={accm['Accommodation Title']} address={accm['Street'] + ', ' + accm['City']} features={'Water & Internet included'} price={'$800'} href={''} />);
	});

	return (
		<section className='text-center m-10'>
			<h1 className='font-light text-4xl'>Explore Apartments in Mayagüez, PR</h1>
			<div className='items-center flex justify-center my-10 gap-5 flex-wrap'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{listings}
			</div>
			<button className='btn btn-accent text-white mb-18'>View More</button>
		</section>
	);
}
