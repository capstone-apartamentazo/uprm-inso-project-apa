import Link from 'next/link';
import Image from 'next/image';
import apartamentazo from '../public/images/apartamentazo.png';
import Login from './Login';
import Signup from './SignUp';
import { sign } from 'crypto';
import { useEffect, useState } from 'react';

export default function Navbar(path: any) {
	var classes = '';
	//var navBar = <></>;
	const [navBar, setNavBar] = useState(<></>)
	// INFO: Signed out / Default Navigation Bar
	var defaultBar = (
		<ul className='menu menu-horizontal px-1 gap-4'>
			<li>
				<a href='#signup-modal' className='btn btn-accent btn-outline normal-case bg-white w-28'>
					Sign up
				</a>
			</li>
			<li>
				<a href='#login-modal' className='btn btn-accent btn-outline normal-case bg-white w-28'>
					Log in
				</a>
			</li>
		</ul>
	);


	// INFO: Navigation Bar for Signed In users
	var signedInBar = (
		<div className='menu menu-horizontal px-1 gap-4'>
			<li>
				<Link href={''} className='text-accent normal-case font-semibold'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 -mr-1'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819'
						/>
					</svg>
					Home
				</Link>
			</li>
			<li>
				<Link href={''} className='normal-case font-semibold'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 -mr-1'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
						/>
					</svg>
					Messages
				</Link>
			</li>
			<div className='dropdown dropdown-end'>
				<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
					<div className='w-10 rounded-full'>
						<img src='/images/person.png' />
					</div>
				</label>
				<ul tabIndex={0} className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-auto items-center'>
					<li>
						<a className='justify-between'>Profile</a>
					</li>
					<li>
						<a>Logout</a>
					</li>
				</ul>
			</div>
		</div>
	);

	// switch (path.path) {
	// 	case '/':
	// 		classes = 'bg-transparent';
	// 		navBar = defaultBar;
	// 		break;
	// 	case '/profile':
	// 		classes = 'shadow-md bg-white';
	// 		navBar = signedInBar;
	// 		break;
	// 	case '/about':
	// 		classes = '';
	// 		navBar = defaultBar;
	// 		break;
	// 	case '/404':
	// 		classes = 'shadow-md';
	// 		navBar = defaultBar;
	// 		break;
	// 	default:
	// 		classes = 'bg-transparent';
	// 		navBar = defaultBar;
	// }
	/* bg-opacity-30 backdrop-filter backdrop-blur-lg */

	
	var data: {}
	useEffect(() => {
		if(localStorage.getItem('data') != null){
			data = localStorage.getItem('data')!
			setNavBar(signedInBar);
			
		}else{
			setNavBar(defaultBar);
			
		}
		
	}, [])

	


	return (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes} z-10`}>
			<div className='flex-1'>
				<Link href={'../'}>
					<span className='btn btn-ghost normal-case text-xl text-white'>
						<Image src={apartamentazo} width={200} height={200} alt={''}></Image>
					</span>
				</Link>
			</div>
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
				{navBar}
			</div>
		</div>
	);
}
