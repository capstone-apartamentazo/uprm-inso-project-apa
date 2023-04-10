import Card from './Card';
import Listing from './Listing';

export default function Recent() {
	return (
		<section className='text-center m-10'>
			<h1 className='font-light text-4xl'>Explore Apartments in Mayagüez, PR</h1>
			<div className='items-center flex justify-center my-10 gap-5 flex-wrap'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				<Listing title={'Icon Condominium'} address={'6V45+26C, Calle Bosque, Mayagüez, 00680'} features={'Water & Internet included'} price={'$800'} href={''} />
				<Listing title={'Bosque 51'} address={'51 Calle Bosque, Mayagüez'} features={'Pets allowed'} price={'$700'} href={''} />
				<Listing title={'67 Acacias'} address={'67 Calle Acacias, Mayagüez, 00680'} features={'Free Wi-Fi'} price={'$275'} href={''} />
				<Listing title={'Bosque 65'} address={'65 Calle Bosque, Mayagüez, 00680'} features={'2 bed - 2 baths - Utilities - Wifi'} price={'$475'} href={''} />
			</div>
			<button className='btn btn-accent text-white mb-18'>View More</button>
		</section>
	);
}
