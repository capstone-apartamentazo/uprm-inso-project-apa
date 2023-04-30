
import React from 'react'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import MsgComp from '@/components/Message';
import Listing from '@/components/Accommodation';
import Link from 'next/link';
import Review from '@/components/Review';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;




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


const ReviewList: React.FC<Props> = ({  }) => {
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

    

    const { data: acms, error: acmsError, isLoading: isLoadingAcms } = useSWR((storage?.token != '') ? `${host}/api/accommodations/landlord/${storage.id}` : null, (url: string) => fetch(url, {
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
        <div className='flex flex-col '>
						
        
            {acms.slice(0,4).map((msg: Message) => (
                
                <Review listingTitle='2BR Condo ON THE BEACH! Restaurant- Pool- Hot Tub!' opinion='Had a great time and the place was great. The beach was beautiful and the place had everything we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Maya Williams' date='March 2022' userImg='/images/person.png'></Review>

            ))}
            
        </div>

    )
}
export default ReviewList;

//							<Review listingTitle='Apartment ON THE BEACH! NO POOL' opinion='Had a horrible time and the place was nasty. There was no beach and the place had nothing we needed for a terrific vacation.' listingImg='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg' name='Robin' date='May 2022' userImg='/images/person.png'></Review>


