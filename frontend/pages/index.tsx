import getConfig from 'next/config';

import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Explore from '@/components/Explore';
import Features from '@/components/Features';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

let descriptions = {
	aptHunt: ' Our platform streamlines the process of finding suitable and affordable apartments near your campus, making it easier for you to focus on your studies.',
	access: 'Say goodbye to phone tag and missed messages. Our platform provides a simple and efficient way for tenants to communicate with their landlords and get the assistance they need.',
	reminders: 'Never miss a rent payment again! Our platform sends you timely reminders, so you can stay on top of your finances and avoid late fees.',
	listings: 'Our platform helps landlords manage their apartment listings in one place, so they can easily keep track of interested tenants and make the rental process smoother for everyone involved.',
};

const Home = () => {
	return (
		<Layout>
			<Hero />
			<Explore />
			<Features reverse='false' title='Simplifying your college apartment hunt' description={descriptions.aptHunt} />
			<Features reverse='true' title='Easy access to your landlord' description={descriptions.access} />
			<Features reverse='false' title='Payment reminders' description={descriptions.reminders} />
			<Features reverse='true' title='Keep track of your listings' description={descriptions.listings} />
		</Layout>
	);
};

export default Home;
