import React from 'react';

type Props = {
    tenant:string|null,
    num: number,
    status: boolean,
    a_id: number
};

const Unit: React.FC<Props> = ({tenant, num, status, a_id }) => {
    return (
        <div className='flex justify-center w-96 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 duration-200'>
            <a data-te-ripple-init data-te-ripple-color='light'>
                <div className='block max-w-full rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700 '>
                    <div className='p-4 flex menu-vertical align-middle'>
                        <h1 className='text-left mb-2 text-xl font-semibold  dark:text-neutral-50'>Unit 1</h1>
                        <h1>Status: {status?' Available':' Occupied'}</h1>
                        <h1 className={tenant?'':'hidden'}>Tenant: {tenant}</h1>
                        
                        <div className='flex items-center gap-2  mt-2'>
                            <button className='btn ring-1 ring-accent text-accent hover:bg-white hover:shadow-md hover:ring-2 grow'>Add Tenant</button>

                            <button className='btn ring-1 ring-primary hover:bg-white hover:shadow-md  hover:ring-2  grow'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                            </button>
                            <button className='btn ring-1 ring-red-500 hover:bg-white hover:shadow-md  hover:ring-2 grow '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </button>
                        </div>

                    </div>
                </div>
            </a>
        </div>
    );
};
export default Unit;
