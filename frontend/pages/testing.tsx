import { useState, useEffect, useLayoutEffect } from 'react'
import useSWR, { mutate } from 'swr'
import axios from 'axios';



interface Message {
    "deleted_flag": boolean,
    "landlord_id": number,
    "landlord_sent_msg": boolean,
    "message_id": number,
    "msg_content": string,
    "msg_read": boolean,
    "msg_send_date": string,
    "tenant_id": number
}
interface Storage {
    token: string,
    isLandlord: boolean,
    id: number
}
//{'token':'','isLandlord':false,'id':0}
//var storage ={'token':'','isLandlord':false,'id':0};



// var fetcher = (url:string) => fetch(url)





function Testing() {
    const [storage, setStorage] = useState<Storage>()



    useLayoutEffect(() => {


        //console.log(JSON.parse(localStorage.getItem("data")!))
        if (localStorage.getItem('data') != null) {
            setStorage(JSON.parse(localStorage.getItem('data')!))
        }
        var endpoint = 'http://127.0.0.1:5000/api/tenants/refresh'
        if(JSON.parse(localStorage.getItem('data')!).isLandlord){
            endpoint = 'http://127.0.0.1:5000/api/landlords/refresh'

        }
        //
        // const tem = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI1NDkxMDAsImV4cCI6MTY4MjU1MjcwMCwianRpIjoiM2VjOTU2YmEtYjFlYS00YTM1LWEzMzctNzFiOTVhZmMyM2M0IiwiaWQiOjYsInJscyI6InRlbmFudCIsInJmX2V4cCI6MTY4NTE0MTEwMH0.tOa3AGGF803UNu9ZooyLyMtFTIfaaw4M-q4WQ28WQu0'
        // const tem = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI2NDY2OTMsImV4cCI6MTY4MjY1MDI5MywianRpIjoiYWM1MmUwYWItMTlhMy00Y2EwLTgwZmYtNzk1ZjFmNDM2ZmRiIiwiaWQiOjUsInJscyI6ImxhbmRsb3JkIiwicmZfZXhwIjoxNjg1MjMwMTIxfQ.7lm_i506yVFOkZjs98GTwlDMibCDFMOZGxgeMS6Oze0'
        axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')!).token}` }})
        .then(res => {
            return res.data
            //const obj = {'token':res.data,}
            //localStorage.setItem('data',res.data)
        })
        .then(result => {
            const obj = { 'token': result['access_token'], 'isLandlord': storage?.isLandlord, 'id': storage?.id };
            const stringOBJ = JSON.stringify(obj);
            localStorage.setItem('data',stringOBJ);
        })
        .catch(err =>{
            //localStorage.removeItem('data');
            console.error(err);
        })



    }, []);



    // const fetcher = (url: string) => fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${storage!.token}`
    //     }
    // }).then((res) => res.json())



    //const storage = JSON.parse(localStorage.getItem('data')!);

    //const fetcher = (url:string, headers:{}) => fetch(url,headers).then((res) => res.json());

    const [selected, setSelected] = useState(0)
    const { data: convos, error: convoError, isLoading: isLoadingConvo } = useSWR(storage ? 'http://127.0.0.1:5000/api/messages' : null, url => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => res.json()));
    
    
    const { data: messages, error: msgsError, isLoading: isLoadingMsgs } = useSWR(storage ? `http://127.0.0.1:5000/api/messages/conversation/${selected}` : null, (url:string) => fetch(url, {
        headers: {
            Authorization: `Bearer ${storage?.token}`
        }
    }).then(res => res.json()));
    //const { data, error, isLoading } = useSWR(address, fetcher)

   

    // s


    if (convoError|msgsError) {
        <h1>Error</h1>
        // const { data: refreshed, error: refreshedError } = useSWR(storage!.isLandlord ? 'http://127.0.0.1:5000/api/landlords/refresh' : 'http://127.0.0.1:5000/api/tenants/refresh', (url: string) => fetch(url, {
        //     headers: {
        //         Authorization: `Bearer ${storage?.token}`
        //     }
        // })
        //     .then(res => res.json()));
        // if (refreshedError) {
        //     console.log('bumped')
        // }
        // try {
        //     const obj = { 'token': refreshed['access_token'], 'isLandlord': storage?.isLandlord, 'id': storage?.id };
        //     const stringOBJ = JSON.stringify(obj);
        //     localStorage.setItem('data', stringOBJ);
        //     console.log('hi')

        // } catch (err) {
        //     console.log('huhu')
        //     //localStorage.removeItem('data');
        // }

    }
    //const [data, setData] = useState<Message[]>([])
    //const [isLoading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(true)
    //     fetch('http://127.0.0.1:5000/api/messages/all')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data)
    //             setIndex(1)
    //             setLoading(false)
    //         })
    // }, [])
    if(isLoadingMsgs) return(
        <div>
        <p>Loading...</p>

    </div>
    )
    if(!messages || messages=='Conversation Not Found'){
        console.log('entered')
        return (
            <div>
            <button onClick={() => {
                //setIndex(idx + 1)
                setSelected(selected+1)
             }} className="btn  btn-primary border-2 mr-4">TOCA AQUI</button>
            <p>No messages</p>
            </div>
        )
    }

    if (isLoadingConvo) return (<div>
        <p>Loading...</p>

    </div>
    )
    if (!convos) return <p>No convos</p>

    // try{
    //     currMsg = data.map((message, index) => (


    //     ))

    // }catch(err){
    //     console.log(err)
    // }
    //console.log(data)

    //<h1 key={data!.at(idx)!.message_id}>{data!.at(idx)!.msg_content}</h1>

    function handleClick(landlord_id:number,tenant_id:number){
        if(storage?.isLandlord){
            setSelected(tenant_id)
        }else{
            setSelected(landlord_id)
        }
    }
    return (
        <div>
            {/* <button onClick={() => {
                //setIndex(idx + 1)
                setSelected(selected+1)
            }
            } className="btn  btn-primary border-2 mr-4">TOCA AQUI</button> */}
            {convos.map((message: Message) => (
                <div onClick={()=>handleClick(message.landlord_id,message.tenant_id)} key={message.message_id}>
                    <h1>Landlord Id:{message.landlord_id}</h1>
                    <h1>Tenant Id:{message.tenant_id}</h1>
                    <h2 > Content: {message.msg_content}</h2>
                </div>

            ))}
            <h1>----------------------</h1>
            {messages.map((msg: Message) => (
                <div key={msg.message_id}>
                    <h1>Landlord Id:{msg.landlord_id}</h1>
                    <h1>Tenant Id:{msg.tenant_id}</h1>
                    <h2 > Content: {msg.msg_content}</h2>
                </div>

            ))}


        </div>
    )

}
export default Testing;