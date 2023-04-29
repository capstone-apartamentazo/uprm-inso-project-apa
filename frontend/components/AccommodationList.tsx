import React from 'react'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import MsgComp from '@/components/Message';
import Listing from '@/components/Accommodation';
import Link from 'next/link';





interface Message {
    "deleted_flag": boolean,
    "landlord_id": number,
    "landlord_sent_msg": boolean,
    "message_id": number,
    "msg_content": string,
    "msg_read": boolean,
    "msg_send_date": string,
    "tenant_id": number
}
interface Storage {
    token: string,
    isLandlord: boolean,
    id: number
}


type Props = {


}


const AccommodationList: React.FC<Props> = ({  }) => {
    const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('data') != null) {
            setStorage(JSON.parse(localStorage.getItem('data')!))
            setLogged(true)
        }else{
            setLogged(false)
        }
    }, [])

    

    const { data: acms, error: acmsError, isLoading: isLoadingAcms } = useSWR((storage?.token != '') ? `http://127.0.0.1:5000/api/accommodations/landlord/${storage.id}` : null, (url: string) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => 
        // mutate('http://127.0.0.1:5000/api/messages');

        res.json()
    ));

    if(!logged || storage?.token == ''){
        return <h1>User logged out</h1>
    }

    if (acmsError) {
        return <h1>Error</h1>
    }
    if (isLoadingAcms) return (
        <div>
            <h1>Loading...</h1>

        </div>
    )
    if (!acms || acms == 'Accommodations Not Found') {
        return (
            <div className='mt-3'>

                <h1 className='font-normal text-xl text-black'>No properties listed.</h1>
            </div>
        )
    }
    if(storage.isLandlord == null){
        console.log('nulled')
    }


    return (
        <div className='flex flex-nowrap gap-4  pt-4 pr-4 pb-4'>
            {acms.map((msg: Message) => (
				<Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />

            ))}
            <Link href='/' className=' flex flex-col bg-white justify-center  w-40 rounded-md  shadow-md ring-1 ring-stone-200 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200 cursor-pointer'>
								<div className='text-center '>
									<h1 className='font-semibold text-xl text-black'>Add Accommodation</h1>


								</div>
								<div className='flex flex-col items-center'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 stroke-black">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
									</svg>
								</div>

							</Link>
        </div>

    )
}
export default AccommodationList;