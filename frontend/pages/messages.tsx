import Layout from '@/components/Layout';
import Listing from '@/components/Listing';
import Message from '@/components/Message';
import Image from 'next/image';

const uname = 'Bruce Wayne';
const rating = '4';
const joined = '2022';
const location = 'Moca, PR';
const languages = ['Spanish', 'English'];
const reviewCount = 2;

const Messages = () => {
    return (
        <Layout>
            <main className='flex flex-row flex-nowrap pt-24'>
                <div className='flex  flex-col flex-initial basis-1/4 pt-10 pl-6 pr-6 '>
                    <h1 className=' text-3xl font-bold text-left  '>
                        {' '}
                        <a href='/' className='hover:underline'>
                            Messages
                        </a>
                    </h1>
                    <div className='block min-w-full rounded-xl pt-2 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>

                        <Message userName='Elliot' userImg='/images/person.png' body='wsknwicw' date="2d ago" read={false}></Message>
                        <Message userName='Marcos' userImg='/images/person.png' body='helloo' date="1m ago" read={true}></Message>
                    </div>

                </div>
                <div className='flex flex-col flex-initial basis-1/4 pt-10 pl-4 w-9/12'>
                    <div className='rounded-md p-6'>
                        <h1 className=' text-3xl font-bold text-left  '>
                            {' '}
                            <a href='/' className='hover:underline'>
                                Listings
                            </a>
                        </h1>
                        <div className='carousel w-full pl-4 pt-4 pr-4 pb-4 space-x-4 rounded-box overscroll-auto'>
                            <div className='carousel-item pl-1'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                            <div className='carousel-item'>
                                <Listing title='Bosque 1' address='calle bosque' features='1 bed' price='$200/month' href='/' />{' '}
                            </div>
                        </div>
                    </div>

                    <div className='rounded-md p-6 max-w-full'>
                        <h1 className=' text-3xl font-bold text-left  '>
                            {' '}
                            <a href='/' className='hover:underline'>
                                Reviews ({reviewCount})
                            </a>
                        </h1>
                        <div className='flex flex-col '>
                            
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Messages;
