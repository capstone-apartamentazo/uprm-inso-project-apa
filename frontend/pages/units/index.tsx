import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import UnitC from "@/components/Unit";
import { useRouter } from 'next/router'
import { Storage } from 'Storage';
import useSWR, { mutate } from 'swr';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Accm } from 'Accm';
import getConfig from 'next/config';
import { Unit } from "Unit";

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Index = () => {
    const router = useRouter();

    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null })
    const [accmId, setAccmId] = useState<any>(null)
    const [logged, setLogged] = useState(false)
    const cookies = new Cookies()
    var units:[] = []
    useEffect(() => {
        try {
            setAccmId((router.query.accmid))
            try {

                const token = cookies.get('jwt_authorization')
                const decoded = jwt<Token>(token)
                setStorage({ 'token': token, 'id': decoded['id'], 'isLandlord': ((decoded['rls'] == "landlord") ? true : false) })
                setLogged(true)
            } catch (err) {
                setLogged(false)

            }
        } catch (err) {
            alert('No accommodation id found in query')
            console.error(err)
            router.replace('/profile')
        }
    }, [])

    const { data: unitsFetch, error: unitsError, isLoading: isLoadingUnits } = useSWR((storage?.token != null) ? `${host}/api/accommodations/units/${accmId}` : null, (url: string) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => {
        // mutate('http://127.0.0.1:5000/api/messages');

        
        return res.json()
    }
    ));
    

    if (!logged || storage?.token == null) {
        //alert('User logged out')
        //router.replace('/')
        //return <h1>Logged out</h1>
    }
    if (unitsError) {
        //alert(`Error:${unitsError}`)
        // router.replace('/')
        //return <h1>Error</h1>

    }
    if (isLoadingUnits) {
        //alert(accmId)
        // return (
        //     <Layout>
        //         <h1 className="my-24">Loading</h1>
        //     </Layout>

        // )
    }
    if (!unitsFetch || unitsFetch == 'Units Not Found in Accommodation') {
        units = []
        

        //<UnitC tenant={''} a_id={1} num={1} status={false}></UnitC>
        // return (
        //     <div className='mt-3'>

        //         <h1 className='font-normal text-xl text-black'>No units listed.</h1>
        //     </div>
        // )
    } else{
       
        units = unitsFetch
    }
    if (storage.isLandlord == null) {
        console.log('nulled')
    }



    return (
        <Layout>
            <main className="my-24  ">
                <div className="text-sm breadcrumbs mx-10">
                    <ul>
                        <li><Link href={'/profile'}>Profile</Link></li>
                        <li>Accommodation [{accmId}]</li>
                        <li>Units</li>

                    </ul>
                </div>


                <div className="relative shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10 pb-10">
                    <Link href={{
                        pathname: '/units/new',
                        query: {accmid:accmId} // the data
                    }} className='absolute right-4 top-4 bg-accent  font-medium text-white p-2 rounded-md shadow-md hover:bg-accent-focus' >Add New Unit</Link>
                    <h1 className="font-semibold text-3xl mx-6 py-4">Units</h1>
                    <div className="">
                        <div className="flex mx-4">
                        {units.map((unit: Unit,index:any) => (

                            <UnitC tenant={'standby'} a_id={unit.accm_id} num={unit.unit_number} status={unit.available} id={unit.unit_id}/>

                        ))}
                        </div>
                        <h1 className={((units.length==0)&&!isLoadingUnits&&(logged || storage?.token != null)&&!unitsError)?'font-medium mx-4':'hidden'}>No units in accommodation</h1>
                        <h1 className={(isLoadingUnits)?'font-medium mx-4':'hidden'}>Loading...</h1>
                        <h1 className={(!logged || storage?.token == null)?'font-medium mx-4':'hidden'}>Logged out</h1>
                        <h1 className={(unitsError)?'font-medium mx-4':'hidden'}>Error</h1>












                    </div>




                </div>






            </main>
        </Layout>
    )

};
export default Index;

