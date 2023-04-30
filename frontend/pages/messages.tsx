import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Conversation from '@/components/Conversation';
// import MessageC from '@/components/Message';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import MessageList from '@/components/MessageList';
import ConversationList from '@/components/ConversationList';
import { useRouter } from 'next/router'





interface User {
    "deleted_flag": false

}
interface Landlord extends User {
    "landlord_email": string,
    "landlord_id": number,
    "landlord_name": string,
    "landlord_password": string,
    "landlord_phone": string,
    "landlord_rating": string
}

interface Tenant extends User {
    "tenant_email": string,
    "tenant_id": number,
    "tenant_name": string,
    "tenant_password": string,
    "tenant_phone": string,
    "tenant_rating": string
}


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

interface Props {
    messages: Message[]
}


interface Storage {
    token: string,
    isLandlord: boolean,
    id: number
}

const Messages: React.FC<Props> = ({ }) => {
    // const [conversations, setConversations] = useState<Message[]>([])
    // var data: data = { token: '', isLandlord: false, id: 0 }
    // const [user, setUser] = useState<User>()
    // const [messages, setMessages] = useState<Message[]>([])
    // const [currConvIds, setCurrConvIds] = useState({ 'tenant_id': 1, 'landlord_id': 1 })
    //var currentConvoIds = { 'tenant_id': 0, 'landlord_id': 0 };
    const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
    const [selected, setSelected] = useState(0)
    const router = useRouter()

    useEffect(() => {


        if (localStorage.getItem('data') != null) {
            setStorage(JSON.parse(localStorage.getItem('data')!))
            if (!(storage.id == 0)) {
                var endpoint = 'http://127.0.0.1:5000/api/tenants/refresh'
                if (JSON.parse(localStorage.getItem('data')!).isLandlord) {
                    endpoint = 'http://127.0.0.1:5000/api/landlords/refresh'

                }
                axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')!).token}` } })
                    .then(res => {
                        return res.data
                        //const obj = {'token':res.data,}
                        //localStorage.setItem('data',res.data)
                    })
                    .then(result => {
                        const obj = { 'token': result['access_token'], 'isLandlord': storage?.isLandlord, 'id': storage?.id };
                        const stringOBJ = JSON.stringify(obj);
                        localStorage.setItem('data', stringOBJ);
                    })
                    .then(() => {
                        console.log(localStorage.getItem('data')!)
                        setStorage(JSON.parse(localStorage.getItem('data')!))
                    }

                    )
                    .catch(err => {
                        //localStorage.removeItem('data');
                        console.error(err);
                    })
            }
        } else {
            router.replace('/')
        }
    }, [])

    function handleSelection(landlord_id: number, tenant_id: number) {
        //console.log('test')
        if (storage?.isLandlord) {
            //console.log(storage.isLandlord);
            setSelected(tenant_id);
        } else {
            setSelected(landlord_id);
        }

    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        var data = {}
        var endpoint = 'http://127.0.0.1:5000/api/tenant/sends/message';
        if (storage.isLandlord) {
            endpoint = 'http://127.0.0.1:5000/api/landlord/sends/message';
            data = {
                'tenant_id': selected,
                'msg_content': event.target.msg.value
            }
        } else {
            data = {
                'landlord_id': selected,
                'msg_content': event.target.msg.value
            }
        }
        const JSONdata = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + storage.token
            },
            body: JSONdata
        };
        await fetch(endpoint, options)
            .then((response) => {
                //console.log(response);
                if (!response.ok) {
                    console.log(response)
                    //event.target.msg.value = ''
                    //alert("first error")
                    throw new Error("Could not send message!");
                } else {
                    mutate('http://127.0.0.1:5000/api/messages');
                    mutate(`http://127.0.0.1:5000/api/messages/conversation/${selected}`);
                    event.target.msg.value = '';
                    return response.json();
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });




    }


    const { data: convos, error: convoError, isLoading: isLoadingConvo } = useSWR((storage.token != '') ? 'http://127.0.0.1:5000/api/messages' : null, url => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => {


        return res.json()
    }));

    if (convoError) {
        console.log(convoError)
        return (<div>
            <h1>Error found</h1>
            <button onClick={() => {
                //setIndex(idx + 1)
                router.reload()
            }} className="btn border-2 mr-4">Reload</button>
        </div>
        )
    }
    if (isLoadingConvo) {
        return <p>Loading...</p>
    }
    if (!convos || convos == 'Conversation Not Found' || convos == 'Messages from User is Empty') {
        // console.log('lol')
        //console.log(convos)

        // setIsConvoEmpty(true)
        return (
            <Layout>
                <div>

                    <main className='flex flex-col flex-nowrap mt-32 '>

                        <div className='flex flex-row flex-nowrap'>
                            <div className='grid grid-rows-auto auto-rows-min	 gap-1 ml-10 mr-6 basis-1/4  h-128 ring-1 ring-stone-200 rounded-lg shadow-lg overflow-hidden'>
                                <div className='h-16'>
                                    <div className='h-16 pl-4 pt-4  shadow-md'>
                                        <h1 className=' text-3xl font-bold text-left '>
                                            Messages
                                        </h1>
                                    </div>
                                </div>
                                <div className='bg-primary row-span-4'>
                                    <div>
                                        <h1>Your mailbox is empty</h1>

                                    </div>


                                </div>
                            </div>

                            <div className='grid grid-rows-auto  w-4/6 h-128 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg'>
                                <div>
                                    <div className='flex flex-row flex-nowrap h-16 bg-white   drop-shadow-md items-center '>

                                        <div className="avatar p-4 hidden">
                                            <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                                                <a href='' className=''><img className='aspect-square' src='/images/person.png' /></a>
                                            </div>
                                        </div>



                                        <h1 className='font-semibold text-xl'>{ }</h1>
                                    </div>
                                </div>
                                <div className='overflow-auto mx-4 overscroll-contain'>


                                </div>


                                <div className='flex flex-row justify-center my-3'>

                                    <input type="text" placeholder="Type here" className="input disabled flex-grow mx-4 ring-primary ring-2 ring-offset-2 focus:outline-none focus:border-0 focus:ring-primary focus:ring-2 focus:ring-offset-2" />

                                    <button className="btn btn-circle disabled  btn-primary border-2 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 stroke-white ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </button>



                                </div>


                            </div>

                        </div>
                    </main>
                </div>

            </Layout>


        )
    }
    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 '>

                <div className='flex flex-row flex-nowrap'>
                    <div className='grid grid-rows-auto auto-rows-auto relative gap-1 ml-10 mr-6 basis-1/4  h-128 ring-1 ring-stone-200 rounded-lg shadow-lg overflow-hidden'>
                        <div className='h-16 absolute inset-x-0 top-0 '>
                            <div className='h-16 pl-4 pt-4  shadow-md'>
                                <h1 className=' text-3xl font-bold text-left '>
                                    Messages
                                </h1>
                            </div>
                        </div>
                        <div className='overflow-auto mx-4 mt-16 overscroll-contain row-span-4'>

                            {

                                convos.map((message: Message) => (

                                    <Conversation onClick={() => handleSelection(message.landlord_id, message.tenant_id)} key={message.message_id} msg={message} isLandlord={storage.isLandlord}></Conversation>



                                ))

                            }
                        </div>
                    </div>

                    <div className='grid grid-rows-auto relative w-4/6 h-128 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg'>
                        <div className='absolute inset-x-0 top-0'>
                            <div className='flex flex-row flex-nowrap h-16 bg-white   drop-shadow-md items-center '>

                                <div className="avatar p-4">
                                    <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                                        <a href='' className=''><img className='aspect-square' src='/images/person.png' /></a>
                                    </div>
                                </div>


                                <h1 className='font-semibold text-xl'>{'UserName'}</h1>
                            </div>
                        </div>




                        <MessageList u_id={selected}></MessageList>



                        <div className='absolute inset-x-0 bottom-0'>
                            <form onSubmit={handleSubmit} className=' form-control flex flex-row justify-center my-2'>
                                <input maxLength={255} type="text" id='msg' name='msg' placeholder="Type here" className="input flex-grow mx-4 ring-primary ring-2 ring-offset-2 focus:outline-none focus:border-0 focus:ring-primary focus:ring-2 focus:ring-offset-2" required />

                                <button disabled={selected <= 0} type='submit' className="btn btn-circle  btn-primary border-2 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 stroke-white ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </button>
                            </form>


                        </div>



                    </div>

                </div>
            </main>
        </Layout>
    );
};

export default Messages
