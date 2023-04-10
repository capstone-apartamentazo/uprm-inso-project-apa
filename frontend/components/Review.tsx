import React from 'react'


type Props = {
    opinion: string;
    listingTitle: string; 
    listingImg:string;
    name: string;
    date: string;
    userImg: string;

}

const Review: React.FC<Props> = ({ opinion, listingTitle, listingImg, name, date, userImg }) => {
    return (
        <div className='flex flex-row ring-1 shadow-lg ring-stone-200 rounded-md mt-4 mb-2'>
            <div className='flex flex-col flex-auto '>
                <h1 className='pt-6 pl-6 pr-6 pb-2 text-2xl font-bold text-left'><a href='/' className='hover:underline'>{listingTitle}</a></h1>
                <div className='flex flex-row flex-nowrap  w-full'>
                    <div className='flex-auto '>
                        <p className=' text-lg  pl-8'>{opinion}</p>
                    </div>

                </div>

                <div className="flex flex-nowrap flex-row  items-center pl-2 pb-2">
                    <div className="items-center">
                        <div className="avatar p-4">
                            <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                                <a href='' className=''><img className='aspect-square' src={userImg} /></a>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold'><a href='/' className='hover:underline'>{name}</a></h1>
                        <h2 className='text-neutral-600'>{date}</h2>
                    </div>

                </div>
            </div>
            <div className=' m-auto  items-center'>
                <div className=" w-60 p-6 ">
                    <a href='/'><img className='aspect-video rounded-lg hover:shadow-lg hover:ring-1 hover:ring-stone-200' src={listingImg} /></a>
                </div>
            </div>
        </div>
    )

}
export default Review;