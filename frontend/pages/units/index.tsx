import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import Unit from "@/components/Unit";

const Index = () => {
    





    return (
        <Layout>
            <div className="text-sm breadcrumbs mt-24 mx-10">
                <ul>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    <li>Accommodation</li>
                    <li><a>Units</a></li>
                    
                </ul>
            </div>
            <main  className="  mb-24">

                <div className="flex shadow-lg  rounded-lg ring-1 ring-stone-200  mx-10">

                    <Unit num={1} status={false} a_id={1} tenant={'Omar'}></Unit>
                    <div>
                        <h1>Add Unit</h1>
                        <h2> ICON </h2>
                    </div>
                    


                </div>





            </main>
        </Layout>
    )

};
export default Index;

