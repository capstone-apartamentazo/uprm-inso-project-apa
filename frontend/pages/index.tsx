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
			<Features reverse='false' title='Simplifying your college apartment hunt' description='Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.' />
			<Features reverse='true' title='Easy access to your landlord' description='Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.' />
			<Features reverse='false' title='Payment reminders' description='Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.' />
			<Features reverse='true' title='Keep track of your listings' description='Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.' />
		</Layout>
	);
};

export default Home;
