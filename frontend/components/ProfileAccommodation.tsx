import React from 'react';
import Link from 'next/link';
import {  useEffect, useState } from 'react'
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;
type Props = {
    title: string,
    address: string,
    id: number
};

const ProfileAccommodation: React.FC<Props> = ({ title, address, id }) => {
    const [accmImg, setAccmImg] = useState('')



    useEffect(()=>{
        axios.get(`${host}/api/images/accommodation/${id}`)
					.then(res =>{
						return res.data
					})
					.then(result =>{
						//console.log(result[0])
						return result[0]
					})
					.then(result =>{
						setAccmImg(result['secure_url'])
					}).catch(err=>console.error(err))
    },[])

    const deleteAccommodation = async (event: any)=>{
        event.preventDefault()
        axios.delete(`${host}/api/accommodations/${id}`)
        .then(res=>alert(res))
        .catch(err=>alert(err))

    }




    return (
        <div className='flex justify-center w-72 '>
            
                <div className='block max-w-full rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700 '>
                    <img className='rounded-t-lg aspect-video h-56' src={accmImg} alt='' />
                    <div className='p-4 flex menu-vertical h-36 align-middle'>
                        <h1 className='text-left mb-2 text-xl font-semibold leading-tight w-56   truncate text-neutral-800 dark:text-neutral-50'>{title}</h1>
                        <div className='text-left text-base text-neutral-600 dark:text-neutral-200 flex align-middle gap-1 '>
                            <span>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                                </svg>
                            </span>
                            {address}
                        </div>
                        <div className='flex items-center gap-2 mx-2 mt-2'>
                            <Link href={{
                                pathname: '/units',
                                query: {accmid:id} // the data
                            }} className='btn ring-1 ring-accent text-accent hover:bg-white hover:shadow-md hover:ring-2 grow'>Units</Link>

                            <Link href={{
                                pathname: '/accommodations/edit',
                                query: {accmId:id} // the data
                            }} className='btn ring-1 ring-primary hover:bg-white hover:shadow-md  hover:ring-2  grow'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                            </Link>
                            <button onDoubleClick={deleteAccommodation} className='btn ring-1 ring-red-500 hover:bg-white hover:shadow-md  hover:ring-2 grow '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </button>
                        </div>

                    </div>
                </div>
            
        </div>
    );
};
export default ProfileAccommodation;
