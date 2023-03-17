

import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Link from 'next/link';

const uname = "Bruce Wayne"
const rating = "4"
const joined = "2022"
const location = "Moca, PR"
const languages = ["Spanish", "English"]
const Profile = () => {
    return (
        <Layout>

            <main className="grid grid-cols-5 gap-4 py-24">
                <div className='grid  gap-4 pl-10 '>

                    
                    <div className="flex justify-center text-center" >
                        <div
                            className="block min-w-full rounded-xl pt-4 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 ">
                            <a href="#!" className=''>
                                <img
                                    className="h-40  mask mask-circle "
                                    src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                                    alt="" />
                            </a>
                            <div className="p-6">
                                <h5
                                    className="mb-2 text-2xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                                    {uname}
                                </h5>
                                <p className=" font-semibold text-neutral-600 dark:text-neutral-200 ">
                                    Rating: {rating}/5
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700">

                            <div className="p-6">
                                <h5
                                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    Details:
                                </h5>
                                <ul>
                                    <li>Joined in {joined}</li>
                                    <li>Lives in {location}</li>
                                    <li>Speaks {languages[0]}, {languages[1]}</li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>








                </div>
                <div className='text-center col-span-4 pr-10 '>
                    <div className='ring-1 ring-stone-200'>
                        <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/'/>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Profile;
