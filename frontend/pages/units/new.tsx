import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';


const New = () => {
    const [selectedImage1, setSelectedImage1] = useState<string>();
    const [selectedImage2, setSelectedImage2] = useState<string>();
    const [selectedImage3, setSelectedImage3] = useState<string>();
    const [selectedImage4, setSelectedImage4] = useState<string>();


    const handleSelect1 = async (event: any) => {
        event.preventDefault();

        setSelectedImage1(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect2 = async (event: any) => {
        event.preventDefault();

        setSelectedImage2(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect3 = async (event: any) => {
        event.preventDefault();

        setSelectedImage3(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect4 = async (event: any) => {
        event.preventDefault();

        setSelectedImage4(URL.createObjectURL(event.target.files![0]))

    }

    const handleSubmit = async (event: any) => {


    }














    return (
        <Layout>
            <div className="text-sm breadcrumbs mt-24 mx-10">
                <ul>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    <li>Accommodation</li>
                    <li><a>Units</a></li>
                    <li>Create unit</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} className=" form-control mb-24">

                <div className=" relative grid lg:grid-flow-col sm:grid-flow-row shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10">


                    <div className=" flex flex-col mt-4 ">

                        <label className="font-medium text-2xl m-4 ">Create new unit</label>
                        <div className="flex flex-col lg:flex-row sm:flex-col ">
                            <div className="flex flex-col gap-2 m-4  ">
                                <label className="font-medium">Accommodation:</label>
                                <div>
                                    <label>[ID]Title</label>

                                </div>
                                <label className="font-medium">Details:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">
                                    <select id='shared' className="select select-bordered" required>
                                        <option disabled selected>Shared Unit?</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>

                                    <input id='price' type="text" placeholder="Price/month" className="input input-bordered w-full  " />
                                    <input id='date' type="date" placeholder="Date Available" className="input input-bordered w-full " required />
                                    <select id='shared' className="select select-bordered" required>
                                        <option disabled selected>Contract Duration</option>
                                        <option>6 months</option>
                                        <option>10 months</option>
                                        <option>1 year</option>
                                        <option>2 years</option>
                                    </select>
                                </div>

                                <label className="mt-2">Shared Amenities:</label>
                                <div className="">
                                    <div className="flex gap-2">

                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='bathroom' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Bathroom
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='washer' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Washer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='dryer' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Dryer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='kitchen' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Kitchen
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='pets' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Pets Allowed
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="flex flex-col mr-4">
                                <label className="font-medium text-lg">Add Images</label>
                                <label>Upload images of the <b>unit</b> itself. Better to include <b>private</b> amenities. </label>
                                <label>Ex. bedrooms, private bathrooms, parking space, etc...</label>

                                <div className="flex gap-2">
                                    <div>
                                        <label htmlFor='img1'>
                                            <img className='aspect-square w-52' src={selectedImage1 ? selectedImage1 : '/images/placeholder.png'} />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor='img2'>
                                            <img className='aspect-square w-52' src={selectedImage2 ? selectedImage2 : '/images/placeholder.png'} />
                                        </label>                                            </div>
                                    <div>
                                        <label htmlFor='img3'>
                                            <img className='aspect-square w-52' src={selectedImage3 ? selectedImage3 : '/images/placeholder.png'} />
                                        </label>                                            </div>
                                    <div>
                                        <label htmlFor='img4'>
                                            <img className='aspect-square w-52' src={selectedImage4 ? selectedImage4 : '/images/placeholder.png'} />
                                        </label>                                            </div>
                                </div>
                                <div className="">
                                    <label>You are required to add at least one image and a maximum of four images.</label>
                                    <button className="btn ring-1 ring-accent text-accent w-40 absolute bottom-4 right-4 hover:bg-accent hover:text-white hover:ring-0 ">Create</button>
                                </div>

                            </div>
                            <input onChange={handleSelect1} id='img1' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect2} id='img2' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect3} id='img3' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect4} id='img4' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />

                        </div>

                    </div>


                </div>





            </form>
        </Layout>
    )

};
export default New;

