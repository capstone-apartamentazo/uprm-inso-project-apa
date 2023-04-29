import React from 'react'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import Conversation from '@/components/Conversation';



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
    convos: any,
    convoError: any,
    isLoadingConvo: boolean,
    onClick: any
    
}



const MessageList: React.FC<Props> = ({convos, convoError, isLoadingConvo, onClick }) => {
    
    // const [storage, setStorage] = useState<Storage>()

    // useEffect(() => {
    //     if (localStorage.getItem('data') != null) {
    //         setStorage(JSON.parse(localStorage.getItem('data')!))
    //     }
    // }, [])
    

    if (convoError) {
        return <p>Error</p>
    }
    if (isLoadingConvo) return (
        <div>
            <p>Loading...</p>

        </div>
    )
    if (!convos || convos == 'Conversation Not Found') {
        return (
            <div>
                <p>No messages</p>
            </div>
        )
    }


    return (
        <div  className='overflow-auto mx-4 overscroll-contain'>
            {/* {convos.map((message: Message) => (
                <Conversation onClick={onClick} key={message.message_id} msg={message}></Conversation>

            ))} */}
        </div>

    )
}
export default MessageList;