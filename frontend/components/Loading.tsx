import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loading from 'public/animations/Loading.json';

interface LoadingProps {
	size: number;
}

export const Loading: React.FC<LoadingProps> = ({ size }) => {
	const animationContainer = useRef(null);
	useEffect(() => {
		lottie.loadAnimation({
			container: animationContainer.current!,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: loading,
		});
	}, []);
	return (
		<div className='w-96 h-96 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-16'>
			<span ref={animationContainer}></span>
			<p className='text-4xl font-semibold text-accent -mt-16 animate-pulse'>Loading...</p>
		</div>
	);
};
