import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Conversation from '@/components/Conversation';
import Image from 'next/image';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Storage } from 'Storage';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;


const Settings = () => {
    const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
    const router = useRouter()
    const cookies = new Cookies()

    const [nameEdit, setNameEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);

    useEffect(() => {


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
            console.log('out')
            console.error(err)
        }
    }, [])
    


    const { data: user, error: userError, isLoading: isLoadingUser } = useSWR( (storage.isLandlord ? `${host}/api/landlords/${storage.id}` : `${host}/api/tenants/${storage.id}`) , (url: any) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => res.json()));

    if (userError) {
        console.error(userError);

    }
    if (!user) {
        console.log(user);
    }
    if (isLoadingUser) {
        return (<h1>Loading...</h1>)
    }
    if (storage.id == null) {
        return (
            <div>
                <h1>Error found</h1>
                <button onClick={() => { localStorage.removeItem('data') }} className="btn border-2 mr-4">Logout</button>
            </div>
        )
    }



    

    const updateLandlord = async (data: any) => {

        await axios({ method: 'put', url: `${host}/api/landlords`, headers: { Authorization: `Bearer ${storage.token}` }, data })
            .then(response => {
                // if(response==Object){
                //     throw new Error('Accm number exists');
                // }
                return response.data
            })
            .then(() => {
                alert('Update successful')
                mutate(`${host}/api/landlords/${storage.id}`)
            })
            .catch(err => {
                console.log(err)
                alert(err)
                //router.replace()
            })

    }

    const updateTenant = async (data: any) => {
        await axios({ method: 'put', url: `${host}/api/tenants`, headers: { Authorization: `Bearer ${storage.token}` }, data })
            .then(response => {
                // if(response==Object){
                //     throw new Error('Accm number exists');
                // }
                return response.data
            })
            .then(() => {
                alert('Update successful')
                mutate(`${host}/api/tenants/${storage.id}`)
            })
            .catch(err => {
                console.log(err)
                alert(err)
                //router.replace()
            })
    }





    const handleChange = async (event: any) => {
        event.preventDefault();
        var data ={}
        if (event.target.newPass.value == event.target.passCheck.value) {
            if (storage.isLandlord) {
                data = {
                    "landlord_name": event.target.name.value,
                    "landlord_email": event.target.email.value,
                    "landlord_password": event.target.passCheck.value,
                    "landlord_phone": event.target.phone.value
                }
                updateLandlord(data)
            }else{
                data = {
                    "tenant_name": event.target.name.value,
                    "tenant_email": event.target.email.value,
                    "tenant_password": event.target.passCheck.value,
                    "tenant_phone": event.target.phone.value
                }
                updateTenant(data)

            }
        } else {
            alert('Passwords dont match')
        }



    }


    return (
        <Layout>
            <main className='flex flex-col flex-nowrap my-24 ml-8 '>
                <h1 className='font-bold text-3xl '>
                    Settings
                </h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/personal">Personal Info</Link></li>
                    </ul>
                </div>
                <form onSubmit={handleChange} className='flex flex-row'>
                    <div className='flex flex-col max-w-lg  mr-10 mt-4 ring-1 ring-stone-200 rounded-lg shadow-lg grow'>

                        <div className='mx-4 mt-6'>
                            <div className='flex flex-row'>
                                <div className='flex-grow'>
                                    <h1 className='font-semibold'>Name</h1>
                                    <input type="text" defaultValue={storage.isLandlord ? user.landlord_name : user.tenant_name} placeholder="New name" id='name' />

                                </div>


                            </div>

                        </div>
                        <div className="divider"></div>
                        <div className='ml-4 '>
                            <div className='flex flex-row items-center'>
                                <div className='flex-grow'>
                                    <h1 className='font-semibold'>Email</h1>
                                    <input type="text" defaultValue={storage.isLandlord ? user.landlord_email : user.tenant_email} placeholder="New email" id='email' />

                                </div>

                            </div>

                        </div>
                        <div className="divider"></div>
                        <div className='mx-4'>
                            <div className='flex flex-row'>
                                <div className='flex-grow'>
                                    <h1 className='font-semibold'>Phone Number</h1>
                                    <input type="text" defaultValue={storage.isLandlord ? user.landlord_phone : user.tenant_phone} placeholder="New phone number" id='phone' />

                                </div>


                            </div>

                        </div>
                        <div className="divider"></div>
                        <div className='mx-4 '>
                            <div className='flex flex-row'>
                                <div className='flex-grow'>
                                    <h1 className='font-medium'>New Password:</h1>
                                    <input type="password" placeholder="Password" id='newPass' />

                                </div>
                            </div>

                        </div>

                        <div className='mx-4 mt-2'>
                            <div className='flex flex-row'>
                                <div className='flex-grow'>
                                    <h1 className='font-medium'>Confirm New Password:</h1>
                                    <input type="password" placeholder="Password" id='passCheck' />

                                </div>
                            </div>

                        </div>

                        <button type='submit' className='btn  text-white bg-accent hover:bg-accent mx-6 my-4'>
                            Save
                        </button>
                    </div>

                </form>
            </main>
        </Layout>
    );
};

export default Settings


