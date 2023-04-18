import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';

const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

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
            <main className='flex flex-col flex-nowrap mt-20 '>
                <div className='mt-10 mb-4 pl-6 items-center'>
                    <h1 className=' text-3xl font-bold text-left '>
                        Messages
                    </h1>
                </div>
                <div className='flex flex-row flex-nowrap'>
                    <div className='flex  flex-col flex-initial basis-1/4 pt-4 pl-6 pr-6 '>

                        <div className='block min-w-full rounded-xl pt-2 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>

                            <Conversation userName='Elliot' userImg='/images/person.png' body='wsknwicw' date="2d ago" read={false}></Conversation>
                            <Conversation userName='Marcos' userImg='/images/person.png' body='helloo' date="1m ago" read={true}></Conversation>
                        </div>

                    </div>
                    <div className='flex flex-col flex-initial flex-grow basis-1/4 mt-4 ml-2 mr-10 w-9/12 h-96 rounded-xl ring-1 ring-stone-200 shadow-lg overflow-hidden '>
                        <div className='sticky top-0'>
                            <div className='flex flex-row flex-nowrap bg-white   drop-shadow-md items-center '>

                                <div className="avatar p-4">
                                    <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                                        <a href='' className=''><img className='aspect-square' src='/images/person.png' /></a>
                                    </div>
                                </div>


                                <h1 className='font-semibold text-xl'>{ messages.at(1)?.['Landlord Sent Message'] ? "messages.at(1)?.['Landlord ID'](Landlord Name)" : "messages.at(1)?.['Tenant ID'](Tenant Name)"}</h1>
                            </div>
                        </div>
                        <div className='overflow-auto mx-4'>


                            
                                {messages.map((message, index) => (
                                    <div key={message["Message ID"]}>
                                    <div className={""+ (message['Landlord Sent Message'] ? "chat chat-start" : "chat chat-end")}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/images/person.png" />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                    {message['Landlord Sent Message'] ? "message[Landlord ID](Landlord Name)" : "message[Tenant ID](Tenant Name)"}
                                        <time className="text-xs opacity-50">{message["Send Date"]}</time>
                                    </div>
                                    <div className={""+(message['Landlord Sent Message'] ? "chat-bubble text-white chat-bubble-accent" : "chat-bubble text-white chat-bubble-primary")}>{message.Content}</div>
                                    <div className="chat-footer opacity-50">
                                    {message.Read ? 'Yes' : 'No'}
                                    </div>
                                </div>
                                </div>
                                    
                                ))}
                            
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const res = await axios.get<Message[]>('http://localhost:5000/api/messages/all')
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