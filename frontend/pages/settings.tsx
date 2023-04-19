import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import Link from 'next/link';


const Settings = () => {
    return (
        <Layout>
            <main className='flex flex-col   max-w-full mt-32 mx-8'>
                <h1 className='font-bold text-3xl '>Settings</h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/"></Link></li>
                    </ul>
                </div>

                <div className='flex flex-row flex-wrap gap-3 mt-4   h-52'>
                    <Link href="/settings/personal">
                        <div className="card w-82 bg-base-100 ring-1 ring-stone-200 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200 ">
                            <div className="card-body">
                                <h2 className="card-title">Personal Info</h2>
                                <p>Personal details about you</p>

                            </div>
                        </div>
                    </Link>
                    <Link href="/settings/security">
                        <div className="card w-82 bg-base-100 ring-1 ring-stone-200 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200 ">
                            <div className="card-body">
                                <h2 className="card-title">Login and Security</h2>
                                <p>Update your login information</p>

                            </div>
                        </div>
                    </Link>
                    
                    

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

export default Settings


