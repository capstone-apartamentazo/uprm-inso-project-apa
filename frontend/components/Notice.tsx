import React from 'react'
import { Storage } from 'Storage';
import useSWR, { mutate } from 'swr';
import axios from "axios";
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo, useCallback } from 'react';



import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Accm } from 'Accm';
import getConfig from 'next/config';
import { Unit } from "Unit";


type Props = {
    accmId: number

}
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;


const Notice: React.FC<Props> = ({ accmId }) => {
    const router = useRouter();
    const cookies = new Cookies()

    const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null })


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
            //console.log('out')
            console.error(err)

        }

    }, [])






    const sendNotice = async (data: any) => {
        if (data) {
            await axios({ method: 'post', url: `${host}/api/notices/add`, headers: { Authorization: `Bearer ${storage.token}` }, data })
                .then(response => {
                    alert('Notice sent to tenants successfully')
                    return response.data
                })
                .catch(err => {
                    console.log(err)
                    alert('Error sending notice')
                    //router.replace()
                })

        }

    }



    const handleSubmit = async (event: any) => {
        event.preventDefault()
        var data = {
            'notice_title': `[Landlord]${event.target.title.value}`,
            'notice_content': event.target.body.value,
            'accm_id': accmId
        }
        sendNotice(data)



    }

    return (

        <div>
            <div className=''>
                <label htmlFor="noticeModal" className="btn bg-primary  text-white hover:bg-secondary">Send notice to Tenants</label>


            </div>

            <input type="checkbox" id="noticeModal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative flex">
                    <div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
                        <br></br>

                    </div>
                    <form onSubmit={handleSubmit} className='flex-col  flex-auto '>
                        <label htmlFor="noticeModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <h2 className="text-xl font-bold text-accent">Request a Tour</h2>

                        <div className="form-control pt-5">
                            <label className="label">
                                <span className="label-text font-semibold">Message to tenants in accommodation: {accmId}</span>

                            </label>
                            <input id={'title'} type="text" placeholder="Title" className="input input-bordered w-full max-w-xs mb-2 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2" required />

                            <textarea id={'body'} className="textarea shadow-lg ring-stone-200 ring-1  focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2" placeholder="Something asking for tour" required></textarea>
                        </div>
                        <div className="modal-action">
                            <button type={'submit'} className={"btn text-white bg-accent hover:bg-accent"}>"Submit Request"</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )

}
export default Notice;