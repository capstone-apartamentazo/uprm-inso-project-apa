import getConfig from 'next/config';

import Layout from '@/components/Layout';
import Card from '@/components/Card';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const About = () => {
	return (
		<Layout>
			<section>
				<div className='py-24 md:py-40 bg-gradient-to-r from-secondary to-accent'>
					<div className='prose prose-blue mx-auto text-center'>
						<h1 className='text-white'>About Us</h1>
					</div>
				</div>
				<div>
					<section className='text-start mt-14 m-10 md:mx-40 md:mt-20'>
						<h1 className='font-semibold text-3xl my-4'>What we do</h1>
						<div className='font-semibold text-gray-500 leading-10 space-y-4'>
							<p>
								At Apartamentazo, we understand the difficulties that come with finding suitable and affordable apartments near college campuses, and the stress that comes with being a landlord trying to reach potential tenants. That's why we've developed a platform that simplifies
								the apartment search process for both students and landlords alike.
							</p>
							<p>
								Our platform allows landlords to easily create and manage listings, track inquiries and messages, and send notices to tenants. For students, our platform offers a user-friendly interface that allows them to search for apartments based on their specific criteria, and
								easily communicate with their landlord.
							</p>
							<p>
								At Apartamentazo, we believe in creating a better experience for both landlords and students, streamlining the rental process to make it as smooth and stress-free as possible. With our platform, we aim to connect landlords and students in a way that is convenient,
								efficient, and reliable.
							</p>
						</div>
					</section>
				</div>
				<div>
					<section className='text-end m-10 md:mx-40'>
						<h1 className='font-semibold text-3xl my-4'>Our Team</h1>
						<p className='font-semibold text-gray-500 mt-4 leading-10'>
							We are a team of passionate individuals who are committed to simplifying the college apartment searching process. Our diverse backgrounds and experiences help us bring a fresh perspective to the industry, enabling us to create innovative solutions that meet the needs of
							both landlords and students.
						</p>
						<div className='items-center flex justify-center flex-wrap mt-10 mb-28 gap-5'>
							<Card title='César Amaro' description='Software Engineer' position='Front-end' picture='' />
							<Card title='Elliot Cardona' description='Software Engineer' position='Front-end' picture='' />
							<Card title='Daniel Crespo' description='Software Engineer' position='Back-end' picture='' />
							<Card title='Carlos Torres' description='Software Engineer' position='Back-end' picture='' />
						</div>
					</section>
				</div>
			</section>
		</Layout>
	);
};

export default About;
