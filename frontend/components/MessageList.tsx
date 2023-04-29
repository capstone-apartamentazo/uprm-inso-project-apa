import React from 'react'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import MsgComp from '@/components/Message';



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
    u_id: number

}


const MessageList: React.FC<Props> = ({ u_id }) => {
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

    

    const { data: messages, error: msgsError, isLoading: isLoadingMsgs } = useSWR((storage?.token != '') ? `http://127.0.0.1:5000/api/messages/conversation/${u_id}` : null, (url: string) => fetch(url, {
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
    if(storage.isLandlord == null){
        console.log('nulled')
    }


    return (
        <div className='overflow-auto ml-6 mr-1 pr-5 my-16 snap-y  overscroll-contain'>
            {messages.map((msg: Message) => (
                <MsgComp key={msg.message_id} message={msg} isLandlord={storage.isLandlord}></MsgComp>

            ))}
        </div>

    )
}
export default MessageList;