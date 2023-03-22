import Card from './Card';

export default function Features() {
	return (
		<section className='text-left m-10 bg-red-500 pt-10 px-10'>
			<h1 className='font-light text-4xl'>Features for X</h1>
			<div className='items-center flex justify-center mt-10 mb-28 gap-5 bg-black h-96'>
				{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
				{/*TODO: Modify this so the inforamtion is fetched and passed as props? */}
			</div>
		</section>
	);
}
