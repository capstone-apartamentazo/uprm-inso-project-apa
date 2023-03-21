

import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Image from 'next/image';

const uname = "Bruce Wayne"
const rating = "4"
const joined = "2022"
const location = "Moca, PR"
const languages = ["Spanish", "English"]

const Profile = () => {
    return (
        <Layout>
            <main className='flex flex-row flex-nowrap'>
                <div className='flex flex-col basis-1/4 pt-10 pl-6 '>
                    <div
                        className="block min-w-full rounded-xl pt-8 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center">
                        <div className=''>
                            <div className="avatar">
                                <div className=" w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                                    <img src="/images/user.png" />
                                </div>
                            </div>
                        </div>
                        <div className=" ">
                            <h5
                                className="mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                                {uname}
                            </h5>
                            <p className=" font-semibold pb-8 text-neutral-600 dark:text-neutral-200 ">
                                Rating: {rating}/5
                            </p>

                        </div>
                    </div>
                    <div className="flex justify-center pt-4">
                        <div
                            className="block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700">

                            <div className="p-6">
                                <h5
                                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    Details:
                                </h5>
                                <ul>
                                    <li className=' text-neutral-600 dark:text-neutral-200 '>Joined in {joined}</li>
                                    <li className=' text-neutral-600 dark:text-neutral-200 '>Lives in {location}</li>
                                    <li className=' text-neutral-600 dark:text-neutral-200 '>Speaks {languages[0]}, {languages[1]}</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col basis-1/4 pt-10 ml-4 '>
                    <div className='rounded-md p-6'>
                        <h1 className=' text-3xl font-bold text-left  '> <a href='/' className="hover:underline">Listings</a></h1>
                        <div className="carousel w-full pl-4 pt-4 pr-4 pb-4 space-x-4 rounded-box">

                            <div className="carousel-item pl-1">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                        </div>
                    </div>
                   
                    <div className='rounded-md p-6'>
                        <h1 className=' text-3xl font-bold text-left  '> <a href='/' className="hover:underline">Reviews</a></h1>
                        <div className="carousel w-full pl-4 pt-4 pr-4 pb-4 space-x-4 rounded-box">

                            <div className="carousel-item pl-1">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                            <div className="carousel-item">
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price="$200/month" href='/' />                        </div>
                        </div>
                    </div>

                </div>
            </main>
        </Layout>

    );
};

export default Profile;