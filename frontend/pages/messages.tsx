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
                <div className='flex flex-col flex-initial flex-grow basis-1/4 mt-20 pl-4 mr-10 w-9/12 '>
                    <div className='rounded-xl p-6 ring-1 ring-stone-200'>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble chat-bubble-accent">You were the Chosen One!</div>
                            <div className="chat-footer opacity-50">
                                Delivered
                            </div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="chat-header">
                                Anakin
                                <time className="text-xs opacity-50">12:46</time>
                            </div>
                            <div className="chat-bubble chat-bubble-primary text-white">I hate you!</div>
                            <div className="chat-footer opacity-50">
                                Seen at 12:46
                            </div>
                        </div>

                    </div>


                </div>
            </main>
        </Layout>
    );
};

export default Messages;
