import React, { useEffect, useState } from 'react';
import { useListings } from 'useListings';
import UnitList from './[deprecated]UnitList'
import useSWR, { mutate } from 'swr';
import { Unit } from "../Unit"
import axios from 'axios';
import Link from 'next/link';



type Props = {
    id: number;
    title: string;
    address: string;
    description: string;
    host: string;
};

interface shAmenitiesType {
    "accm_id": number,
    "deleted_flag": boolean,
    "shared_amenities_id": number,
    "shared_bathroom": boolean,
    "shared_dryer":boolean,
    "shared_kitchen": boolean,
    "shared_washer": boolean,
    "pets_allowed": boolean
}

const SpecialAccommodation: React.FC<Props> = ({ id, title, address, description, host }) => {
    // const { data, error } = useListings('images/accommodation/' + id);
    // let pic: string;

    // if (error) return <div className='mt-20'></div>;
    // if (!data || typeof data === 'string' || data.length === 0) pic = '/images/default.jpg';
    // else pic = data[0].secure_url;

    const [accmImg, setAccmImg] = useState('/images/default.jpg')

    useEffect(() => {
        axios.get(`${host}/api/images/accommodation/${id}`)
            .then(res => {
                return res.data
            })
            .then(result => {
                //console.log(result[0])
                return result[0]
            })
            .then(result => {
                setAccmImg(result['secure_url'])
            }).catch(err => console.error(err))

    }, [host])

    

    const [openUnits, setOpenUnits] = useState(false)



    var unitList: [] = []
    const { data: units, error: unitsError, isLoading: isLoadingUnits } = useSWR(`${host}/api/accommodations/units/${id}`, (url: string) => fetch(url, {
    }).then(res =>
        // mutate('http://127.0.0.1:5000/api/messages');

        res.json()
    ));
    if (!units || units == 'Units Not Found in Accommodation') {
        unitList = []
        // return (
        //     <div>
        //         <h1>No messages</h1>
        //     </div>
        // )
    } else {
        unitList = units
    }







    return (
        <div className='flex justify-center w-72 h-74 min-h-82  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200    rounded-lg bg-white shadow-lg ring-1 ring-stone-200 overflow-hidden'>
            <div className={openUnits ? 'hidden' : ''}>

                <div className='max-w-full w-72 '>
                    <div>
                        <img className='rounded-t-lg aspect-video h-56 object-cover' src={accmImg} alt='' />

                    </div>
                    <div className='flex flex-col m-3  '>
                        <div className='h-8  w-full block'>
                            <h1 className='font-bold text-xl text-left truncate'>
                                {title}

                            </h1>
                        </div>
                        <div>
                            <div className='flex align-center '>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-5 h-5 shrink-0'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                                </svg>

                                <h2 className='block truncate w-[90%]'>
                                    {address}
                                </h2>
                            </div>
                            {/* <div className='flex align-center '>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.75} stroke='currentColor' className='w-5 h-5 shrink-0'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                                    />
                                </svg>
                                <div className=' w-[80%] '>
                                    <p className=' truncate'>
                                        {description}
                                        cjnwdijcneijvnijenvefnvkenjvefjkvnejknvjefnjvnejnvjefnj
                                    </p>

                                </div>


                            </div> */}
                            {/* <div className='flex mt-6'>
                                <div className="badge badge-accent text-white font-semibold">BATHROOM</div>


                            </div> */}
                        </div>

                        <div className='flex justify-end mb-2 mt-2'>
                            <button onClick={() => setOpenUnits(!openUnits)} className='btn  font-bold text-right'>{unitList.length} units</button>
                        </div>
                    </div>
                    {/* <img className='rounded-t-lg aspect-video h-56 object-cover' src={accmImg} alt='' /> */}
                    {/* <div className='flex flex-col m-2'>
                        <h1 className='text-left  text-xl   font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{title}</h1>
                        <div className='flex align-middle text-left text-base text-neutral-600 dark:text-neutral-200'>
                            <span>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                                </svg>
                            </span>
                            <p>{address}</p>
                            
                        </div>
                        <div className='flex align-middle h-3/4'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                                />
                            </svg>
                            <p className='w-1/2     text-ellipsis text-left font-semibold'>{description}</p>
                        </div>
                        
                        <div className='flex  '>
                            <button onClick={() => setOpenUnits(!openUnits)} className='btn  font-bold text-right'>{unitList.length} units</button>


                        </div>
                    </div> */}
                </div>


            </div>
            <div className={openUnits ? ' relative max-w-full w-72          ' : 'hidden'}>
                <div className='flex absolute shadow-md p-2 w-full bg-primary text-white justify-center'>
                    <button onClick={() => setOpenUnits(!openUnits)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>

                    </button>
                    <h1 className='font-semibold grow ml-2'>UNITS</h1>
                    <span className='grow'></span>
                </div>
                <div className='pt-10'>

                    <div className='flex flex-col overflow-auto max-h-full pb-1'>


                        {unitList.map((unit: Unit) => (
                            <Link className='' href={`/listings/${unit.unit_id}`}>
                                <div className='flex h-10 items-center px-2  border-b-2 border-stone-200 hover:bg-stone-100 active:bg-primary active:text-white'>
                                    <h1 className='text-left grow font-semibold'>{`Unit ${unit.unit_number}`}</h1>
                                    <h1 className='font-medium'>${unit.price}</h1>
                                </div>
                            </Link>

                        ))}

                        {/* <h1 className={(!logged)?'font-medium':'hidden'}>Logged out</h1>
            <h1 className={((logged &&!msgsError&&!messages)||messages == 'Conversation Not Found')?'font-medium':'hidden'}>No messages</h1>
            <h1 className={msgsError?'font-medium':'hidden'}>Error</h1> */}

                    </div>
                </div>

            </div>

        </div>
    );
};
export default SpecialAccommodation;
