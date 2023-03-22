import React from 'react'


type Props = {

}

const Review: React.FC<Props> = ({ }) => {
    return (
        <div className='flex flex-row ring-1 shadow-lg ring-stone-200 rounded-md mt-4 mb-2'>
            <div className='flex flex-col flex-auto '>
                <h1 className='pt-6 pl-6 pr-6 pb-2 text-2xl font-bold text-left'>2BR Condo ON THE BEACH! Restaurant- Pool- Hot Tub!
</h1>
                <div className='flex flex-row flex-nowrap  w-full'>
                    <div className='flex-auto '>
                        <p className=' text-lg  pl-8'>Had a great time and the place was great. The beach was beautiful and the place had everything we needed for a terrific vacation.</p>
                    </div>

                </div>

                <div className="flex flex-nowrap flex-row  items-center pl-2 pb-2">
                    <div className="items-center">
                        <div className="avatar p-4">
                            <div className=" w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2">
                                <img className='aspect-square' src="/images/user.png" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold'>Bruce Wayne</h1>
                        <h2 className='text-neutral-600'>March 2022</h2>
                    </div>

                </div>
            </div>
            <div className=' m-auto  items-center'>
                <div className=" w-60 p-6 ">
                    <img className='aspect-video rounded-lg' src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg" />
                </div>
            </div>
        </div>
    )

}
export default Review;