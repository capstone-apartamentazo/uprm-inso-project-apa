import Link from 'next/link';
import Image from 'next/image';
import apartamentazo from '../public/images/apartamentazo.png';

export default function Navbar(path: any) {
	var classes = '';

	switch (path.path) {
		case '/':
			classes = 'bg-transparent';
			break;
		case '/profile':
			classes = 'shadow-md bg-white';
			break;
		case '/about':
			classes = '';
			break;
		case '/404':
			classes = 'shadow-md';
			break;
		default:
			classes = 'bg-transparent';
	}
	/* bg-opacity-30 backdrop-filter backdrop-blur-lg */

	return (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes}`}>
			<div className='flex-1'>
				<Link href={'../'}>
					<span className='btn btn-ghost normal-case text-xl text-white'>
						<Image src={apartamentazo} width={200} height={200} alt={''}></Image>
					</span>
				</Link>
			</div>
			<div className='flex-none'>
				<ul className='menu menu-horizontal px-1 gap-4'>
					<li>
						<Link href={''} className='btn btn-accent btn-outline normal-case bg-white w-28 font-light'>
							Sign up
						</Link>
					</li>
					<li>
						<Link href={''} className='btn btn-accent btn-outline normal-case bg-white w-28 font-light'>
							Log in
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
