import getConfig from 'next/config';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IoWaterOutline } from 'react-icons/io5';
import { RxLightningBolt } from 'react-icons/rx';
import { MdWifi, MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { TbDog, TbCat, TbWashMachine, TbAirConditioningDisabled, TbToolsKitchen2 } from 'react-icons/tb';
import { TfiCar } from 'react-icons/tfi';
import { BiWater } from 'react-icons/bi';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { FaBath, FaToilet } from 'react-icons/fa';

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
  const { search } = router.query

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
      bedrooms: bedroom
    }

    let jsonAmenities = JSON.stringify(amenities)

    router.push({
      pathname: '/listings/results',
      query: { 
        search: search,
        filter: true,
        amenities: jsonAmenities
      }
    })
  };

  const waterBtn = () => {
    if (water === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='water bill' onClick={() => setWater(false)}>
              <IoWaterOutline />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='water bill' onClick={() => setWater(true)}>
            <IoWaterOutline />
          </span>
        </button>
      )
    }
  }

  const airBtn = () => {
    if (airConditioner === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='air conditioner' onClick={() => setAirConditioner(false)}>
              <TbAirConditioningDisabled />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-cyan-400 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='air conditioner' onClick={() => setAirConditioner(true)}>
            <TbAirConditioningDisabled />
          </span>
        </button>
      )
    }
  }

  const privWasherBtn = () => {
    if (privWasher === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private washer' onClick={() => setPrivWasher(false)}>
              <TbWashMachine />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private washer' onClick={() => setPrivWasher(true)}>
            <TbWashMachine />
          </span>
        </button>
      )
    }
  }

  const privDryerBtn = () => {
    if (privDryer === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private dryer' onClick={() => setPrivDryer(false)}>
              <CgSmartHomeWashMachine />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='private dryer' onClick={() => setPrivDryer(true)}>
            <CgSmartHomeWashMachine />
          </span>
        </button>
      )
    }
  }

  const electricityBtn = () => {
    if (electricity === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='electricity bill' onClick={() => setElectricity(false)}>
              <RxLightningBolt />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='electricity bill' onClick={() => setElectricity(true)}>
            <RxLightningBolt />
          </span>
        </button>
      )
    }
  }

  const internetBtn = () => {
    if (internet === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='internet' onClick={() => setInternet(false)}>
              <MdWifi />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='internet' onClick={() => setInternet(true)}>
            <MdWifi />
          </span>
        </button>
      )
    }
  }

  const heaterBtn = () => {
    if (heater === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='water heater' onClick={() => setHeater(false)}>
              <BiWater />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='water heater' onClick={() => setHeater(true)}>
            <BiWater />
          </span>
        </button>
      )
    }
  }

  const parkingBtn = () => {
    if (parking === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='parking' onClick={() => setParking(false)}>
              <TfiCar />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='parking' onClick={() => setParking(true)}>
            <TfiCar />
          </span>
        </button>
      )
    }
  }

  const balconyBtn = () => {
    if (balcony === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0' data-te-toggle='tooltip' title='balcony' onClick={() => setBalcony(false)}>
              <MdBalcony />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='balcony' onClick={() => setBalcony(true)}>
            <MdBalcony />
          </span>
        </button>
      )
    }
  }

  const petsBtn = () => {
    if (petsAllowed === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='pets allowed' onClick={() => setPetsAllowed(false)}>
            <TbDog /> <TbCat />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='pets allowed' onClick={() => setPetsAllowed(true)}>
          <TbDog /> <TbCat />
          </span>
        </button>
      )
    }
  }

  const kitchenBtn = () => {
    if (sharedKitchen === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='shared kitchen' onClick={() => setSharedKitchen(false)}>
            < MdOutlineKitchen/> <TbToolsKitchen2 />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='shared kitchen' onClick={() => setSharedKitchen(true)}>
          < MdOutlineKitchen/> <TbToolsKitchen2 />
          </span>
        </button>
      )
    }
  }

  const laundryBtn = () => {
    if (laundryFacilities === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='laundry facilities' onClick={() => setLaundryFacilities(false)}>
            <TbWashMachine /> <CgSmartHomeWashMachine />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='laundry facilities' onClick={() => setLaundryFacilities(true)}>
          <TbWashMachine /> <CgSmartHomeWashMachine />
          </span>
        </button>
      )
    }
  }

  const bathroomBtn = () => {
    if (sharedBathroom === true) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='shared bathroom' onClick={() => setSharedBathroom(false)}>
            <FaBath />  <FaToilet />
          </span>
        </button>
      )
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 grid grid-cols-2' data-te-toggle='tooltip' title='shared bathroom' onClick={() => setSharedBathroom(true)}>
          <FaBath />  <FaToilet />
          </span>
        </button>
      )
    }
  }

  return (
    <form onSubmit={ handleFilter } className='grid gap-2'>
      <div className='grid-flow-row'>
          { waterBtn() }
          { airBtn() }
          { privWasherBtn() }
          { privDryerBtn() }
          { electricityBtn() }
          { internetBtn() }
          { heaterBtn() }
          { parkingBtn() }
          { balconyBtn() }
      </div>
      <div className='grid-flow-row'>
        { petsBtn() }
        { kitchenBtn() }
        { laundryBtn() }
        { bathroomBtn() }
      </div>
    </form>
  );
};

export default Filter;
