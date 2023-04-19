import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';





const Security = () => {
    const [emailEdit, setEmailEdit] = useState(false);
    const [passEdit, setPassEdit] = useState(false);

    function handleEmailEdit(){
        if (emailEdit){
            if (document.getElementById("emailInput") != null){
                console.log((document.getElementById("emailInput")! as HTMLInputElement).value);
                (document.getElementById("emailInput")! as HTMLInputElement).value = "";
            }else{
                console.log("email form not found")
            }
            setEmailEdit(!emailEdit);
        }else{
            setEmailEdit(!emailEdit);
        }
    }
    function handlePassEdit(){
        if (passEdit){
            if (document.getElementById("passInput") != null){
                console.log((document.getElementById("passInput")! as HTMLInputElement).value);
                (document.getElementById("passInput")! as HTMLInputElement).value = "";
            }else{
                console.log("password form not found")
            }
            setPassEdit(!passEdit);
        }else{
            setPassEdit(!passEdit);
        }
        
        


    }
    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 ml-8 mr-8'>
                <h1 className='font-bold text-3xl '>Login & Security</h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/security">Login & Security</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col max-w-lg  ml-10 mr-10 mt-4 ring-1 ring-stone-200 rounded-lg shadow-lg'>

                    <div className='mx-4 mt-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Email</h1>
                                <h2 className={(emailEdit ? 'hidden' : '')}>marcos@gmail.com</h2>
                                <input type="text" placeholder="New email" id='emailInput' className={"" + (emailEdit ? 'input w-full max-w-xs' : 'hidden')} />

                            </div>

                            <button onClick={handleEmailEdit} className='flex-none link-accent font-bold btn-link'>
                                {emailEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 mb-6 '>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Password</h1>
                                <h2 className={(passEdit ? 'hidden' : '')}>*****</h2>
                                <input type="text" placeholder="New Password" id='passInput' className={"" + (passEdit ? 'input w-full max-w-xs' : 'hidden')} />
                            </div>

                            <button onClick={handlePassEdit} className='flex-none link-accent font-bold btn-link'>
                                {passEdit ? 'Save' : 'Edit'}
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

export default Security


