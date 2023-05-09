import { useListings } from '../useListings';
import Link from 'next/link';
import SpecialAccommodation from './SpecialAccommodation';
import { Accm } from 'Accm';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

export default function Explore() {
	let listings: JSX.Element[] = [];
	const { data, error } = useListings('search?input=Mayaguez&offset=0');

	if (error) return <div className='mt-20'></div>;
	if (!data || typeof data === 'string') return <div></div>;

	const prepareAddress = (road: string, city: string, state: string | null, country: string, zipcode: string) => {
		var address = road + ', ' + city + ', ' + country + ', ' + zipcode;
		if (state) {
			address = road + ', ' + city + ', ' + state + ', ' + country + ', ' + zipcode;
		}
		return address;
	};

	const top = data.slice(0, 4);
	try {
		top.map((accm: Accm) => {
			console.log(accm);
			listings.push(<SpecialAccommodation id={accm.accm_id} title={accm.accm_title} address={prepareAddress(accm.accm_street, accm.accm_city, accm.accm_state, accm.accm_country, accm.accm_zipcode)} description={accm.accm_description} host={host} />);
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<section className='text-center m-10 md:mt-24'>
			<h1 className=' text-black font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black h-auto'>explore apartments</h1>
			<p className='text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black '>we know finding the perfect apartment is important, so we made it easy for you.</p>
			<div className='items-center flex justify-center my-10 gap-5 flex-wrap'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{listings}
			</div>
			<Link className='btn btn-accent text-white mb-10' href='/listings/results?search=Mayaguez&filter=false'>
				View More
			</Link>
		</section>
	);
}
