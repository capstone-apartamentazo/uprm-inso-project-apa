import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router'
import { Storage } from 'Storage';
import useSWR, { mutate } from 'swr';
import axios from "axios";

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Accm } from 'Accm';
import getConfig from 'next/config';
import { Unit } from "Unit";

interface unitType {
    "accm_id": number,
    "available": boolean,
    "contract_duration": number,
    "date_available": string,
    "deleted_flag": boolean,
    "price": number,
    "size": number,
    "tenant_capacity": number,
    "unit_id": number,
    "unit_number": string
}

interface pAmenitiesType{
    "air_conditioner": boolean,
    "balcony": boolean,
    "bathrooms": string,
    "bedrooms": number,
    "deleted_flag": boolean,
    "electricity": boolean,
    "heater": boolean,
    "internet": boolean,
    "parking": boolean,
    "priv_amenities_id": number,
    "private_dryer": boolean,
    "private_washer": boolean,
    "unit_id": number,
    "water": boolean
}


const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Edit = () => {
    const router = useRouter();

    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null })
    const [accmId, setAccmId] = useState<any>(null)
    const [unitId,setUnitId] = useState<any>()

    const [logged, setLogged] = useState(false)
    const cookies = new Cookies()

    const [selectedImage1, setSelectedImage1] = useState<string | any>(null);
    const [selectedImage2, setSelectedImage2] = useState<string | any>(null);
    const [selectedImage3, setSelectedImage3] = useState<string | any>(null);
    const [selectedImage4, setSelectedImage4] = useState<string | any>(null);

    const [unit,setUnit] = useState<unitType>()
    const [pAmenities,setPAmenities] = useState<pAmenitiesType>()


    useEffect(() => {
        if(router.isReady){
        try {
            setUnitId((router.query.unitId))
            try {

                const token = cookies.get('jwt_authorization')
                const decoded = jwt<Token>(token)
                setStorage({ 'token': token, 'id': decoded['id'], 'isLandlord': ((decoded['rls'] == "landlord") ? true : false) })
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
                            expires: new Date(newDecoded.exp * 1000),
                        })
                        setStorage({ 'token': newToken, 'id': newDecoded['id'], 'isLandlord': ((newDecoded['rls'] == "landlord") ? true : false) })
                    })
                    .catch(err => {
                        //localStorage.removeItem('data');
                        console.log('in')
                        console.error(err);
                    })
            } catch (err) {
                router.replace('/')
                //console.log('out')
                console.error(err)

            }

        } catch (err) {
            alert('No unit id found in query')
            console.error(err)
            router.replace('/profile')
        }
    }
    }, [router.isReady])

    useEffect(()=>{
        axios.get(`${host}/api/units/${unitId}`)
        .then(res=>{
            return res.data
        })
        .then(result=>{
            //console.log(result)
            setUnit(result)
            setAccmId(result.accm_id)
            
        })
        .catch(err=>{
            console.error(err)
            //router.back()
        })

    },[unitId])

    useEffect(()=>{
        axios.get(`${host}/api/units/amenities/${unitId}`)
        .then(res=>{
            return res.data
        })
        .then(result=>{
            console.log(result)
            setPAmenities(result)
            
        })
        .catch(err=>{
            console.error(err)
        })
    },[unitId])

    useEffect(()=>{
        axios.get(`${host}/api/images/unit/${unitId}`)
        .then(res=>{
            return res.data
        })
        .then(result=>{
            console.log(result)
            try{
                setSelectedImage1(result[0]['secure_url'])
            }catch(err){
                console.log('no image 1')
            }
            try{
                setSelectedImage2(result[1]['secure_url'])
            }catch(err){
                console.log('no image 2')
            }
            try{
                setSelectedImage3(result[2]['secure_url'])
            }catch(err){
                console.log('no image 3')
            }
            try{
                setSelectedImage4(result[3]['secure_url'])
            }catch(err){
                console.log('no image 4')
            }
            //setShAmenities(result)
        })
        .catch(err=>{
            console.error(err)
        })
    },[unitId])


    const handleSelect1 = async (event: any) => {
        event.preventDefault();
        if (event.target.files[0].size > 10485759) {
            alert('Image size too big. Max size is 10 Mb')
            
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage1(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }


    }
    const handleSelect2 = async (event: any) => {
        event.preventDefault();

        if (event.target.files[0].size > 10485759) {
            alert('Image size too big. Max size is 10 Mb')
            
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage2(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }
    const handleSelect3 = async (event: any) => {
        event.preventDefault();

        if (event.target.files[0].size > 10485759) {
            alert('Image size too big. Max size is 10 Mb')
            
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage3(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }
    const handleSelect4 = async (event: any) => {
        event.preventDefault();

        if (event.target.files[0].size > 10485759) {
            alert('Image size too big. Max size is 10 Mb')
            
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage4(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }

    }

    const uploadImage = async (image: string, unitId: number, order: number) => {
        let data = {
            "unit_id": unitId,
            "image": image,
            "order": order
        }

        if (unitId) {
            await axios({ method: 'post', url: `${host}/api/images/unit`, headers: { Authorization: `Bearer ${storage.token}` }, data })
            .then(res=>{
                console.log(`successfully uploaded image: ${order}`)
            })    
            .catch(err => {
                    console.error(err)
                    alert(`Error uploading image: ${order}. Check that accommodation id and unit id are being recognized on the top.`)

                })
        }

    }
    const editUnit = async (data: any, amenities: any) => {

        if (data) {
            console.log(data)
            await axios({ method: 'put', url: `${host}/api/units`, headers: { Authorization: `Bearer ${storage.token}` }, data })
                .then(response => {
                    // if(response==Object){
                    //     throw new Error('Accm number exists');
                    // }
                    return response.data
                })
                .then(result => {
                    //alert(result)
                    console.log('uploading images')
                    console.log(`Unit ID:${result['unit_id']}`)
                    uploadImages(result['unit_id'])
                    console.log('image upload complete')
                    return result
                }).then(result => {
                    console.log('updating amenities')
                    console.log(`Private Amenities ID:${result['priv_amenities_id']}`)
                    console.log(amenities)
                    updateUnitAmenities(result['priv_amenities_id'], amenities)

                }).then(() => {
                    alert('Update successful')
                    router.replace({
                        pathname: '/units',
                        query: { accmid: accmId } // the data
                    })
                })
                .catch(err => {
                    console.log(err)
                    alert('Update errors')
                    //router.replace()
                })
        }
    }
    const updateUnitAmenities = async (pa_id: any, amenities: any) => {
        var data = {
            "priv_amenities_id": pa_id,
            "bedrooms": parseInt(amenities.bedrooms,10),
            "bathrooms": parseFloat(amenities.bathrooms),
            "electricity": amenities.electricity,
            "water": amenities.water,
            "internet": amenities.internet,
            "heater": amenities.heater,
            "private_washer": amenities['private_washer'],
            "private_dryer": amenities['private_dryer'],
            "air_conditioner": amenities['air_conditioner'],
            "parking": amenities.parking,
            "balcony": amenities.balcony
        }
        if (amenities) {
            await axios({ method: 'put', url: `${host}/api/units/amenities`, headers: { Authorization: `Bearer ${storage.token}` }, data })
                .then(response => {
                    return response.data
                })
                .then(result => {
                    console.log(result)
                    console.log('update amenities success')


                })
                .catch(err => {
                    console.log(err)
                    alert('Error updating private amenities. Check that accommodation id and unit id are being recognized on the top.')

                })

        }
    }
    const uploadImages = async (unitId: any) => {
        if (selectedImage1) {

            uploadImage(selectedImage1, unitId, 1)


        }
        if (selectedImage2) {
            uploadImage(selectedImage2, unitId, 2)
        }
        if (selectedImage3) {
            uploadImage(selectedImage3, unitId, 3)

        }
        if (selectedImage4) {
            uploadImage(selectedImage4, unitId, 4)

        }
    }










    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let amenities = { 'bedrooms': event.target.bedrooms.value, 'bathrooms': event.target.bathrooms.value, 'electricity': event.target.electricity.checked, 'water': event.target.water.checked, 'internet': event.target.internet.checked, 'heater': event.target.heater.checked, 'private_washer': event.target.washer.checked, 'private_dryer': event.target.dryer.checked, 'air_conditioner': event.target.ac.checked, 'parking': event.target.parking.checked, 'balcony': event.target.balcony.checked }
        let details = {
            'unit_number': unit?.unit_number==event.target.number.value?null:event.target.number.value, 'price': parseInt(event.target.price.value,10), 'date_available': event.target.date.value, 'contract_duration': parseInt(event.target.contract.value,10), 'unit_id': unitId, 'tenant_capacity': parseInt(event.target.capacity.value,10), 'size': parseInt(event.target.size.value,10),'available':unit?.available
        }
        try {


            editUnit(details, amenities)

            // uploadImage(selectedImage1!,6,1)


        } catch (err) {
            console.error(err)
        }

    }













    return (
        <Layout>
            <div className="text-sm breadcrumbs mt-24 mx-10">
                <ul>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    <li>Accommodation [{unit?.accm_id}]</li>
                    <li onClick={()=>router.back()} className=" cursor-pointer hover:underline">Units</li>
                    <li>Edit unit</li>
                    <li>Unit [{unit?.unit_id}]</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} className=" form-control mb-24">

                <div className=" relative grid lg:grid-flow-col sm:grid-flow-row shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10">


                    <div className=" flex flex-col mt-4 ">

                        <label className="font-medium text-2xl m-4 ">Edit unit</label>
                        <div className="flex flex-col lg:flex-row sm:flex-col ">
                            <div className="flex flex-col gap-2 m-4  ">
                                <label className="font-medium">Accommodation:</label>
                                <div>
                                    <label>Accommodation: [{unit?.accm_id}]</label>

                                </div>
                                <label className="font-medium">Details:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">
                                    <input id='number' defaultValue={unit?.unit_number} type="text" placeholder="Unit #" className="input input-bordered w-full  " required />

                                    <select id='capacity'  className="select select-bordered" required>
                                        <option disabled selected>Unit Capacity</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>

                                    <input id='price' defaultValue={unit?.price} min="10" max="5000" type="number" placeholder="Price/month" className="input input-bordered w-full  " required />
                                    <input id='size' defaultValue={unit?.size} min="1" max="10000" type="number" placeholder="Size in sq. ft." className="input input-bordered w-full  " required />

                                    <select id='bedrooms'  className="select select-bordered" required>
                                        <option disabled selected>Bedrooms</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>5</option>
                                    </select>
                                    <select id='bathrooms'  className="select select-bordered" required>
                                        <option disabled selected >Bathrooms</option>
                                        <option value={0}>0</option>
                                        <option value={0.5}>1/2</option>
                                        <option value={1}>1</option>
                                        <option value={1.5}>1 1/2</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                    </select>
                                    <select id='contract'  className="select select-bordered" required>
                                        <option disabled selected>Contract Duration</option>
                                        <option value={6}>6 months</option>
                                        <option value={10}>10 months</option>
                                        <option value={12}>1 year</option>
                                        <option value={24}>2 years</option>
                                    </select>
                                    
                                </div>
                                <label className="font-medium mt-2">Date Available:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">


                                    <input id='date' defaultValue={unit?.date_available} type="date" placeholder="Date Available" className="input input-bordered w-full " required />

                                </div>



                                <label className="mt-2">Included in Price:</label>
                                <div className="">
                                    <div className="flex gap-2">

                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='electricity' defaultChecked={pAmenities?.electricity} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Electricity
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='water' defaultChecked={pAmenities?.water} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Water
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='internet' defaultChecked={pAmenities?.internet} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Internet
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='heater' defaultChecked={pAmenities?.heater} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Heater
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='washer' defaultChecked={pAmenities?.private_washer} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Private Washer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='dryer' defaultChecked={pAmenities?.private_dryer} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Private Dryer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='ac' defaultChecked={pAmenities?.air_conditioner} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            A/C
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='parking' defaultChecked={pAmenities?.parking} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Secure Parking Spot
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='balcony' defaultChecked={pAmenities?.balcony} type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Balcony
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div className="divider lg:divider-horizontal "></div>
                            <div className="flex flex-col relative  m-4">
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
                                <div className="flex items-center mt-auto">
                                    <label className="m-4">You are required to add at least one image and a maximum of four images.</label>
                                    <button className="btn  text-white w-40 shadow-md bg-accent  hover:bg-blend-multiply hover:bg-accent ">Update</button>
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
export default Edit;

