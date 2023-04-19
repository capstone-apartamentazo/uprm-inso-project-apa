import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import Link from 'next/link';


const Personal = () => {
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
                <div className='flex flex-col max-w-lg  ml-10 mr-10 ring-1 ring-stone-200 rounded-lg shadow-lg'>

                    <div className='mx-4 mt-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Name</h1>
                                <h2>Marcos Plaza</h2>
                            </div>

                            <button className='flex-none link-accent font-bold btn-link'>
                                Edit
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 '>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Email</h1>
                                <h2>marcos@gmail.com</h2>
                            </div>

                            <button className='flex-none link-accent font-bold btn-link'>
                                Edit
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 mb-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Phone Number</h1>
                                <h2>787-111-2222</h2>
                            </div>

                            <button className='flex-none link-accent font-bold btn-link'>
                                Edit
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


