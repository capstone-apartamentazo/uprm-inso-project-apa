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


const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const New = () => {
    const router = useRouter();

    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null })
    const [accmId, setAccmId] = useState<any>(null)
    const [logged, setLogged] = useState(false)
    const cookies = new Cookies()

    const [selectedImage1, setSelectedImage1] = useState<string | any>(null);
    const [selectedImage2, setSelectedImage2] = useState<string | any>(null);
    const [selectedImage3, setSelectedImage3] = useState<string | any>(null);
    const [selectedImage4, setSelectedImage4] = useState<string | any>(null);



    useEffect(() => {
        try {
            setAccmId((router.query.accmid))
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
            alert('No accommodation id found in query')
            console.error(err)
            router.replace('/profile')
        }
    }, [])


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
                    alert(`Error uploading image: ${order}, edit unit to upload images again.`)
                })
        }

    }
    const createUnit = async (data: any, amenities: any) => {

        if (data) {
            console.log(data)
            await axios({ method: 'post', url: `${host}/api/units/add`, headers: { Authorization: `Bearer ${storage.token}` }, data })
                .then(response => {
                    return response.data
                })
                .then(result => {
                    console.log('uploading pictures')
                    console.log(result['unit_id'])
                    uploadImages(result['unit_id'])
                    console.log('image upload complete')
                    return result
                }).then(result => {
                    console.log('updating amenities')
                    console.log(result['priv_amenities_id'])
                    console.log(amenities)
                    updateUnitAmenities(result['priv_amenities_id'], amenities)
                    //console.log('amenities update complete')

                }).then(() => {
                    alert('Creation success')
                    // router.replace({
                    //     pathname: '/units',
                    //     query: { accmid: accmId } // the data
                    // })
                })
                .catch(err => {
                    console.log(err)
                    alert('Creation errors')
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
                    alert('Error updating private amenities. Edit unit to add available private amenities.')
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
            'unit_number': event.target.number.value, 'tenant_capacity': parseInt(event.target.capacity.value,10), 'price': parseInt(event.target.price.value,10), 'size': parseInt(event.target.size.value,10), 'date_available': event.target.date.value, 'contract_duration': parseInt(event.target.contract.value,10), 'accm_id': accmId
        }
        try {


            createUnit(details, amenities)

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
                    <li>Accommodation [{accmId}]</li>
                    <li onClick={()=>router.back()} className=" cursor-pointer hover:underline">Units</li>
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
                                    <label>Accommodation: [{accmId}]</label>

                                </div>
                                <label className="font-medium">Details:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">
                                    <input id='number' type="text" placeholder="Unit #" className="input input-bordered w-full  " required />

                                    <select id='capacity' className="select select-bordered" required>
                                        <option disabled selected>Unit Capacity</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                    </select>

                                    <input id='price' min="10" max="5000" type="number" placeholder="Price/month" className="input input-bordered w-full  " required />
                                    <input id='size' min="1" max="10000" type="number" placeholder="Size in sq. ft." className="input input-bordered w-full  " required />

                                    <select id='bedrooms' className="select select-bordered" required>
                                        <option disabled selected>Bedrooms</option>
                                        <option value={1}>1 bedroom</option>
                                        <option value={2}>2 bedrooms</option>
                                        <option value={3}>3 bedrooms</option>
                                        <option value={5}>5 bedrooms</option>
                                    </select>
                                    <select id='bathrooms' className="select select-bordered" required>
                                        <option disabled selected>Bathrooms</option>
                                        <option value={0}>0</option>
                                        <option value={0.5}>1/2</option>
                                        <option value={1}>1</option>
                                        <option value={1.5}>1 1/2</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                    </select>
                                    <select id='contract' className="select select-bordered" required>
                                        <option disabled selected>Contract Duration</option>
                                        <option value={6}>6 months</option>
                                        <option value={10}>10 months</option>
                                        <option value={12}>1 year</option>
                                        <option value={24}>2 years</option>
                                    </select>

                                </div>
                                <label className="font-medium mt-2">Date Available:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">


                                    <input id='date' type="date" placeholder="Date Available" className="input input-bordered w-full " required />

                                </div>



                                <label className="mt-2">Included in Price:</label>
                                <div className="">
                                    <div className="flex gap-2">

                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='electricity' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Electricity
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='water' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Water
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='internet' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Internet
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='heater' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Heater
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='washer' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Private Washer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='dryer' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Private Dryer
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='ac' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            A/C
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='parking' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
                                        <label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor=''>
                                            Secure Parking Spot
                                        </label>
                                    </div>
                                    <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
                                        <input id='balcony' type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' />
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
                                    <button className="btn  text-white w-40 shadow-md bg-accent  hover:bg-blend-multiply hover:bg-accent ">Create</button>
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

