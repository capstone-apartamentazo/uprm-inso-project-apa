import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Review from '@/components/Review';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link';
import AccommodationList from '@/components/AccommodationList';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Storage } from 'Storage';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;





const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

const Profile = () => {
	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: null, id: null })
	const router = useRouter()
	const cookies = new Cookies()
	const [profileImg, setProfileImg] = useState<string|any>('/images/user.png')
	const [imgLoading, setImageLoading] = useState(false)

	useEffect(() => {


		try {
			const token = cookies.get('jwt_authorization')
			const decoded = jwt<Token>(token)
			setStorage({ 'token': token, 'id': decoded['id'], 'isLandlord': ((decoded['rls'] == "landlord") ? true : false) })
			var endpoint = `${host}/api/tenants/refresh`

			if (storage.isLandlord) {
				endpoint = `${host}/api/landlords/refresh`



			}
			axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${token}` } })
				.then(res => {
					return res.data
					//const obj = {'token':res.data,}
					//localStorage.setItem('data',res.data)
				})
				.then(result => {
					const newToken = result['access_token']
					const newDecoded = jwt<Token>(newToken)

					cookies.set("jwt_authorization", result['access_token'], {
						expires: new Date(newDecoded.exp * 1000),
					})
					setStorage({ 'token': newToken, 'id': newDecoded['id'], 'isLandlord': ((newDecoded['rls'] == "landlord") ? true : false) })
				})

				.catch(err => {
					//localStorage.removeItem('data');
					console.log('in')
					console.error(err);
				})




		} catch (err) {
			router.replace('/')
			console.log('out')
			console.error(err)

		}
	}, [])

	useEffect(() => {
		var imgEndpoint = `${host}/api/images/tenant/${storage.id}`

		if (storage.isLandlord != null) {
			if (storage.isLandlord) {
				imgEndpoint = `${host}/api/images/landlord/${storage.id}`
			}
			//alert(imgEndpoint)
			//alert(storage.isLandlord)
			setImageLoading(true)

			axios.get(imgEndpoint)
				.then(res => {
					return res.data
				})
				.then(result => {
					console.log(result)
					console.log(result['resources'][0])
					return result['resources'][0]
				})
				.then(result => {
					setProfileImg(result['secure_url'])
					setImageLoading(false)
				}).catch(err => {
					console.error(err)
					setImageLoading(false)
				})


		}

	}, [storage])




	const uploadImg = async (event:any)=>{
		event.preventDefault()
		if (event.target.files[0].size > 10485759) {
            alert('Image size too big. Max size is 10 Mb')
            
        } else {
            const reader = new FileReader();
			
            reader.onload = () => {
				let data = {
				
					"image": reader.result,
					
				}
				var endpoint = `${host}/api/images/tenant`
				if(storage.isLandlord){
					endpoint = `${host}/api/images/landlord`
				}
				axios({method: 'post',url:endpoint,headers: { Authorization: `Bearer ${storage.token}`},data})
				.then(res=>{
					
					
					setProfileImg(reader.result)
					//alert(res)
				})
				.catch(err=>{
					console.error(err)
					alert(err)
				})


                
				//router.reload()

            }
            reader.readAsDataURL(event.target.files[0])
        }
	}

	// var endpoint = `http://127.0.0.1:5000/api/tenants/${storage.id}`
	// if (storage.isLandlord) {
	// 	endpoint = `http://127.0.0.1:5000/api/landlords/${storage.id}`
	// }


	const { data: user, error: userError, isLoading: isLoadingUser } = useSWR((storage.token != null) ? (storage.isLandlord ? `${host}/api/landlords/${storage.id}` : `${host}/api/tenants/${storage.id}`) : null, (url: any) => fetch(url, {
		headers: {
			Authorization: `Bearer ${storage?.token}`
		}
	}).then(res => res.json()));

	if (userError) {
		console.error(userError);

	}
	if (!user) {
		console.log(user);
	}
	if (isLoadingUser) {
		return (<h1>Loading...</h1>)
	}
	if (storage.id == null) {
		return (
			<div>
				<h1>Error found</h1>
				<button onClick={() => { { cookies.remove('jwt_authorization') } }} className="btn border-2 mr-4">Logout</button>
			</div>
		)
	}
	if (!(storage.isLandlord)) {
		return (
			<Layout>
			<main className='flex flex-col lg:flex-row  flex-nowrap py-24'>
				<div className='flex  flex-col flex-initial basis-1/6 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<form className=' relative'>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<label htmlFor='pImg'>
										<img className={imgLoading ? 'aspect-square animate-pulse' : 'aspect-square'} src={profileImg} />
									</label>
									<input onChange={uploadImg} type='file' id='pImg' accept="image/png, image/jpeg" className='hidden'></input>
								</div>
							</div>
							{/* <button className='btn absolute right-0 top-0 bg-transparent border-transparent	hover:bg-transparent hover:border-transparent'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6 stroke-green-500">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>

							</button> */}
						</form>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{storage.isLandlord ? user.landlord_name : user.tenant_name}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '> {storage.isLandlord ? ('Rating:' + user.landlord_rating + '/5') :''}</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Phone:  {storage.isLandlord ? user.landlord_phone : user.tenant_phone}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '> {storage.isLandlord ? 'Account type: Landlord' : 'Account type: Normal'}</li>
									<li className='text-neutral-600 dark:text-neutral-200 '>{storage.isLandlord ? '':`ID: ${storage.id}`}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex relative flex-col flex-initial basis-5/6 mt-10 pl-6 pr-6 max-h-semi min-w-min  m-6 ring-1 ring-stone-200 rounded-md bg-white shadow-lg overflow-hidden '>


					<div className='flex flex-wrap text-3xl font-bold text-left pt-6 pb-2 px-6 rounded-md absolute  bg-white top-0 left-0 right-0 items-center'>
						<h1 className=' text-3xl font-bold text-left  grow'>
							Active Contracts

						</h1>
						
					</div>
					// <AccommodationList></AccommodationList>




				</div>
			</main>
		</Layout>

		)
	}

	return (
		<Layout>
			<main className='flex flex-col lg:flex-row  flex-nowrap py-24'>
				<div className='flex  flex-col flex-initial basis-1/6 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<form className=' relative'>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<label htmlFor='pImg'>
										<img className={imgLoading ? 'aspect-square animate-pulse' : 'aspect-square'} src={profileImg} />
									</label>
									<input onChange={uploadImg} type='file' id='pImg' accept="image/png, image/jpeg" className='hidden'></input>
								</div>
							</div>
							{/* <button className='btn absolute right-0 top-0 bg-transparent border-transparent	hover:bg-transparent hover:border-transparent'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6 stroke-green-500">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>

							</button> */}
						</form>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{storage.isLandlord ? user.landlord_name : user.tenant_name}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '> {storage.isLandlord ? ('Rating:' + user.landlord_rating + '/5') : ''}</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Phone:  {storage.isLandlord ? user.landlord_phone : user.tenant_phone}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '> {storage.isLandlord ? 'Account type: Landlord' : ''}</li>

								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex relative flex-col flex-initial basis-5/6 mt-10 pl-6 pr-6 max-h-semi min-w-min  m-6 ring-1 ring-stone-200 rounded-md bg-white shadow-lg overflow-hidden '>


					<div className='flex flex-wrap text-3xl font-bold shadow-md text-left pt-6 pb-2 px-6 rounded-md absolute  bg-white top-0 left-0 right-0 items-center '>
						<h1 className=' text-3xl font-bold text-left  grow'>
							My Accommodations

						</h1>
						<div className='flex  items-center '>
							<Link href='/accommodations/new' className='btn font-semibold bg-primary text-white hover:bg-secondary'>Add Accommodation</Link>
						</div>
					</div>
					<AccommodationList></AccommodationList>




				</div>
			</main>
		</Layout>
	);
};

export default Profile;
/*
<div className='flex flex-nowrap gap-4  pt-4 pr-4 pb-4'>
							<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />
							<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />
							<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />
							<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />

							<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />
							<Link href='/' className=' flex flex-col bg-white justify-center  w-40 rounded-md  shadow-md ring-1 ring-stone-200 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200 cursor-pointer'>
								<div className='text-center '>
									<h1 className='font-semibold text-xl text-black'>All Units</h1>


								</div>
								<div className='flex flex-col items-center'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 stroke-black">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
									</svg>
								</div>

							</Link>


						</div>*/