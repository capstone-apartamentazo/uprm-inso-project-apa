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



const Personal = () => {
    const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
    const router = useRouter()
    const cookies = new Cookies()

    const [nameEdit, setNameEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);

    useEffect(() => {


        try{
            const token = cookies.get('jwt_authorization')
			const decoded = jwt<Token>(token)
			setStorage({'token':token,'id':decoded['id'],'isLandlord':((decoded['rls']=="landlord")?true:false)})
			var endpoint = 'http://127.0.0.1:5000/api/tenants/refresh'
            if (storage.isLandlord) {
                endpoint = 'http://127.0.0.1:5000/api/landlords/refresh'

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

    

    const { data: user, error: userError, isLoading: isLoadingUser } = useSWR((storage.token != null) ? (storage.isLandlord ? `http://127.0.0.1:5000/api/landlords/${storage.id}` : `http://127.0.0.1:5000/api/tenants/${storage.id}`) : null, (url: any) => fetch(url, {
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



    function handleNameEdit() {
        if (nameEdit) {
            if (document.getElementById("nameInput") != null) {
                console.log((document.getElementById("nameInput")! as HTMLInputElement).value);
                (document.getElementById("nameInput")! as HTMLInputElement).value = "";
            } else {
                console.log("name form not found")
            }
            setNameEdit(!nameEdit);
        } else {
            setNameEdit(!nameEdit);
        }
    }
    function handlePhoneEdit() {
        if (phoneEdit) {
            if (document.getElementById("phoneInput") != null) {
                console.log((document.getElementById("phoneInput")! as HTMLInputElement).value);
                (document.getElementById("phoneInput")! as HTMLInputElement).value = "";
            } else {
                console.log("phone form not found")
            }
            setPhoneEdit(!phoneEdit);
        } else {
            setPhoneEdit(!phoneEdit);
        }




    }


    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 ml-8'>
                <h1 className='font-bold text-3xl '>
                    Personal Info
                </h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/personal">Personal Info</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col max-w-lg  mr-10 mt-4 ring-1 ring-stone-200 rounded-lg shadow-lg'>

                    <div className='mx-4 mt-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Name</h1>
                                <h2 className={(nameEdit ? '' : '')}>{storage.isLandlord ? user.landlord_name : user.tenant_name}</h2>
                                <input type="text" placeholder="New name" id='nameInput' className={"" + (nameEdit ? 'input w-full max-w-xs ring-1 ring-stone-200' : 'hidden')} />

                            </div>

                            <button onClick={handleNameEdit} className='flex-none link-accent font-bold btn-link'>
                                {nameEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='ml-4 '>
                        <div className='flex flex-row items-center'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Email</h1>
                                <h2>{storage.isLandlord ? user.landlord_email : user.tenant_email}</h2>
                            </div>

                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 mb-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Phone Number</h1>
                                <h2 className={(phoneEdit ? '' : '')}>{storage.isLandlord ? user.landlord_phone : user.tenant_phone}</h2>
                                <input type="text" placeholder="New phone number" id='phoneInput' className={"" + (phoneEdit ? 'input w-full max-w-xs ring-1 ring-stone-200' : 'hidden')} />

                            </div>

                            <button onClick={handlePhoneEdit} className='flex-none link-accent font-bold btn-link'>
                                {phoneEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </Layout>
    );
};

export default Personal


