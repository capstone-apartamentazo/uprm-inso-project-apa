import getConfig from 'next/config';

import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Explore from '@/components/Explore';
import Features from '@/components/Features';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

let descriptions = {
	aptHunt: 'our platform streamlines the process of finding suitable and affordable apartments near your campus, making it easier for you to focus on your studies.',
	access: 'say goodbye to phone tag and missed messages. our platform provides a simple and efficient way for tenants to communicate with their landlords and get the assistance they need.',
	reminders: 'never miss a rent payment again! our platform sends you timely reminders, so you can stay on top of your finances and avoid late fees.',
	listings: 'our platform helps landlords manage their apartment listings in one place, so they can easily keep track of interested tenants and make the rental process smoother for everyone involved.',
};

const Home = () => {
	return (
		<Layout>
			<Hero />
			<Explore />
			<div className='bg-gray-100'>
				<div className='mt-20 mb-8 text-center text-black font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black h-auto'>
					renting made easy<p className='text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-black '>whether you're a student or landlord, this is the perfect place for you!</p>
				</div>
				<Features reverse='false' title='simplifying your college apartment hunt' description={descriptions.aptHunt} type='aptHunt' />
				<Features reverse='true' title='easy access to your landlord' description={descriptions.access} type='messaging' />
				<Features reverse='false' title='payment reminders' description={descriptions.reminders} type='reminders' />
				<Features reverse='true' title='keep track of your listings' description={descriptions.listings} type='listings' />
			</div>
		</Layout>
	);
};

export default Home;
