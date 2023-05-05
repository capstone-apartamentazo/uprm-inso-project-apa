import Listing from './Accommodation';
import { useListings } from '../useListings';
import Link from 'next/link';

interface Listing {
	accm_id: number;
	accm_title: string;
	accm_street: string;
	accm_city: string;
}

export default function Explore() {
	let listings: JSX.Element[] = [];
	const { data, error } = useListings('accommodations/all');

	if (error) return <div className='mt-20'></div>;
	if (!data || typeof data === 'string') return <div></div>;

	const top = data.slice(0, 4);
	try {
		top.map((accm: Listing) => {
			listings.push(<Listing key={accm.accm_id} title={accm.accm_title} address={accm.accm_street + ', ' + accm.accm_city} features={'Water & Internet included'} price={'$800'} href={''} />);
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<section className='text-center m-10 mt-24'>
			<h1 className=' text-black font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black h-auto'>explore apartments</h1>
			<p className='text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black '>we know finding the perfect apartment is important, so we made it easy for you.</p>
			<div className='items-center flex justify-center my-10 gap-5 flex-wrap'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{listings}
			</div>
			<Link className='btn btn-accent text-white mb-10' href='/listings/results?search=Mayaguez'>
				View More
			</Link>
		</section>
	);
}
