import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import useSWR, { mutate } from 'swr';
import {  useEffect, useState } from 'react'
import axios from 'axios';
import { Accm } from 'Accm';
import Accommodation from '@/components/Accommodation';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;


const Landlord = () => {
	const router = useRouter();
	const { id } = router.query;
	//const [landlordId, setLandlordId] = useState<any>(null)
	const [landlord, setLandlord] = useState({ deleted_flag: false, landlord_email: "", landlord_id: 0, landlord_name: "", landlord_password: "", landlord_phone: "", landlord_rating: "0.0" })
	const [landlordImg, setLandlordImg] = useState('/images/default.jpeg')
	useEffect(() => {
		if (id != null) {
			


				axios.get(`${host}/api/landlords/${id}`)
					.then(res => {
						return res.data
					})
					.then(result => {
						console.log(result)
						setLandlord(result)
					}).catch(err=>{
						console.error(err)
					})

				axios.get(`${host}/api/images/landlord/${id}`)
					.then(res =>{
						return res.data
					})
					.then(result =>{
						//console.log(result['resources'][0])
						return result['resources'][0]
					})
					.then(result =>{
						setLandlordImg(result['secure_url'])
					}).catch(err=>console.error(err))

			
		}
	}, [id])



	const { data: accms, error: accmsError, isLoading: isLoadingAccms } = useSWR(`${host}/api/accommodations/landlord/${id}`, (url: string) => fetch(url).then(res => res.json()));



	if (accmsError) {
		return <h1>Error</h1>
	}
	if (isLoadingAccms) return (
		<div>
			<h1>Loading...</h1>

		</div>
	)
	if (!accms || accms == 'Accommodations Not Found') {
		return (
			<div className='mt-3'>

				<h1 className='font-normal text-xl text-black'>No properties listed.</h1>
			</div>
		)
	}










	return (
		<Layout>
			<main className='flex flex-col lg:flex-row  flex-nowrap my-24'>
				<div className='flex  flex-col flex-initial basis-1/6 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<div className=''>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<a href='/'><img className='aspect-square' src={landlordImg} /></a>
								</div>
							</div>
						</div>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{landlord.landlord_name}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '>Rating: { landlord.landlord_rating}/5</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Phone: {landlord.landlord_phone}</li>
									
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-initial relative basis-5/6 mt-10 pl-6 pr-6 max-h-semi min-w-min  m-6 ring-1 ring-stone-200 rounded-md bg-white shadow-lg overflow-hidden'>
					<div className='text-3xl font-bold text-left pt-6 px-6 rounded-md absolute bg-white top-0 left-0 right-0 '>
						
								Accommodations
						

					</div>
					<div className='flex flex-wrap gap-4 mr-2 mt-20 p-4 mb-6 overflow-auto'>
						{accms.map((accm: Accm) => (

							<Accommodation title={accm.accm_title} address={accm.accm_street} features={accm.accm_city} price={'100'} href='/' />

						))}

					</div>



				</div>
			</main>
		</Layout>
	);
};

export default Landlord;
