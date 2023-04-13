import React from 'react'


type Props = {
    userName: string;
    userImg: string;
    body: string;
    date: string;
    read: boolean;

}

const Message: React.FC<Props> = ({ userName, userImg, body, date, read }) => {
    return (

        <div className="flex flex-nowrap flex-row  items-center pl-2 pb-2 ">
            <div className="items-center">
                <div className="avatar p-4">
                    <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2">
                        <a href='' className=''><img className='aspect-square' src={userImg} /></a>
                    </div>
                </div>

            </div>
            <div className='flex flex-col items-start'>
                <div className='flex flex-row'>
                    <h1 className={''+(read ? 'font-semibold' : 'font-bold')}>{userName}</h1>
                    <h1 className='text-black font-extrabold px-1'>·</h1>
                    <h1 className={''+(read ? 'text-neutral-600 pr-1 font-normal' : 'text-neutral-600 pr-1 font-semibold')}>{date}</h1>
                    <h1 className='items-center'><span className={" "+(read ? 'hidden':'badge badge-accent badge-sm text-white font-semibold')}>NEW</span></h1>
                </div>

                <h2 className={''+(read ? 'font-normal' : 'font-semibold')}>{body}</h2>
            </div>

        </div>





    )

}
export default Message;