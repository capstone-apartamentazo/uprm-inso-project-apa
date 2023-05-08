import getConfig from 'next/config';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { IoWaterOutline } from 'react-icons/io5';
import { RxLightningBolt } from 'react-icons/rx';
import { MdWifi, MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { TbDog, TbCat, TbWashMachine, TbAirConditioningDisabled, TbToolsKitchen2 } from 'react-icons/tb';
import { TfiCar } from 'react-icons/tfi';
import { BiWater } from 'react-icons/bi';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { FaBath, FaToilet, FaBed } from 'react-icons/fa';
import { TiMinus, TiPlus } from 'react-icons/ti';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

interface Props {
	className: string;
}

const Filter: React.FC<Props> = () => {
	const [water, setWater] = useState(false);
	const [airConditioner, setAirConditioner] = useState(false);
	const [privWasher, setPrivWasher] = useState(false);
	const [privDryer, setPrivDryer] = useState(false);
	const [electricity, setElectricity] = useState(false);
	const [internet, setInternet] = useState(false);
	const [heater, setHeater] = useState(false);
	const [parking, setParking] = useState(false);
	const [balcony, setBalcony] = useState(false);
	const [petsAllowed, setPetsAllowed] = useState(false);
	const [sharedKitchen, setSharedKitchen] = useState(false);
	const [laundryFacilities, setLaundryFacilities] = useState(false);
	const [sharedBathroom, setSharedBathroom] = useState(false);
	const [bathroom, setBathroom] = useState(1);
	const [bedroom, setBedroom] = useState(1);

	const router = useRouter();
	const { search } = router.query;

	const handleFilter = (event: any) => {
		event.preventDefault();

		const amenities: any = {
			water: water,
			air_conditioner: airConditioner,
			private_washer: privWasher,
			private_dryer: privDryer,
			electricity: electricity,
			internet: internet,
			heater: heater,
			parking: parking,
			balcony: balcony,
			pets_allowed: petsAllowed,
			shared_kitchen: sharedKitchen,
			shared_dryer: laundryFacilities,
			shared_washer: laundryFacilities,
			shared_bathroom: sharedBathroom,
			bathrooms: bathroom,
			bedrooms: bedroom,
		};

		let jsonAmenities = JSON.stringify(amenities);

		router.push({
			pathname: '/listings/results',
			query: {
				search: search,
				filter: true,
				amenities: jsonAmenities,
			},
		});
	};

	const waterBtn = () => {
		if (water) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Water Bill included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 tooltip' title='water bill' onClick={() => setWater(false)}>
							<IoWaterOutline />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Water Bill included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 tooltip' title='water bill' onClick={() => setWater(true)}>
							<IoWaterOutline />
						</span>
					</button>
				</div>
			);
		}
	};

	const airBtn = () => {
		if (airConditioner) {
			return (
				<div className='tooltip' data-tip='Air Conditioner included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='air conditioner' onClick={() => setAirConditioner(false)}>
							<TbAirConditioningDisabled />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Air Conditioner included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='air conditioner' onClick={() => setAirConditioner(true)}>
							<TbAirConditioningDisabled />
						</span>
					</button>
				</div>
			);
		}
	};

	const privWasherBtn = () => {
		if (privWasher) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Private Washer included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 '>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private washer' onClick={() => setPrivWasher(false)}>
							<TbWashMachine />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Private Washer included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private washer' onClick={() => setPrivWasher(true)}>
							<TbWashMachine />
						</span>
					</button>
				</div>
			);
		}
	};

	const privDryerBtn = () => {
		if (privDryer) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Private Dryer included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='private dryer' onClick={() => setPrivDryer(false)}>
							<CgSmartHomeWashMachine />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Private Dryer included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private dryer' onClick={() => setPrivDryer(true)}>
							<CgSmartHomeWashMachine />
						</span>
					</button>
				</div>
			);
		}
	};

	const electricityBtn = () => {
		if (electricity) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Electricity Bill included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='electricity bill' onClick={() => setElectricity(false)}>
							<RxLightningBolt />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Electricity Bill included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='electricity bill' onClick={() => setElectricity(true)}>
							<RxLightningBolt />
						</span>
					</button>
				</div>
			);
		}
	};

	const internetBtn = () => {
		if (internet) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Internet included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='internet' onClick={() => setInternet(false)}>
							<MdWifi />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Internet included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='internet' onClick={() => setInternet(true)}>
							<MdWifi />
						</span>
					</button>
				</div>
			);
		}
	};

	const heaterBtn = () => {
		if (heater) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Water Heater included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='water heater' onClick={() => setHeater(false)}>
							<BiWater />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Water Heater included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='water heater' onClick={() => setHeater(true)}>
							<BiWater />
						</span>
					</button>
				</div>
			);
		}
	};

	const parkingBtn = () => {
		if (parking) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Parking included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='parking' onClick={() => setParking(false)}>
							<TfiCar />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Parking included'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='parking' onClick={() => setParking(true)}>
							<TfiCar />
						</span>
					</button>
				</div>
			);
		}
	};

	const balconyBtn = () => {
		if (balcony) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Balcony'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' title='balcony' onClick={() => setBalcony(false)}>
							<MdBalcony />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Balcony'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' title='balcony' onClick={() => setBalcony(true)}>
							<MdBalcony />
						</span>
					</button>
				</div>
			);
		}
	};

	const petsBtn = () => {
		if (petsAllowed) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Pets Allowed'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 rounded-full text-white  dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' title='pets allowed' onClick={() => setPetsAllowed(false)}>
							<TbDog /> <TbCat />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Pets Allowed'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' title='pets allowed' onClick={() => setPetsAllowed(true)}>
							<TbDog /> <TbCat />
						</span>
					</button>
				</div>
			);
		}
	};

	const kitchenBtn = () => {
		if (sharedKitchen) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Shared Kitchen'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' title='shared kitchen' onClick={() => setSharedKitchen(false)}>
							<MdOutlineKitchen /> <TbToolsKitchen2 />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Shared Kitchen'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' title='shared kitchen' onClick={() => setSharedKitchen(true)}>
							<MdOutlineKitchen /> <TbToolsKitchen2 />
						</span>
					</button>
				</div>
			);
		}
	};

	const laundryBtn = () => {
		if (laundryFacilities) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Laundry Facilities'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' title='laundry facilities' onClick={() => setLaundryFacilities(false)}>
							<TbWashMachine /> <CgSmartHomeWashMachine />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Laundry Facilities'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' title='laundry facilities' onClick={() => setLaundryFacilities(true)}>
							<TbWashMachine /> <CgSmartHomeWashMachine />
						</span>
					</button>
				</div>
			);
		}
	};

	const sharedBathroomBtn = () => {
		if (sharedBathroom) {
			return (
				<div className='tooltip tooltip-accent' data-tip='Shared Bathroom'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' title='shared bathroom' onClick={() => setSharedBathroom(false)}>
							<FaBath /> <FaToilet />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className='tooltip tooltip-accent' data-tip='Shared Bathroom'>
					<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' title='shared bathroom' onClick={() => setSharedBathroom(true)}>
							<FaBath /> <FaToilet />
						</span>
					</button>
				</div>
			);
		}
	};

	const bathroomBtn = () => {
		return (
			<div className='tooltip tooltip-accent' data-tip='Private Bathrooms'>
				<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
					<span className='relative px-2.5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-3 gap-2' title='private bathrooms'>
						<TiMinus
							onClick={() => {
								if (bathroom === 0) {
									setBathroom(0);
								} else {
									setBathroom(bathroom - 1);
								}
							}}
						/>{' '}
						<FaToilet /> <TiPlus onClick={() => setBathroom(bathroom + 1)} />
					</span>
				</button>
			</div>
		);
	};

	const bedroomBtn = () => {
		return (
			<div className='tooltip tooltip-accent' data-tip='Bedrooms'>
				<button className='relative inline-flex items-center justify-center p-0.5 mr-2 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
					<span className='relative px-2.5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-3 gap-2' title='bedrooms'>
						<TiMinus
							onClick={() => {
								if (bedroom === 0) {
									setBedroom(0);
								} else {
									setBedroom(bedroom - 1);
								}
							}}
						/>{' '}
						<FaBed /> <TiPlus onClick={() => setBedroom(bedroom + 1)} />
					</span>
				</button>
			</div>
		);
	};

	return (
		<form onSubmit={handleFilter} className='grid grid-flow-col grid-rows-3 gap-2'>
			<div>
				{waterBtn()}
				{airBtn()}
				{privWasherBtn()}
				{privDryerBtn()}
				{electricityBtn()}
				{internetBtn()}
				{heaterBtn()}
				{parkingBtn()}
				{balconyBtn()}
			</div>
			<div>
				{petsBtn()}
				{kitchenBtn()}
				{laundryBtn()}
				{sharedBathroomBtn()}
			</div>
			<div>
				{bedroomBtn()}
				<span className='font-semibold'>Bedrooms:</span> <span className='font-semibold text-accent'>{bedroom}</span>
				&nbsp;&nbsp;
				{bathroomBtn()}
				<span className='font-semibold'>Bathrooms:</span> <span className='font-semibold text-accent'>{bathroom}</span>
			</div>
		</form>
	);
};

export default Filter;
