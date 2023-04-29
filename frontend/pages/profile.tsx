import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Review from '@/components/Review';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router'



interface Storage {
    token: string,
    isLandlord: boolean,
    id: number
}


const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

const Profile = () => {
	const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
	const router = useRouter()

	useEffect(() => {


        if (localStorage.getItem('data') != null) {
            setStorage(JSON.parse(localStorage.getItem('data')!))
            var endpoint = 'http://127.0.0.1:5000/api/tenants/refresh'
            if (JSON.parse(localStorage.getItem('data')!).isLandlord) {
                endpoint = 'http://127.0.0.1:5000/api/landlords/refresh'

            }
            axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')!).token}` } })
                .then(res => res.data)
                .then(result => {
                    const obj = { 'token': result['access_token'], 'isLandlord': storage?.isLandlord, 'id': storage?.id };
                    const stringOBJ = JSON.stringify(obj);
                    localStorage.setItem('data', stringOBJ);
                })
                .then(() => {
                    console.log(localStorage.getItem('data')!)
                    setStorage(JSON.parse(localStorage.getItem('data')!))
                }

                )
                .catch(err => {
                    //localStorage.removeItem('data');
                    console.error(err);
                })
        } else {
            router.replace('/')
        }
    }, [])
	var endpoint = `http://127.0.0.1:5000/api/tenants/${storage.id}`
	if(storage.isLandlord){
		endpoint = `http://127.0.0.1:5000/api/landlords/${storage.id}`
	}
	

	const { data: user, error: userError, isLoading: isLoadingUser } = useSWR((storage.token != '') ? (storage.isLandlord ?  `http://127.0.0.1:5000/api/landlords/${storage.id}` : `http://127.0.0.1:5000/api/tenants/${storage.id}`) : null, (url:any) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => {
        
        return res.json()
    }));
	if(userError){
		console.error(userError);
	}
	if(!user){
		console.log(user);
	}
	if(isLoadingUser){
		return (<h1>Loading...</h1>)
	}
	if(storage.id ==0){
		return (
			<h1>Waiting for storage data...</h1>
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
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{storage.isLandlord ? user.landlord_name : user.tenant_name}</h5>
							<p className=' font-semibold pb-6 text-neutral-600 dark:text-neutral-200 '>Rating: {storage.isLandlord ? user.landlord_rating : user.tenant_rating}/5</p>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Phone:  {storage.isLandlord ? user.landlord_phone : user.tenant_phone}</li>
									<li className=' text-neutral-600 dark:text-neutral-200 '> {''  + storage.isLandlord ? 'Account type: Landlord' : ''}</li>
									
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-initial basis-1/4 pt-10 pl-4 w-9/12'>
					<div className='rounded-md p-6'>
						<h1 className=' text-3xl font-bold text-left  '>
							{' '}
							<a href='/' className='hover:underline'>
								Listings
							</a>
						</h1>
						<div className='carousel w-full pl-4 pt-4 pr-4 pb-4 space-x-4 rounded-box overscroll-auto'>
							<div className='carousel-item pl-1'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
							<div className='carousel-item'>
								<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
							</div>
						</div>
					</div>

					<div className='rounded-md p-6 max-w-full'>
						<h1 className=' text-3xl font-bold text-left  '>
							{' '}
							<a href='/' className='hover:underline'>
								Reviews ({reviewCount})
							</a>
						</h1>
						<div className='flex flex-col '>
							<Review listingTitle='2BR Condo ON THE BEACH! Restaurant- Pool- Hot Tub!' opinion='Had a great time and the place was great. The beach was beautiful and the place had everything we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Maya Williams' date='March 2022' userImg='/images/person.png'></Review>
							<Review listingTitle='Apartment ON THE BEACH! NO POOL' opinion='Had a horrible time and the place was nasty. There was no beach and the place had nothing we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Robin' date='May 2022' userImg='/images/person.png'></Review>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Profile;
