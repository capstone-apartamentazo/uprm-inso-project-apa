import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import axios from "axios";
import getConfig from 'next/config';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Storage } from 'Storage';
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const New = () => {


    //const [page, setPage] = useState(1);
    //const [currentPage, setCurrentPage] = useState(<></>);
    var currentPage = <></>
    const [selectedImage1, setSelectedImage1] = useState<string|any>(null);
    const [selectedImage2, setSelectedImage2] = useState<string|any>(null);
    const [selectedImage3, setSelectedImage3] = useState<string|any>(null);
    const [selectedImage4, setSelectedImage4] = useState<string|any>(null);

    const [accId,setAccId] = useState<number|null>(null)
    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: null, id: null })
    const router = useRouter()
    const cookies = new Cookies()

    useEffect(() => {
        console.log(host)
        try{
            const token = cookies.get('jwt_authorization')
			const decoded = jwt<Token>(token)
			setStorage({'token':token,'id':decoded['id'],'isLandlord':((decoded['rls']=="landlord")?true:false)})
			var endpoint = `${host}/api/tenants/refresh`
            if (storage.isLandlord) {
                endpoint = `${host}/api/landlords/refresh`

            }
            axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        return res.data
                        //const obj = {'token':res.data,}
                        //localStorage.setItem('data',res.data)
                    })
                    .then(result => {
                        const newToken = result['access_token']
                        const newDecoded = jwt<Token>(newToken)

                        cookies.set("jwt_authorization", result['access_token'], {
                            expires: new Date(newDecoded.exp*1000),
                        })
                        setStorage({'token':newToken,'id':newDecoded['id'],'isLandlord':((newDecoded['rls']=="landlord")?true:false)})
                    })
                    .catch(err => {
                        //localStorage.removeItem('data');
                        console.log('in')
                        console.error(err);
                    })
        }catch(err){
            router.replace('/')
            console.log('out')
            console.error(err)
        }


        
    }, [])


    const handleSelect1 = async (event: any) => {
        event.preventDefault();


        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage1(reader.result)
        }   
        reader.readAsDataURL(event.target.files[0])

        
        //alert(URL.createObjectURL(event.target.files![0]))
        //setSelectedImage1(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect2 = async (event: any) => {
        event.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage2(reader.result)
        }   
        reader.readAsDataURL(event.target.files[0])


        //setSelectedImage2(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect3 = async (event: any) => {
        event.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage3(reader.result)
        }   
        reader.readAsDataURL(event.target.files[0])


        //setSelectedImage3(URL.createObjectURL(event.target.files![0]))

    }
    const handleSelect4 = async (event: any) => {
        event.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage4(reader.result)
        }   
        reader.readAsDataURL(event.target.files[0])


        //setSelectedImage4(URL.createObjectURL(event.target.files![0]))

    }
    const [center, setCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral>({
        lat: 18.4338426,
        lng: -66.6138349
    })
    const [currPos,setCurrPos] = useState<google.maps.LatLng>()

    const uploadImage = async (image:string,accId:number,order:number) => {
        let data = {
            "accm_id": accId,
            "image": image,
            "order": order
        }

        if(accId){
            await axios({ method: 'post', url: `${host}/api/images/accommodation`, headers: { Authorization: `Bearer ${storage.token}` },data })
            .catch(err=>{
                console.error(err)
            })
        }

    }
    const createAccommodation = async (data:any, amenities:any) =>{

        if(data){
            console.log(data)
            await axios({ method: 'post', url: `${host}/api/accommodations/new`, headers: { Authorization: `Bearer ${storage.token}` },data })
            .then(response => {
                // if(response==Object){
                //     throw new Error('Accm number exists');
                // }
                return response.data
            })
            .then(result =>{
                //alert(result)
                uploadImages(result['accm_id'])
                return result
            }).then(result =>{
                updateAccAmenities(result['shared_amenities_id'],amenities)

            }).then(()=>{
                alert('Creation successfull')
                router.replace('/profile')
            })
            .catch(err =>{
                console.log(err)
                alert('Creation errors')
                //router.replace()
            })
        }
    }
    const updateAccAmenities = async (sha_id:any,amenities:any) =>{
        var data = {
            "shared_amenities_id": sha_id,
            "shared_bathroom": amenities.bathroom,
            "shared_dryer": amenities.dryer,
            "shared_kitchen": amenities.kitchen,
            "shared_washer": amenities.washer,
            "pets_allowed": amenities.pets
        }
        if(amenities){
            await axios({ method: 'put', url: `${host}/api/accommodations/amenities`, headers: { Authorization: `Bearer ${storage.token}` },data })
            .then(response => {
                return response.data
            })
            .then(result =>{
                console.log(result)

                
            })
            .catch(err =>{
                console.log(err)
            })

        }
    }
    const uploadImages = async (accId:any)=>{
        if(selectedImage1){
            
            uploadImage(selectedImage1,accId,1)
            

        }
        if(selectedImage2){
            uploadImage(selectedImage2,accId,2)
        }
        if(selectedImage3){
            uploadImage(selectedImage3,accId,3)

        }
        if(selectedImage4){
            uploadImage(selectedImage4,accId,4)

        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        
        

        //'latitude':center.lat.toString ,'longitude':center.lng.toString
        let latitude = currPos!.lat
        let longitude = currPos!.lng
        let amenities = {'bathroom': event.target.bathroom.checked, 'washer': event.target.washer.checked, 'dryer': event.target.dryer.checked, 'kitchen': event.target.kitchen.checked, 'pets': event.target.pets.checked}
        let details = {
            'accm_title': event.target.title.value, 'accm_street': event.target.street.value, 'accm_number': event.target.number.value, 'accm_city': event.target.city.value, 'accm_state': event.target.state.value, 'accm_country': event.target.country.value,
            'accm_zipcode': event.target.zipcode.value,'latitude':latitude ,'longitude':longitude,'accm_description': event.target.description.value
        }



        try{


            createAccommodation(details,amenities)
            
            // uploadImage(selectedImage1!,6,1)

            
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
                    <div className="flex flex-col mx-4">
                        <label>Coordinates:</label>
                        <label>Latitude: {currPos?currPos.lat:'undefined'}</label>
                        <label>Longitude: {currPos?currPos.lng:'undefined'}</label>
                        <label className='text-accent'>Drag the pin to accommodation's precise location to get latitude and longitude.</label>

                    </div>
                    
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
                    <input type="submit" className={currPos?'btn mx-4 my-2 ring-1 ring-accent text-accent hover:bg-accent hover:ring-white hover:text-white':'hidden'} value={'Create'}></input>

                </div>




            </form>
        </Layout>
    )

};
export default New;

