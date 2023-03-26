import getConfig from 'next/config';

import Layout from '@/components/Layout';
import Card from '@/components/Card';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const About = () => {
	return (
		<Layout>
			<section>
				<div className='py-40 bg-gradient-to-r from-secondary to-accent'>
					<div className='prose prose-blue mx-auto text-center'>
						<h1 className='text-white'>About Us</h1>
					</div>
				</div>
				<div>
					<section className='text-start m-10 mx-40 mt-20'>
						<h1 className='font-semibold text-3xl my-4'>What we do</h1>
						<p className='font-semibold text-gray-500 leading-10'>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
							five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
							including versions of Lorem Ipsum.
						</p>
					</section>
				</div>
				<div>
					<section className='text-end m-10 mx-40'>
						<h1 className='font-semibold text-3xl my-4'>Our Team</h1>
						<p className='font-semibold text-gray-500 mt-4 leading-10'>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.{' '}
						</p>
						<div className='items-center flex justify-center mt-10 mb-28 gap-5'>
							<Card title="César Amaro" description="Software Engineer" position="Front-end" picture="" />
							<Card title="Elliot Cardona" description="Software Engineer" position="Front-end" picture="" />
							<Card title="Daniel Crespo" description="Software Engineer" position="Back-end" picture="" />
							<Card title="Carlos Torres" description="Software Engineer" position="Back-end" picture="" />
						</div>
					</section>
				</div>
			</section>
		</Layout>
	);
};

export default About;
