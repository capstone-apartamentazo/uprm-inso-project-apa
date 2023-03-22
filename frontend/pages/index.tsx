import getConfig from 'next/config';

import Layout from '@/components/Layout';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Recent from '@/components/Recent';
import Features from '@/components/Features';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
	return (
		<Layout>
			<Hero />
			<Recent />
			<Features />
			<section className='text-right m-10 bg-red-500 pt-10 px-10'>
				<h1 className='font-light text-4xl'>Features for Y</h1>
				<div className='items-center flex justify-center mt-10 mb-28 gap-5 bg-black h-96'>
					{/* TODO: This section changes based on whether the user is signed in or not, is a landlord, or is a student */}
					{/*TODO: Modify this so the inforamtion is fetched and passed as props? */}
				</div>
			</section>
		</Layout>
	);
};

export default Home;
