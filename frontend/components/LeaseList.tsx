import React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Storage } from 'Storage';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import getConfig from 'next/config';

import { LeaseType } from 'Lease';

import Lease from './Lease';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {};

const LeaseList: React.FC<Props> = ({}) => {
	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null });
	const [logged, setLogged] = useState(false);
	const cookies = new Cookies();
	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
			setLogged(true);
		} catch (err) {
			setLogged(false);
		}
	}, []);

	var leases: [] = [];

	const {
		data: leasesFetch,
		error: leasesError,
		isLoading: isLoadingLeases,
	} = useSWR(storage?.token != null ? `${host}/api/tenants/leases/${storage.id}` : null, (url: string) =>
		fetch(url, {
			headers: {
				Authorization: `Bearer ${storage?.token}`,
			},
		}).then((res) => res.json())
	);

	if (!logged || storage?.token == null) {
		return <h1>User logged out</h1>;
	}

	if (leasesError) {
		return <h1>Error</h1>;
	}
	if (isLoadingLeases)
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	if (!leasesFetch || leasesFetch == 'Leases from Tenant Not Found') {
		leases = [];
	} else {
		leases = leasesFetch;
	}
	if (storage.isLandlord == null) {
		console.log('nulled');
	}

	return (
		<div className='flex  flex-wrap gap-4 mr-2  p-4 mb-6 overflow-auto'>
			{leases.map((lease: LeaseType) => (
				<Lease key={lease.lease_id} unit_id={lease.unit_id} start_date={lease.init_date} end_date={lease.end_date} price={lease.price} />
			))}
		</div>
	);
};
export default LeaseList;
