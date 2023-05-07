
import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';
import axios from "axios";
import getConfig from 'next/config';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Storage } from 'Storage';
import { useRouter } from 'next/router'


const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;



//http://127.0.0.1:3000/units/addTenant?unitId=4&tenantId=8



const AddTenant = () => {
    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: null, id: null })
    const router = useRouter()
    const cookies = new Cookies()
    const [unitId, setUnitId] = useState<any>(null)
    const [tenantId,setTenantId] = useState<any>(null)


    useEffect(() => {
        try {
            setUnitId((router.query.unitId))
            

        } catch (err) {
            //alert('No accommodation id found in query')
            console.error(err)
            router.replace('/profile')
        }
    }, [])
    useEffect(()=>{
        try {
            setTenantId((router.query.tenantId))
            

        } catch (err) {
            //alert('No accommodation id found in query')
            console.error(err)
        }
    },[unitId])

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
                    //console.log('in')
                    console.error(err);
                })
        } catch (err) {
            router.replace('/')
            //console.log('out')
            console.error(err)

        }
    }, [unitId])

    const createLease = async (data:any) => {
        await axios({ method: 'post', url: `${host}/api/leases/add`, headers: { Authorization: `Bearer ${storage.token}` },data })
        .then(res=>{
            //alert(res.data)
            router.back()
            return res.data
        })
        .catch(err=>{
            console.error(err)
            alert(err)
        })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        var data = {
            "unit_id": parseInt(event.target.unit.value,10),
            "tenant_id": parseInt(event.target.tenant.value,10) ,
            "price": parseInt(event.target.price.value,10),
            "init_date": event.target.inDate.value,
            "end_date": event.target.endDate.value
        }
        //console.log(data)
        createLease(data)

    }

    return (
        <Layout>
            <div className="text-sm breadcrumbs mt-24 mx-10">
                <ul>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    <li>Accommodation []</li>
                    <li onClick={() => router.back()} className=" cursor-pointer hover:underline">Units</li>
                    <li>Edit unit</li>
                    <li>Unit [{unitId}]</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} className=" form-control mb-24">

                <div className=" relative grid lg:grid-flow-col sm:grid-flow-row shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10">


                    <div className=" flex flex-col mt-4 ">

                        <label className="font-medium text-2xl m-4 ">Add tenant to unit</label>
                        <div className="flex flex-col lg:flex-row sm:flex-col ">
                            <div className="flex flex-col gap-2 m-4  ">

                                <label className="font-medium">Details:</label>
                                <div className="grid grid-flow-row grid-cols-3 gap-2">
                                    <div >
                                        <label>Unit Id:</label>

                                        <input id='unit' readOnly type="number" value={unitId} placeholder="Unit Id" className="input input-bordered w-full focus:border-0 focus:outline-none focus:ring-stone-200 " required />

                                    </div>
                                    <div >
                                        <label>Tenant Id:</label>

                                        <input id='tenant' defaultValue={tenantId} type="number" placeholder="Tenant #" className="input input-bordered w-full focus:border-0 focus:outline-none focus:ring-accent " required />

                                    </div>
                                    <div >
                                        <label>Price:</label>

                                        <input id='price' type="number" placeholder="$/Month" className="input input-bordered w-full focus:border-0 focus:outline-none focus:ring-accent " required />

                                    </div>
                                    <div >
                                        <label>Start Date:</label>

                                        <input id='inDate' type="date" placeholder="Start Date" className="input input-bordered w-full focus:border-0 focus:outline-none focus:ring-accent " required />

                                    </div>
                                    <div >
                                        <label>End Date:</label>

                                        <input id='endDate' type="date" placeholder="End Date" className="input input-bordered w-full focus:border-0 focus:outline-none focus:ring-accent " required />

                                    </div>
                                    <span></span>
                                    <button className="btn btn-accent text-white hover:btn-accent-focus mt-6">
                                        Create Lease
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )

};
export default AddTenant;