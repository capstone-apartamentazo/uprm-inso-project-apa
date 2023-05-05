import Link from 'next/link';
import Image from 'next/image';
import apartamentazo from '../public/images/apartamentazo.png';
import Login from './Login';
import Signup from './Signup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Storage } from 'Storage';
import { Token } from 'Token';

export default function Navbar(path: any) {
	var classes = '';
	const router = useRouter();
	const [navBar, setNavBar] = useState(<></>);

	const logout = async () => {
		cookies.remove('jwt_authorization');
		//localStorage.removeItem('data');
		router.replace('/');
		router.reload();
	};

	var leftSide = (
		<div className='flex-1 gap-4'>
			<Link href={'../'}>
				<span className='btn btn-ghost normal-case text-lg text-white'>
					<Image src={apartamentazo} width={200} height={200} alt={''}></Image>
				</span>
			</Link>
		</div>
	);

	var homeLeftSide = (
		<div className='flex-1 gap-4'>
			<Link href={'../'}>
				<span className='btn btn-ghost normal-case text-lg text-white'>Home</span>
			</Link>
			<Link href={'../about'}>
				<div className='btn btn-ghost text-lg text-white normal-case'>About Us</div>
			</Link>
		</div>
	);

	// INFO: Signed out / Default Navigation Bar
	var homeBar = (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes} z-10 bg-transparent`}>
			{homeLeftSide}
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
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
			</div>
		</div>
	);

	// INFO: Signed out / Default Navigatnon Bar
	var defaultBar = (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes} z-10`}>
			{leftSide}
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
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
			</div>
		</div>
	);

	// INFO: Navigation Bar for Signed In users
	var signedInBar = (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes} z-10`}>
			{leftSide}
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
				<div className='menu menu-horizontal px-1 gap-4'>
					<li>
						<Link href={'/'} className='text-accent normal-case font-semibold'>
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
						<Link href={'/messages'} className='normal-case font-semibold'>
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
								<Link href='/profile' className='justify-between'>
									Profile
								</Link>
							</li>
							<li>
								<Link href='/settings'>Settings</Link>
							</li>
							<li>
								<div onClick={logout} className='cursor-pointer'>
									Logout
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	var signedInHomeBar = (
		<div className={`navbar text-primary-content fixed px-16 py-5 ${classes} z-10`}>
			{homeLeftSide}
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
				<div className='menu menu-horizontal px-1 gap-4'>
					<li>
						<Link href={'/'} className='text-accent normal-case font-semibold'>
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
						<Link href={'/messages'} className='normal-case font-semibold'>
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
								<Link href='/profile' className='justify-between'>
									Profile
								</Link>
							</li>
							<li>
								<Link href='/settings'>Settings</Link>
							</li>
							<li>
								<div onClick={logout} className='cursor-pointer'>
									Logout
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	const [storage, setStorage] = useState<Storage>({ token: null, id: null, isLandlord: null });

	const cookies = new Cookies();
	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
			if (path.path === '/') setNavBar(signedInHomeBar);
			else setNavBar(signedInBar);
		} catch (err) {
			switch (path.path) {
				case '/':
					classes = 'bg-transparent';
					setNavBar(homeBar);
					break;
				case '/about':
					classes = '';
					setNavBar(defaultBar);
					break;
				case '/404':
					classes = 'shadow-md';
					setNavBar(defaultBar);
					break;
				default:
					classes = 'bg-transparent bg-opacity-30 backdrop-filter backdrop-blur-lg';
					setNavBar(defaultBar);
			}
			console.log('No tokens found in cookies');
		}
	}, []);

	return <>{navBar}</>;
}
