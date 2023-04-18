import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';



interface Message {
    Content: string
    "Landlord ID": number
    "Landlord Sent Message": boolean
    "Message ID": number
    Read: boolean
    "Send Date": string
    "Tenant ID": number
}

interface Props {
    messages: Message[]
}


const Messages: React.FC<Props> = ({ messages }) => {
    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 '>

                <div className='flex flex-row flex-nowrap'>
                    <div className='grid grid-rows-auto gap-1 ml-10 mr-6 basis-1/4 auto-rows-min h-96 ring-1 ring-stone-200 rounded-lg shadow-lg'>
                        <div>
                            <div className='h-16 pl-4 pt-4  shadow-md'>
                                <h1 className=' text-3xl font-bold text-left '>
                                    Messages
                                </h1>
                            </div>
                        </div>
                        <div className='overflow-auto mx-2'>
                            <Conversation userName='Elliot' userImg='/images/person.png' body='wsknwicw' date="2d ago" read={false}></Conversation>
                            <Conversation userName='Marcos' userImg='/images/person.png' body='helloo' date="1m ago" read={true}></Conversation>

                        </div>
                        
                    </div>

                    <div className='grid grid-rows-auto  w-4/6 h-96 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg'>
                        <div>
                            <div className='flex flex-row flex-nowrap h-16 bg-white   drop-shadow-md items-center '>

                                <div className="avatar p-4">
                                    <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                                        <a href='' className=''><img className='aspect-square' src='/images/person.png' /></a>
                                    </div>
                                </div>


                                <h1 className='font-semibold text-xl'>{messages.at(1)?.['Landlord Sent Message'] ? "messages.at(1)?.['Landlord ID'](Landlord Name)" : "messages.at(1)?.['Tenant ID'](Tenant Name)"}</h1>
                            </div>
                        </div>
                        <div className='overflow-auto mx-4 '>



                            {messages.map((message, index) => (
                                <div key={message["Message ID"]}>
                                    <div className={"" + (message['Landlord Sent Message'] ? "chat chat-start" : "chat chat-end")}>
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img src="/images/person.png" />
                                            </div>
                                        </div>
                                        <div className="chat-header">
                                            {message['Landlord Sent Message'] ? "message[Landlord ID](Landlord Name)" : "message[Tenant ID](Tenant Name)"}
                                            <time className="text-xs opacity-50">{message["Send Date"]}</time>
                                        </div>
                                        <div className={"" + (message['Landlord Sent Message'] ? "chat-bubble text-white chat-bubble-accent" : "chat-bubble text-white chat-bubble-primary")}>{message.Content}</div>
                                        <div className="chat-footer opacity-50">
                                            {message.Read ? 'Yes' : 'No'}
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>

                        <div className='flex flex-row justify-center '>

                            <input type="text" placeholder="Type here" className="input flex-grow mx-4 ring-primary ring-2 ring-offset-2 focus:outline-none focus:border-0 focus:ring-primary focus:ring-2 focus:ring-offset-2" />

                            <button className="btn btn-circle  btn-primary border-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 stroke-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>



                        </div>


                    </div>

                </div>
            </main>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const res = await axios.get<Message[]>('http://api.apartamentazo.com/api/messages/all')
    const messages = res.data
    return { props: { messages } }
}

export default Messages


/*
<li >
                                        <p>{message.Content}</p>
                                        <p>Landlord ID: {message["Landlord ID"]}</p>
                                        <p>Sent by Landlord: {message["Landlord Sent Message"] ? 'Yes' : 'No'}</p>
                                        <p>Message ID: {message["Message ID"]}</p>
                                        <p>Read: {message.Read ? 'Yes' : 'No'}</p>
                                        <p>Sent Date: {message["Send Date"]}</p>
                                        <p>Tenant ID: {message["Tenant ID"]}</p>

                                    </li>
                                    */