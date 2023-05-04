import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import axios from "axios";
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const New = () => {

    //const [page, setPage] = useState(1);
    //const [currentPage, setCurrentPage] = useState(<></>);
    var currentPage = <></>
    const [selectedImage1, setSelectedImage1] = useState<string|null>(null);
    const [selectedImage2, setSelectedImage2] = useState<string|null>(null);
    const [selectedImage3, setSelectedImage3] = useState<string|null>(null);
    const [selectedImage4, setSelectedImage4] = useState<string|null>(null);

    const [accId,setAccId] = useState(null)


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
    const [center, setCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral>({
        lat: 18.4338426,
        lng: -66.6138349
    })
    const [currPos,setCurrPos] = useState<google.maps.LatLng>()

    const uploadImage = async (image:string) => {

        if(accId){
            axios.post(`${host}/api/images/accommodation/`,)

        }

    }
    const createAccommodation = async (data:any) =>{
        if(data){
            console.log(data)

        }
    }
    const updateAccAmenities = async (data:any) =>{
        if(data){
            console.log(data)

        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        


        //'latitude':center.lat.toString ,'longitude':center.lng.toString
        let latitude = currPos!.lat
        let longitude = currPos!.lng
        let amenities = {'bathroom': event.target.bathroom.checked, 'washer': event.target.washer.checked, 'dryer': event.target.dryer.checked, 'kitchen': event.target.kitchen.checked, 'pets': event.target.pets.checked}
        let details = {
            'title': event.target.title.value, 'street': event.target.street.value, 'number': event.target.number.value, 'city': event.target.city.value, 'state': event.target.state.value, 'country': event.target.country.value,
            'zipcode': event.target.zipcode.value,'latitude':latitude ,'longitude':longitude,'description': event.target.description.value
        }



        try{


            createAccommodation(details)
            updateAccAmenities(amenities)

            if(selectedImage1){
            
                uploadImage(selectedImage1)
                
    
            }
            if(selectedImage2){
                uploadImage(selectedImage2)
            }
            if(selectedImage3){
                uploadImage(selectedImage3)
    
            }
            if(selectedImage4){
                uploadImage(selectedImage4)
    
            }
        }catch (err){
            console.error(err)
        }

    }

    

    const handleZipcodeChange = async (event: any) => {
        //alert(event.target.value)
        if(event.target.value.length>4){
        await fetch('https://maps.googleapis.com/maps/api/geocode/json?' + new URLSearchParams({
            address: event.target.value,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        })).then((response) => {
                if (!response.ok) {
                    throw new Error("Bad Request!");
                } else {
                    return response.json()
                }
            })

            .then(result => {
                
                setCenter(result.results[0].geometry.location)
                

            })

            .catch((error) => {
                console.log('boo')
                console.log(error);
            });
        }

    }

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            zoomControl: true,
            clickableIcons: true,
            scrollwheel: true,
            rotateControl: true,
        }),
        []
    );
   



    const libraries = useMemo(() => ['places'], []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    });

    const onDragEnd = useCallback(function callback(marker) {
        setCenter(marker.latLng)
        setCurrPos(marker.latLng.toJSON())
        console.log(JSON.stringify(marker.latLng.toJSON()))
    }, [])




    if (!isLoaded) {
        return <p>Loading...</p>;
    }


    return (
        <Layout>
            <form onSubmit={handleSubmit} className=" form-control my-24">

                <div className="grid lg:grid-flow-col sm:grid-flow-row shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10">


                    <div className=" flex flex-col mt-4 ">
                        <label className="font-medium text-2xl m-4 ">Create new Accommodation</label>
                        <div className="flex flex-col lg:flex-row sm:flex-col ">
                            <div className="flex flex-col gap-2 m-4  ">
                                <label>Title</label>
                                <input id='title' type="text" placeholder="Title" className="input input-bordered w-full   " required />
                                <label>Address</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">
                                    <input id='street' type="text" placeholder="Street" className="input input-bordered w-full  col-span-2" required />
                                    <span></span>
                                    <input id='number' type="text" placeholder="Number" className="input input-bordered w-full  " />
                                    <input id='city' type="text" placeholder="City" className="input input-bordered w-full " required />
                                    <input id='state' type="text" placeholder="State" className="input input-bordered w-full  " />
                                    <select id='country' className="select select-bordered" required>
                                        <option disabled selected>Country</option>
                                        <option>USA</option>
                                        <option>PR</option>
                                    </select>
                                    <input onInput={handleZipcodeChange} id='zipcode' type="text" placeholder="Zipcode" className="input input-bordered w-full " required />
                                    <label className="col-span-2 pt-2" >Description</label>
                                    <input id='description' type="text" placeholder="" className="input input-bordered w-full  col-span-3" required />
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
                                <label>Upload images of the accommodation itself. Better to include shared amenities and images of the building itself. You can add images of specific units in next steps.</label>

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
                                <label>You are required to add at least one image and a maximum of four images.</label>

                            </div>
                            <input onChange={handleSelect1} id='img1' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect2} id='img2' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect3} id='img3' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />
                            <input onChange={handleSelect4} id='img4' type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs hidden" />

                        </div>

                    </div>


                </div>
                <div className="grid grid-flow-row shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10 my-4">
                    <label className="font-medium text-2xl m-4 ">Locate your accommodation</label>
                    <GoogleMap
                        options={mapOptions}
                        zoom={16}
                        center={center}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ height: '400px' }}
                        mapContainerClassName="m-4"
                    //onCenterChanged={onCenterChanged}

                    >
                        <Marker
                            position={center}
                            draggable={true}
                            //onLoad={onMarkerLoad}
                            onDragEnd={onDragEnd}

                        />
                    </GoogleMap>
                    <input type="submit" className="btn" value={'Create'}></input>

                </div>




            </form>
        </Layout>
    )

};
export default New;

