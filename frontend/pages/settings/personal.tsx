import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';


const Personal = () => {

    const [nameEdit, setNameEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);

    function handleNameEdit(){
        if (nameEdit){
            if (document.getElementById("nameInput") != null){
                console.log((document.getElementById("nameInput")! as HTMLInputElement).value);
                (document.getElementById("nameInput")! as HTMLInputElement).value = "";
            }else{
                console.log("name form not found")
            }
            setNameEdit(!nameEdit);
        }else{
            setNameEdit(!nameEdit);
        }
    }
    function handlePhoneEdit(){
        if (phoneEdit){
            if (document.getElementById("phoneInput") != null){
                console.log((document.getElementById("phoneInput")! as HTMLInputElement).value);
                (document.getElementById("phoneInput")! as HTMLInputElement).value = "";
            }else{
                console.log("phone form not found")
            }
            setPhoneEdit(!phoneEdit);
        }else{
            setPhoneEdit(!phoneEdit);
        }
        
        


    }


    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 ml-8'>
                <h1 className='font-bold text-3xl '>
                    Personal Info
                </h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/personal">Personal Info</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col max-w-lg  mr-10 mt-4 ring-1 ring-stone-200 rounded-lg shadow-lg'>

                    <div className='mx-4 mt-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Name</h1>
                                <h2 className={(nameEdit ? 'hidden' : '')}>Marcos Plaza</h2>
                                <input type="text" placeholder="New name" id='nameInput' className={"" + (nameEdit ? 'input w-full max-w-xs' : 'hidden')} />

                            </div>

                            <button onClick={handleNameEdit} className='flex-none link-accent font-bold btn-link'>
                                {nameEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='ml-4 '>
                        <div className='flex flex-row items-center'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Email</h1>
                                <h2>marcos@gmail.com</h2>
                            </div>

                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 mb-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Phone Number</h1>
                                <h2 className={(phoneEdit ? 'hidden' : '')}>787-111-0000</h2>
                                <input type="text" placeholder="New phone number" id='phoneInput' className={"" + (phoneEdit ? 'input w-full max-w-xs' : 'hidden')} />

                            </div>

                            <button onClick={handlePhoneEdit} className='flex-none link-accent font-bold btn-link'>
                                {phoneEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </Layout>
    );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//     const res = await axios.get<Message[]>('http://api.apartamentazo.com/api/messages/all')
//     const messages = res.data
//     return { props: { messages } }
// }

export default Personal


