import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useListings } from 'useListings';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Unit = {
	accm_id: number;
	available: boolean;
	contract_duration: number;
	date_available: string;
	deleted_flag: boolean;
	price: number;
	shared: boolean;
	unit_id: number;
	unit_number: string;
	size: number;
};
type Amenities = {
	air_conditioner: boolean;
	balcony: boolean;
	bed: boolean;
	electricity: boolean;
	internet: boolean;
	microwave: boolean;
	parking: boolean;
	water: boolean;
};

type Props = {
	accmId: string;
	accmUnits: any;
};

function getAvailableAmenities(amenities: any) {
	let toReturn: any[] = [];
	var topAmenities = ['electricity', 'water', 'internet', 'parking'];
	var includedAmenities = Object.keys(amenities).filter((item) => (item != 'deleted_flag' ? amenities[item] === false : null));
	const filteredAmenities = includedAmenities.filter((value) => topAmenities.includes(value));

	while (filteredAmenities.length < 4 && includedAmenities.length >= filteredAmenities.length) {
		var lastItem: any = includedAmenities.pop();
		if (filteredAmenities.includes(lastItem)) continue;
		filteredAmenities.push(lastItem);
	}

	filteredAmenities.forEach((amenity) =>
		toReturn.push(
			<span key={amenity} className='badge badge-ghost badge-sm'>
				{amenity}
			</span>
		)
	);
	return toReturn;
}

const AccommodationUnits: React.FC<Props> = ({ accmId, accmUnits }) => {
	const router = useRouter();
	let allUnits: any = [];
	const [units, setUnits] = useState([]);

	useEffect(() => {
		if (accmUnits) {
			const options = {
				method: 'GET',
				headers: new Headers({ 'content-type': 'application/json' }),
			};
			console.log(accmUnits);
			accmUnits.map((unit: Unit) => {
				var endpoint = `${host}/api/units/amenities/` + unit.unit_id;
				fetch(endpoint, options)
					.then((data) => {
						return data.json();
					})
					.then((data) => {
						console.log(data);
						allUnits.push(
							<tr key={unit.unit_id} className='hover cursor-pointer' onClick={() => router.push('/listings/' + unit.unit_id)}>
								<td>
									<div className='flex items-center space-x-3'>
										<div>
											<div className='font-bold'>Unit {unit.unit_number}</div>
											<div className='text-sm opacity-50'>{unit.available ? 'Available' : 'Unavailable'}</div>
										</div>
									</div>
								</td>
								{/* <td className='space-x-1'>{getAvailableAmenities(data)}</td> */}

								<td className='space-x-2'>
									{data.bedrooms} beds <span className='text-accent'>|</span> {data.bathrooms} baths
								</td>
								<td className='space-x-2'>{unit.size} sqft</td>
								<td className='font-bold'>${unit.price}/m</td>
							</tr>
						);
						if (allUnits.length === accmUnits.length) setUnits(allUnits);
					})
					.catch((err) => {
						console.log(err);
						var noListings: any = [];
						noListings.push(
							<tr>
								<td className='text-center font-semibold'>No Units Found</td>
							</tr>
						);
						setUnits(noListings);
					});
			});
		}
	}, [accmId, accmUnits]);

	return (
		<div id={accmId + '_units'} className={`h-72 card card-compact shadow text-primary-content translate-y-1 bg-accent transition-all delay-150 duration-300 overflow-hidden w-full`}>
			<div className='card-body p-0'>
				<h3 className='card-title'>Accommodation Units</h3>
				<div className='overflow-x-auto w-full'>
					<table className='table w-full rounded-xl'>
						<tbody>{units}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AccommodationUnits;
