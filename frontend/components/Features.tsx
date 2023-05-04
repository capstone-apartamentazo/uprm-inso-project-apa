import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import listings from 'public/animations/listings.json';
import messaging from 'public/animations/messaging.json';
import aptHunt from 'public/animations/aptHunt.json';
import reminders from 'public/animations/reminders.json';

export default function Features(props: any) {
	const animationContainer = useRef(null);

	var type: any = {
		listings: listings,
		messaging: messaging,
		aptHunt: aptHunt,
		reminders: reminders,
	};

	useEffect(() => {
		lottie.loadAnimation({
			container: animationContainer.current!,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: type[props.type],
		});
	}, []);
	var classes = 'lg:flex-row';
	var animationClasses = 'w-[45rem] h-96';
	if (props.reverse === 'true') classes = 'lg:flex-row-reverse';
	if (props.type === 'aptHunt') animationClasses = 'w-[25rem] h-96';

	return (
		<div className='hero mb-10'>
			<div className={`hero-content flex-col ${classes} bg-white rounded-2xl shadow-md`}>
				<div className={animationClasses}>
					<span ref={animationContainer} className='h-full w-full'></span>
				</div>
				<div className='ml-5 pr-5'>
					<h1 className='text-4xl font-light'>{props.title}</h1>
					<p className='pt-6 text-xl text-gray-500'>{props.description}</p>
				</div>
			</div>
		</div>
	);
}
