import Layout from '@/components/Layout';
import Link from 'next/link';
import lottie from 'lottie-web';
import animationData from 'public/animations/notfound.json';
import { useEffect, useRef } from 'react';

const NotFound = () => {
	const animationContainer = useRef(null);

	useEffect(() => {
		lottie.loadAnimation({
			container: animationContainer.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData,
		});
	}, []);

	return (
		<Layout>
			<main className='grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8'>
				<div className='text-center '>
					<div className='flex justify-center' ref={animationContainer}></div>
					<h1 className='mt-4 font-bold tracking-tight  text-secondary sm:text-4xl'>We apologize,</h1>
					<h1 className='mt-4 font-bold tracking-tight  text-secondary sm:text-4xl'>it looks like something went wrong...</h1>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link className='rounded-md border-2 border-primary  bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' href='/'>
							Go Home
						</Link>
						<Link className='rounded-md border-2 border-primary bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm  ' href='/'>
							Contact Us
						</Link>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default NotFound;
