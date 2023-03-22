import Card from './Card';

export default function Recent() {
	return (
		<section className='text-center m-10'>
			<h1 className='font-light text-4xl'>Explore Apartments in Mayagüez, PR</h1>
			<div className='items-center flex justify-center mt-10 mb-28 gap-5'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{/*TODO: Modify this so the inforamtion is fetched and passed as props? */}
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</section>
	);
}
