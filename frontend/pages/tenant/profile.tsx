import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Review from '@/components/Review';
import Image from 'next/image';

const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

const Profile = () => {
	return (
		<Layout>
			<main className='flex flex-row flex-nowrap pt-24'>
				<div className='flex  flex-col flex-initial basis-1/4 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<div className=''>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<a href='/'><img className='aspect-square' src='/images/user.png' /></a>
								</div>
							</div>
						</div>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{uname}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '>Rating: {rating}/5</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Joined in {joined}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Lives in {location}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '>
										Speaks {languages[0]}, {languages[1]}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-initial  pt-10 pl-4 w-9/12'>
					

					<div className='rounded-md p-6 w-full max-w-full'>
						<h1 className=' text-3xl font-bold text-left  '>
							{' '}
							<a href='/' className='hover:underline'>
								Reviews ({reviewCount})
							</a>
						</h1>
						<div className='flex flex-col '>
							{/* <Review listingTitle='2BR Condo ON THE BEACH! Restaurant- Pool- Hot Tub!' opinion='Had a great time and the place was great. The beach was beautiful and the place had everything we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Maya Williams' date='March 2022' userImg='/images/person.png'></Review> */}
							{/* <Review listingTitle='Apartment ON THE BEACH! NO POOL' opinion='Had a horrible time and the place was nasty. There was no beach and the place had nothing we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Robin' date='May 2022' userImg='/images/person.png'></Review> */}
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Profile;
