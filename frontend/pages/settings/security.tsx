import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Container } from '@nextui-org/react';
import Link from 'next/link';


const Security = () => {
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
                <div className='flex flex-row  gap-3 mt-10 '>
                    <h1>Security</h1>

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


