

import Layout from '@/components/Layout';
import { Button } from '@nextui-org/react';
import Link from 'next/link';


const Profile = () => {
    return (
        <Layout>

            <main className="grid grid-cols-5 gap-4 py-24">
                <div className='grid grid-rows-5 gap-2 '>

                    <div className=' flex items-center justify-center ' >
                    <Link className="rounded-md bg-gray-500 px-16 py-5  text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            href="/">Dashboard</Link>
                        
                    </div>
                    <div className='flex items-center justify-center'>
                    <Link className="rounded-md  bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            href="/">Messages</Link>
                    </div>
                    <div className='flex items-center justify-center'>
                    <Link className="rounded-md  bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            href="/">Listings</Link>
                    </div>
                    <div className='flex items-center justify-center'>
                    <Link className="rounded-md  bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            href="/">Contracts</Link>
                    </div>
                    <div className='flex items-center justify-center'>
                    <Link className="rounded-md  bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            href="/">Account Settings</Link>
                    </div>






                </div>
                <div className='text-center col-span-4'>
                    <h1>Data</h1>
                </div>
            </main>
        </Layout>
    );
};

export default Profile;
