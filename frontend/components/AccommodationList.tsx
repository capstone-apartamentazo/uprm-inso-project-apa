import React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Storage } from 'Storage';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Accm } from 'Accm';
import getConfig from 'next/config';
import ProfileAccommodation from './ProfileAccommodation';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {};

const AccommodationList: React.FC<Props> = ({}) => {
	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: false, id: null });
	const [logged, setLogged] = useState(false);
	const cookies = new Cookies();
	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			if (decoded['rls'] === 'landlord') {
				setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
				setLogged(true);
			} else {
				setLogged(false);
			}
		} catch (err) {
			setLogged(false);
		}
	}, []);

	const {
		data: accms,
		error: accmsError,
		isLoading: isLoadingAccms,
	} = useSWR(storage?.token != null ? `${host}/api/accommodations/landlord/${storage.id}` : null, (url: string) =>
		fetch(url, {
			headers: {
				Authorization: `Bearer ${storage?.token}`,
			},
		}).then((res) => res.json())
	);

	if (!logged || storage?.token == null) {
		return <h1>User logged out</h1>;
	}

	if (accmsError) {
		return <h1>Error</h1>;
	}
	if (isLoadingAccms)
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	if (!accms || accms == 'Accommodations Not Found') {
		return (
			<div className='mt-3'>
				<h1 className='font-normal text-xl text-black'>No properties listed.</h1>
			</div>
		);
	}
	if (storage.isLandlord == null) {
		console.log('nulled');
	}

	return (
		<div className='flex justify-center flex-wrap gap-4 mr-2 mt-20 p-4 mb-6 overflow-auto'>
			{accms.map((accm: Accm) => (
				<ProfileAccommodation key={accm.accm_id} title={accm.accm_title} address={accm.accm_street + ', ' + accm.accm_city + ', ' + accm.accm_zipcode} id={accm.accm_id} />
			))}
		</div>
	);
};
export default AccommodationList;
