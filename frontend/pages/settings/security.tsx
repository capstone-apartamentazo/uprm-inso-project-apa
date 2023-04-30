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



interface Storage {
    token: string,
    isLandlord: boolean,
    id: number
}



const Security = () => {
    const [storage, setStorage] = useState<Storage>({ token: '', isLandlord: false, id: 0 })
    const router = useRouter()

    const [emailEdit, setEmailEdit] = useState(false);
    const [passEdit, setPassEdit] = useState(false);

    useEffect(() => {


        if (localStorage.getItem('data') != null) {
            setStorage(JSON.parse(localStorage.getItem('data')!))
            if (!(storage.id == 0)) {
                var endpoint = 'http://127.0.0.1:5000/api/tenants/refresh'
                if (JSON.parse(localStorage.getItem('data')!).isLandlord) {
                    endpoint = 'http://127.0.0.1:5000/api/landlords/refresh'

                }
                axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')!).token}` } })
                    .then(res => {
                        return res.data
                        //const obj = {'token':res.data,}
                        //localStorage.setItem('data',res.data)
                    })
                    .then(result => {
                        const obj = { 'token': result['access_token'], 'isLandlord': storage?.isLandlord, 'id': storage?.id };
                        const stringOBJ = JSON.stringify(obj);
                        localStorage.setItem('data', stringOBJ);
                    })
                    .then(() => {
                        console.log(localStorage.getItem('data')!)
                        setStorage(JSON.parse(localStorage.getItem('data')!))
                    }

                    )
                    .catch(err => {
                        //localStorage.removeItem('data');
                        console.error(err);
                    })
            }
        } else {
            router.replace('/')
        }
    }, [])
    const { data: user, error: userError, isLoading: isLoadingUser } = useSWR((storage.token != '') ? (storage.isLandlord ? `http://127.0.0.1:5000/api/landlords/${storage.id}` : `http://127.0.0.1:5000/api/tenants/${storage.id}`) : null, (url: any) => fetch(url, {
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
    if (storage.id == 0) {
        return (
            <div>
                <h1>Error found</h1>
				<button onClick={() => { localStorage.removeItem('data') }} className="btn border-2 mr-4">Logout</button>
            </div>
        )
    }


    function handleEmailEdit(){
        if (emailEdit){
            if (document.getElementById("emailInput") != null){
                console.log((document.getElementById("emailInput")! as HTMLInputElement).value);
                (document.getElementById("emailInput")! as HTMLInputElement).value = "";
            }else{
                console.log("email form not found")
            }
            setEmailEdit(!emailEdit);
        }else{
            setEmailEdit(!emailEdit);
        }
    }
    function handlePassEdit(){
        if (passEdit){
            if (document.getElementById("passInput") != null){
                console.log((document.getElementById("passInput")! as HTMLInputElement).value);
                (document.getElementById("passInput")! as HTMLInputElement).value = "";
            }else{
                console.log("password form not found")
            }
            setPassEdit(!passEdit);
        }else{
            setPassEdit(!passEdit);
        }
        
        


    }
    return (
        <Layout>
            <main className='flex flex-col flex-nowrap mt-32 ml-8 mr-8'>
                <h1 className='font-bold text-3xl '>Login & Security</h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/settings/">Settings</Link></li>
                        <li><Link href="/settings/security">Login & Security</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col max-w-lg  mr-10 mt-4 ring-1 ring-stone-200 rounded-lg shadow-lg'>

                    <div className='mx-4 mt-6'>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Email</h1>
                                <h2 className={(emailEdit ? '' : '')}>{storage.isLandlord ? user.landlord_email : user.tenant_email}</h2>
                                <input type="text" placeholder="New email" id='emailInput' className={"" + (emailEdit ? 'input w-full max-w-xs ring-1 ring-stone-200' : 'hidden')} />

                            </div>

                            <button onClick={handleEmailEdit} className='flex-none link-accent font-bold btn-link'>
                                {emailEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className='mx-4 mb-6 '>
                        <div className='flex flex-row'>
                            <div className='flex-grow'>
                                <h1 className='font-semibold'>Password</h1>
                                <h2 className={(passEdit ? 'hidden' : '')}>*****</h2>
                                <input type="text" placeholder="New Password" id='passInput' className={"" + (passEdit ? 'input w-full max-w-xs ring-1 ring-stone-200' : 'hidden')} />
                            </div>

                            <button onClick={handlePassEdit} className='flex-none link-accent font-bold btn-link'>
                                {passEdit ? 'Save' : 'Edit'}
                            </button>
                        </div>

                    </div>

                </div>

            </main>
        </Layout>
    );
};


export default Security


