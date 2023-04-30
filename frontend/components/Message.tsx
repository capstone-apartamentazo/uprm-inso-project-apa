import React from 'react'
import { useEffect, useState } from 'react'
import { Msg } from 'Msg'


type Props = {
    message: Msg,
    isLandlord: boolean | null
}


const Message: React.FC<Props> = ({ message, isLandlord }) => {
    //const [iread, setRead] = useState(message.msg_read);
    var iSent = ((isLandlord&&message.landlord_sent_msg)||(!(isLandlord||message.landlord_sent_msg)))


    // if(isLandlord&&message.landlord_sent_msg){
        
    // }

return (

<div key={message.message_id} className='snap-end '>
                <div className={"" + (iSent ? "chat chat-end" : "chat chat-start")}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/person.png" />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.landlord_sent_msg ? "message[Landlord ID](Landlord Name)" : "message[Tenant ID](Tenant Name)"}
                        <time className="text-xs opacity-50 ">{message.msg_send_date}</time>

                        
                    </div>
                    <div className={"" + (iSent ? "chat-bubble text-white chat-bubble-accent" : "chat-bubble text-white chat-bubble-primary")}>{message.msg_content}</div>
                    <div className="chat-footer opacity-50">
                        {message.msg_read ? 'Read' : 'Delivered'}
                    </div>
                </div>
            </div>
    )
}
export default Message;