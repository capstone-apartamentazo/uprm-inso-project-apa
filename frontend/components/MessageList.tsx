import React from 'react'
import { useEffect, useState,useRef } from 'react'
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
    u_id: number,
    selected:number

}


const MessageList: React.FC<Props> = ({ u_id,selected }) => {
    const dummy = useRef<null | HTMLDivElement>(null);
    

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
    
      
    var messageList = []
    

    const { data: messages, error: msgsError, isLoading: isLoadingMsgs } = useSWR((storage?.token != null) ? `${host}/api/messages/conversation/${u_id}` : null, (url: string) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => 
        // mutate('http://127.0.0.1:5000/api/messages');

        res.json()
    ));

    // useEffect(() => {
    //     //mutate(`${host}/api/messages/conversation/${selected}`);
    //     dummy!.current!.scrollIntoView({ behavior: "smooth" });
    //   }, [messages]);
    

    if(!logged || storage?.token == null){
        //return <h1>User logged out</h1>
    }

    // if (msgsError) {
    //     // return <h1>Error</h1>
    // }
    //if (isLoadingMsgs) 
    // return (
    //     // <div>
    //     //     <h1>Loading...</h1>

    //     // </div>
    // )
    if (!messages || messages == 'Conversation Not Found') {
        messageList = []
        // return (
        //     <div>
        //         <h1>No messages</h1>
        //     </div>
        // )
    }else{
        messageList=messages
    }
    // if(storage.isLandlord == null){
    //     console.log('nulled')
    // }
    


    return (
        <div className='overflow-auto ml-6 mr-1 pr-5 my-16 snap-y  overscroll-contain'>
            

            {messageList.map((msg: Msg) => (
                <MsgComp key={msg.message_id} message={msg} isLandlord={storage.isLandlord}></MsgComp>

            ))}
            <div ref={dummy}/>
            <h1 className={(!logged)?'font-medium':'hidden'}>Logged out</h1>
            <h1 className={((logged &&!msgsError&&!messages)||messages == 'Conversation Not Found')?'font-medium':'hidden'}>No messages</h1>
            <h1 className={msgsError?'font-medium':'hidden'}>Error</h1>
            
        </div>

    )
}
export default MessageList;