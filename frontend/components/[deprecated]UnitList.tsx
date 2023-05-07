import React from 'react'
import { useEffect, useState,useRef } from 'react'
import useSWR, { mutate } from 'swr';
import getConfig from 'next/config';
import {Unit} from "../Unit"

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
    host: string,
    token:string,
    accm_id:number

}


const UnitList: React.FC<Props> = ({ host, accm_id,token }) => {
    const dummy = useRef<null | HTMLDivElement>(null);
    


    
    
      
    var unitList = []
    

    const { data: units, error: unitsError, isLoading: isLoadingUnits } = useSWR((token != null) ? `${host}/api/accommodations/units/${accm_id}` : null, (url: string) => fetch(url, {
        
    }).then(res => 
        // mutate('http://127.0.0.1:5000/api/messages');

        res.json()
    ));

    // useEffect(() => {
    //     //mutate(`${host}/api/messages/conversation/${selected}`);
    //     dummy!.current!.scrollIntoView({ behavior: "smooth" });
    //   }, [messages]);
    

    // if( || storage?.token == null){
    //     //return <h1>User logged out</h1>
    // }

    // if (msgsError) {
    //     // return <h1>Error</h1>
    // }
    //if (isLoadingMsgs) 
    // return (
    //     // <div>
    //     //     <h1>Loading...</h1>

    //     // </div>
    // )
    if (!units || units == 'Units Not Found in Accommodation') {
        unitList = []
        // return (
        //     <div>
        //         <h1>No messages</h1>
        //     </div>
        // )
    }else{
        unitList=units
    }
    // if(storage.isLandlord == null){
    //     console.log('nulled')
    // }
    


    return (
        <div className='flex flex-col overflow-auto '>
            

            {unitList.map((unit:Unit) => (
                <div className='flex '>
                    <h1>{`Unit ${unit.unit_number}`}</h1>
                    <h1>{unit.price}</h1>
                </div>

            ))}
            
            {/* <h1 className={(!logged)?'font-medium':'hidden'}>Logged out</h1>
            <h1 className={((logged &&!msgsError&&!messages)||messages == 'Conversation Not Found')?'font-medium':'hidden'}>No messages</h1>
            <h1 className={msgsError?'font-medium':'hidden'}>Error</h1> */}
            
        </div>

    )
}
export default UnitList;