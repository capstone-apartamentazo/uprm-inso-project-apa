import React from 'react';
import Link from 'next/link';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

import { Token } from 'Token';
import { Storage } from 'Storage';
import { LeaseType } from 'Lease';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;
type Props = {
	num?: string;
	status?: boolean;
	a_id?: number;
	id: number;
};

interface Tenant {
	deleted_flag: boolean;
	tenant_email: string;
	tenant_id: number;
	tenant_name: string;
	tenant_password: string;
	tenant_phone: string;
}

const Unit: React.FC<Props> = ({ num, status, a_id, id }) => {
	const router = useRouter();

	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null });
	const [available, setAvailable] = useState(true);
	const [tenant, setTenant] = useState<Tenant>();
	const [lease,  setLease] = useState<LeaseType>();

	useEffect(() => {
		const cookies = new Cookies();

        try {
            const token = cookies.get('jwt_authorization')
            const decoded = jwt<Token>(token)
            setStorage({ 'token': token, 'id': decoded['id'], 'isLandlord': ((decoded['rls'] == "landlord") ? true : false) })
        } catch (err) {
            console.error(err)

        }
        axios.get(`${host}/api/units/leases/${id}`)
            .then(res => {
                return res.data
            })
            .then(result => {
                //console.log(result[0])
                if (result === "Leases from Units Not Found") {
                    console.log(`Unit [${id}] has no leases`)
                    setAvailable(true)
                } else {

                    result.map((lease: LeaseType) => {

                        if (lease.is_current_tenant&&available) {

                            setAvailable(false)
                            setLease(lease)

                            if (lease['tenant_id'] > 0) {
                                axios.get(`${host}/api/tenants/${lease['tenant_id']}`)
                                    .then(res => {
                                        return res.data
                                    })
                                    .then(result => {

                                        setTenant(result)
                                        //setTenantName(result['tenant_name'])
                                        //return result
                                    })
                                    .catch(err => console.error(err))
                            }
                            
                        }
                    })

                }


            })
            // .then(lease => {
            //     console.log('now')
            //     console.log(lease)
            //     if(lease){


            //             //console.log(result['tenant_id'])
            //             setAvailable(false)
            //             setLease(lease)

            //         if(lease['tenant_id']>0){
            //             axios.get(`${host}/api/tenants/${lease['tenant_id']}`)
            //             .then(res => {
            //                 return res.data
            //             })
            //             .then(result => {

            //                 setTenant(result)
            //                 //setTenantName(result['tenant_name'])
            //                 //return result
            //             })
            //             .catch(err => console.error(err))
            //         }

            //     }




            // })
            .catch(err => console.error(err))
    }, [])




    const deleteUnit = async (event: any) => {
        event.preventDefault()

        const config = {
            headers: { Authorization: `Bearer ${storage.token}` }
        };
        axios.delete(`${host}/api/units/${id}`, config)
            .then(res => {
                alert(res.data)
                mutate(`/api/accommodations/units/${a_id}`)
            })
            .catch(err => {
                console.error(err)
            })

    }

    const removeTenant = async (event: any) => {
        event.preventDefault()
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const config = {
            headers: { Authorization: `Bearer ${storage.token}` }
        };
        console.log(lease)
        console.log(formattedDate)
        const data = {
            "lease_id": lease?.lease_id,
            "unit_id": lease?.unit_id,
            "tenant_id": lease?.tenant_id,
            "price": lease?.price,
            "is_current_tenant": false,
            "init_date": new Date(lease?.init_date!).toISOString().split('T')[0],
            "end_date": formattedDate
        }
        axios.put(`${host}/api/leases`, data, config)
            .then(res => {
                alert(res.data)
                router.reload()
            })
            .catch(err => {
                console.error(err)
            })

    }

    

    //console.log(leases.at(0).is_current_tenant)

    return (


        <div className='block max-w-full rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700'>
            <div className='p-4 flex menu-vertical align-middle'>
                <h1 className='text-left mb-2 text-xl font-semibold  dark:text-neutral-50'>Unit {`${num}`}</h1>
                <h1>Status: {available ? ' Available' : ' Occupied'}</h1>
                <h1 className={!available ? '' : ''}>Tenant: {tenant ? tenant.tenant_name : 'N/A'}</h1>
                <h1>Tenant email: {tenant ? tenant.tenant_email : 'N/A'}</h1>

				<div className='flex items-center gap-2  mt-2'>
					<Link
						href={{
							pathname: '/units/addTenant',
							query: { unitId: id }, // the data
						}}
						className={available ? 'btn  text-white bg-accent hover:bg-accent-focus grow' : 'hidden'}>
						Add Tenant
					</Link>
					<button onClick={removeTenant} className={available ? 'hidden' : 'btn  text-white bg-error hover:bg-red-800  grow'}>
						Remove Tenant
					</button>
					<Link
						href={{
							pathname: '/units/edit',
							query: { unitId: id }, // the data
						}}
						className='btn bg-primary hover:bg-secondary grow'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-6 h-6 stroke-white'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
							/>
						</svg>
					</Link>
					<div className='tooltip tooltip-error' data-tip='Double click to delete'>
						<button onDoubleClick={deleteUnit} className='btn bg-error hover:bg-red-800  grow '>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-6 h-6 stroke-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Unit;
