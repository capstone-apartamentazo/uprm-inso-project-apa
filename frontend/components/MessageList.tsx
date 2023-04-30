import React from 'react'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import MsgComp from '@/components/Message';
import { Msg } from 'Msg';
import { Storage } from 'Storage';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
    u_id: number

}


const MessageList: React.FC<Props> = ({ u_id }) => {
    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null })
    const [logged, setLogged] = useState(false)
    const cookies = new Cookies()

    useEffect(() => {
        try{
            const token = cookies.get('jwt_authorization')
			const decoded = jwt<Token>(token)
			setStorage({'token':token,'id':decoded['id'],'isLandlord':((decoded['rls']=="landlord")?true:false)})
            setLogged(true) 
        }catch(err){
            setLogged(false)

        }
    }, [])

    

    const { data: messages, error: msgsError, isLoading: isLoadingMsgs } = useSWR((storage?.token != null) ? `${host}/api/messages/conversation/${u_id}` : null, (url: string) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => 
        // mutate('http://127.0.0.1:5000/api/messages');

        res.json()
    ));

    if(!logged || storage?.token == null){
        return <h1>User logged out</h1>
    }

    if (msgsError) {
        return <h1>Error</h1>
    }
    if (isLoadingMsgs) return (
        <div>
            <h1>Loading...</h1>

        </div>
    )
    if (!messages || messages == 'Conversation Not Found') {
        return (
            <div>
                <h1>No messages</h1>
            </div>
        )
    }
    // if(storage.isLandlord == null){
    //     console.log('nulled')
    // }


    return (
        <div className='overflow-auto ml-6 mr-1 pr-5 my-16 snap-y  overscroll-contain'>
            {messages.map((msg: Msg) => (
                <MsgComp key={msg.message_id} message={msg} isLandlord={storage.isLandlord}></MsgComp>

            ))}
        </div>

    )
}
export default MessageList;