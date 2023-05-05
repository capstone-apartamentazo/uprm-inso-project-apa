import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import useSWR, { mutate } from 'swr';
import { use, useEffect, useState } from 'react'
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;
const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

const Landlord = () => {
	const router = useRouter();
	const { id } = router.query;
	//const [landlordId, setLandlordId] = useState<any>(null)
	//const [landlord,setLandlord] = useState({deleted_flag: false,landlord_email: "",landlord_id: 0,landlord_name: "",landlord_password: "",landlord_phone: "",landlord_rating: "0.0"})

	useEffect(() => {
        try{

			
			axios.get(`${host}/api/landlords/${id}`)
			.then(res=>{
				return res.data
			})
			.then(result=>{
				console.log(result)
				//setLandlord(result)
			})
            
        }catch(err){
			console.error(err)
        }
    }, [id])

	

	const { data: accms, error: accmsError, isLoading: isLoadingAccms } = useSWR( `${host}/api/accommodations/landlord/${id}`, (url: string) => fetch(url).then(res => res.json()));

    

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
			<main className='flex flex-row flex-nowrap pt-24'>
				<div className='flex  flex-col flex-initial basis-1/4 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<div className=''>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<a href='/'><img className='aspect-square' src='/images/user.png' /></a>
								</div>
							</div>
						</div>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{uname}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '>Rating: {}/5</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Joined in {joined}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Lives in {location}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '>
										Speaks {languages[0]}, {languages[1]}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-initial basis-1/4 pt-10 pl-4 w-9/12'>
					<div className='rounded-md p-6'>
						<h1 className=' text-3xl font-bold text-left  '>
							
							<label className=''>
								Accommodations
							</label>
						</h1>
						
					</div>

					
				</div>
			</main>
		</Layout>
	);
};

export default Landlord;
