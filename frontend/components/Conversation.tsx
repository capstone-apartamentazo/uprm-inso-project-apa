import React from 'react'
import { useEffect, useState } from 'react'
import { Msg } from 'Msg'

import axios from 'axios';


type Props = {
    // userName: string;
    // userImg: string;
    // body: string;
    // date: string;
    // read: boolean;
    // onClick: any;
    msg: Msg,
    isLandlord: boolean | null,
    onClick: any,
    convoId: number,
    host: string



}



const Conversation: React.FC<Props> = ({ msg, isLandlord, onClick, convoId, host }) => {
    var iSent = ((isLandlord && msg.landlord_sent_msg) || (!(isLandlord || msg.landlord_sent_msg)))
    var needRead = ((iSent || msg.msg_read))
    const [currImage, setCurrImage] = useState<string | any>('/images/user.png')


    useEffect(() => {
        var imgEndpoint = `${host}/api/images/landlord/${convoId}`

    if (isLandlord != null) {
        if (isLandlord) {
            imgEndpoint = `${host}/api/images/tenant/${convoId}`
        }
        //alert(storage.isLandlord)


        axios.get(imgEndpoint)
            .then(res => {
                // console.log(res)
                return res.data
            })
            .then(result => {
                // console.log(result['resources'][0])
                return result['resources'][0]
            })
            .then(result => {
                setCurrImage(result['secure_url'])

            }).catch(err => {
                console.error(err)
            })
    }

    },[])


    
   










//console.log(needRead)
return (

    <div onClick={onClick} className="flex flex-nowrap flex-row rounded-md  items-center  cursor-pointer   mx-2 my-2 py-2  hover:bg-gray-100 overflow-clip">
        <div className="items-center">
            <div className="avatar pl-2 pr-2 py-2">
                <div className=" w-10 rounded-full ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                    <a href='' className=''><img className='aspect-square' src={currImage} /></a>
                </div>
            </div>

        </div>
        <div className='flex flex-col items-start'>
            <div className='flex flex-row'>
                <h1 className={'' + (needRead ? 'font-medium ' : 'font-semibold')}>{(isLandlord) ? msg.tenant_name.split(' ')[0] : msg.landlord_name.split(' ')[0]}</h1>
                <h1 className='text-black font-extrabold px-1'>·</h1>
                <p className={'' + (needRead ? 'text-neutral-600 pr-1 font-normal truncate w-36' : 'text-neutral-600 pr-2 font-semibold truncate w-36 ')}>{msg.msg_send_date}</p>
                <h1 className='items-center'><span className={" " + (needRead ? 'hidden' : 'badge badge-accent badge-sm text-white font-semibold mr-1')}>NEW</span></h1>
            </div>

            <h2 className={'' + (needRead ? 'font-normal truncate max-w-xs mr-2' : 'font-semibold truncate max-w-xs mr-2')}>{msg.msg_content}</h2>
        </div>

    </div>





)

}
export default Conversation;