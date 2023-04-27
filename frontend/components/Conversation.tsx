import React from 'react'
import { useEffect, useState } from 'react'


type Props = {
    userName: string;
    userImg: string;
    body: string;
    date: string;
    read: boolean;
    onClick: any;

}


const Message: React.FC<Props> = ({ userName, userImg, body, date, read, onClick }) => {
    const [iread, setRead] = useState(read);


    return (

        <div onClick={onClick} className="flex flex-nowrap flex-row rounded-md  items-center  cursor-pointer   mx-2 my-2 py-2  hover:bg-gray-100">
            <div className="items-center">
                <div className="avatar pl-2 pr-4 py-2">
                    <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                        <a href='' className=''><img className='aspect-square' src={userImg} /></a>
                    </div>
                </div>

            </div>
            <div className='flex flex-col items-start'>
                <div className='flex flex-row'>
                    <h1 className={'' + (iread ? 'font-semibold' : 'font-bold')}>{userName}</h1>
                    <h1 className='text-black font-extrabold px-1'>·</h1>
                    <h1 className={'' + (iread ? 'text-neutral-600 pr-1 font-normal' : 'text-neutral-600 pr-2 font-semibold')}>{date}</h1>
                    <h1 className='items-center'><span className={" " + (iread ? 'hidden' : 'badge badge-accent badge-sm text-white font-semibold')}>NEW</span></h1>
                </div>

                <h2 className={'' + (iread ? 'font-normal' : 'font-semibold')}>{body}</h2>
            </div>

        </div>





    )

}
export default Message;