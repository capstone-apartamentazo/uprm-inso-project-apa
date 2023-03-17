import React from 'react'


type Props = {
    title: string,
    address: string,
    features: string,
    price: string,
    href: string,
}

const Listing: React.FC<Props> = ({title , address , features , price,href }) => {
    return (
    <div className="flex justify-center">
        <a href={href} data-te-ripple-init data-te-ripple-color="light">
        <div
            className="block max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-neutral-700">
            
                <img
                    className="rounded-t-lg"
                    src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
                    alt="" />
            
            <div className="p-4">
                <h1
                    className="text-left mb-2 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                    {title}
                </h1>
                <p className="text-left text-base text-neutral-600 dark:text-neutral-200">
                    {address}
                </p>
                <h2 className='text-left font-semibold'>{features}</h2>
                <h2 className='font-bold text-right'>{price}</h2>
            </div>
        </div>
        </a>
    </div>
    )

}
export default Listing;