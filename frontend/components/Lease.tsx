import React from 'react';
import Link from 'next/link';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

import getConfig from 'next/config';
import { useRouter } from 'next/router';

import { Token } from 'Token';
import { Storage } from 'Storage';
import { Unit } from 'Unit';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;
type Props = {
    
    
    start_date: string,
    end_date: string,
    price: number,
    unit_id: number,
    active:boolean

};

const Lease: React.FC<Props> = ({ start_date, end_date, price, unit_id , active}) => {
	const router = useRouter();
	const [accmId, setAccmId] = useState();
	const [unit, setUnit] = useState<Unit>();
	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null });
	//const [lease,setLease] = useState()
	//const [tenantId, setTenant] = useState(null)
	var startdate = '';
	var enddate = '';
	try {
		var startDateObj = new Date(start_date);
		startdate = (startDateObj.getMonth() > 8 ? startDateObj.getMonth() + 1 : '0' + (startDateObj.getMonth() + 1)) + '/' + (startDateObj.getDate() > 9 ? startDateObj.getDate() : '0' + startDateObj.getDate()) + '/' + startDateObj.getFullYear();
		var endDateObj = new Date(end_date);
		enddate = (endDateObj.getMonth() > 8 ? endDateObj.getMonth() + 1 : '0' + (endDateObj.getMonth() + 1)) + '/' + (endDateObj.getDate() > 9 ? endDateObj.getDate() : '0' + endDateObj.getDate()) + '/' + endDateObj.getFullYear();
	} catch (error) {
		console.error(error);
	}

	useEffect(() => {
		const cookies = new Cookies();

		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
		} catch (err) {
			console.error(err);
		}
	}, []);

	// useEffect(()=>{
	//     axios.get(`${host}/api/accommodation/${unit!.accm_id}`)
	//     .then((res)=>{
	//         return res.data
	//     })
	//     .then(result=>{
	//         setAccmId(result['accm_id'])
	//     })
	//     .catch(err=>{
	//         console.error(err)
	//     })

	// },[unit])

	// const deleteUnit = async (event: any) => {
	//     event.preventDefault()

	//     const config = {
	//         headers: { Authorization: `Bearer ${storage.token}` }
	//     };
	//     axios.post(`${host}/api/units/${unit!.accm_id}`, config)
	//         .then(res => {
	//             alert(res.data)
	//             mutate(`/api/accommodations/units/${a_id}`)
	//         })
	//         .catch(err => {
	//             console.error(err)
	//         })

	// }

	// const { data: leases, error: leaseError, isLoading: isLoadingLease } = useSWR((storage?.token != null) ? `${host}/api/units/leases/${id}` : null, (url: string) => fetch(url, {
	//     headers: {
	//         Authorization: `Bearer ${storage?.token}`
	//     }
	// }).then(res => {
	//     // mutate('http://127.0.0.1:5000/api/messages');

	//     return res.json()
	// }

	// )
	// .then(result=>{

	// })
	// )

	//console.log(leases.at(0).is_current_tenant)

	return (
		<div className='block max-w-full rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700'>
			<div className='p-4 flex menu-vertical align-middle'>
				<h1 className={active?'text-success text-left mb-2 text-xl font-semibold  dark:text-neutral-50':'text-error text-left mb-2 text-xl font-semibold  dark:text-neutral-50'}>{active?'Active':'Inactive'} Unit</h1>
				<h1 className='font-medium'>Start Date: {startdate}</h1>
				<h1 className='font-medium'>End Date: {enddate}</h1>
				<h1 className='font-semibold'>Price: ${price}</h1>

				<div className='flex items-center gap-2  mt-2'>
					<Link href={`/listings/${unit_id}`} className={'btn  text-white bg-primary hover:bg-secondary grow'}>
						Unit Details
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Lease;
