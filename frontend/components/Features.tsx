import Card from './Card';
import Hunt from '../public/images/features-hunt.gif';
import Image from 'next/image';

export default function Features(props: any) {
	var classes = 'lg:flex-row';

	if (props.reverse === 'true') classes = 'lg:flex-row-reverse';

	return (
		<div className='hero my-10'>
			<div className={`hero-content flex-col ${classes}`}>
				<Image src={Hunt} alt='' height={250} width={250} className='max-w-sm' />
				<div className='ml-10 pr-10'>
					<h1 className='text-4xl font-light'>{props.title}</h1>
					<p className='py-6'>{props.description}</p>
				</div>
			</div>
		</div>
	);
}
