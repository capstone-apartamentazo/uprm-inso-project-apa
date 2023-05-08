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
import getConfig from 'next/config';
import { handleModal } from 'helpers/handleModal';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

export default function Navbar(path: any) {
	const router = useRouter();
	const [nav, setNav] = useState({ left: <></>, right: <></> });
	const [classes, setClasses] = useState('');
	const [logged,setLogged] = useState(true)

	useEffect(()=>{

		if(!logged){
			router.replace('/');

		}
		
	},[logged])

	const logout = async () => {
		cookies.remove('jwt_authorization');
		setLogged(false)
		//localStorage.removeItem('data');
		setupNav(false, '/images/user.png');
		//router.replace('/');
		// router.reload();
	};

	function setupNav(signedIn: boolean, pic: string) {
		console.log(path.path);
		path.path === '/about' || path.path === '/' || path.path === '/#' ? setClasses('navbar text-primary-content fixed md:px-16 md:py-5 z-10') : setClasses('navbar text-primary-content fixed md:px-16 md:py-5 z-10 bg-white');
		setNav({
			left:
				path.path === '/' ? (
					<div className='flex-1 gap-4'>
						<div className='dropdown'>
							<label tabIndex={0} className='btn btn-ghost md:hidden text-white'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
								</svg>
							</label>
							<ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 shadow-md bg-base-100 rounded-box w-52'>
								<li>
									<a>Home</a>
								</li>
								<li>
									<a className='justify-between'>About Us</a>
								</li>
								<li>
									<a>Messages</a>
								</li>
							</ul>
						</div>
						<Link href={'../'} className='invisible md:visible'>
							<span className='btn btn-ghost normal-case text-lg text-white'>Home</span>
						</Link>
						<Link href={'../about'} className='invisible md:visible'>
							<div className='btn btn-ghost text-lg text-white normal-case'>About Us</div>
						</Link>
					</div>
				) : (
					<div className='flex-1 gap-4'>
						<div className='dropdown md:hidden'>
							<label tabIndex={0} className='btn btn-ghost md:hidden text-black'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
								</svg>
							</label>
							<ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 shadow-md bg-base-100 rounded-box w-52'>
								<li>
									<a>Home</a>
								</li>
								<li>
									<a className='justify-between'>About Us</a>
								</li>
								<li>
									<a>Messages</a>
								</li>
							</ul>
						</div>
						<Link href={'../'} className='invisible md:visible '>
							<span className='btn btn-ghost normal-case text-lg text-white'>
								<Image src={apartamentazo} width={200} height={200} alt={''}></Image>
							</span>
						</Link>
					</div>
				),
			right: signedIn ? (
				<div className='menu menu-horizontal px-1 gap-4'>
					{path.path != '/' ? (
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
					) : (
						<></>
					)}
					<li className={path.path === '/' ? `text-white` : ``}>
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
								<img src={pic} className='object-cover' />
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
			) : (
				<ul className='menu menu-horizontal px-1 gap-4'>
					<li>
						<a onClick={() => handleModal('signup-modal')} className='btn btn-accent btn-outline normal-case bg-white w-28'>
							Sign up
						</a>
					</li>
					<li>
						<a onClick={() => handleModal('login-modal')} className='btn btn-accent btn-outline normal-case bg-white w-28'>
							Log in
						</a>
					</li>
				</ul>
			),
		});
	}

	const [storage, setStorage] = useState<Storage>({ token: null, id: null, isLandlord: null });

	const cookies = new Cookies();
	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });

			const endpoint = `${host}/api/images/${decoded['rls'] == 'landlord' ? 'landlord' : 'tenant' }/${decoded['id']}`;

			const options = {
				method: 'GET',
				headers: new Headers({ 'content-type': 'application/json' }),
			};

			fetch(endpoint, options)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					setupNav(true, data.resources[0].secure_url);
				})
				.catch((err) => {
					setupNav(true, '/images/user.png');
				});
		} catch (err) {
			console.log('No tokens found in cookies');
			setupNav(false, '/images/user.png');
		}
	}, []);

	return (
		<div className={classes}>
			{nav.left}
			<div className='flex-none'>
				{' '}
				<Login />
				<Signup />
				<div className='menu menu-horizontal px-1 gap-4'>{nav.right}</div>
			</div>
		</div>
	);
}
