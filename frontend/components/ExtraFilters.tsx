import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { GoDash } from 'react-icons/go';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

interface Props {
	className: string;
}

const ExtraFilters: React.FC<Props> = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scoreToggle, setScoreToggle] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(10000);
  const [rankingList, setRankingList] = useState(['distance', 'price', 'size', 'amenities', 'rating']);

  const router = useRouter();
  const { search, amenities } = router.query

  const handleFilter = (event: any) => {
    event.preventDefault();
    console.log(scoreToggle)

    let jsonAmenities: any = ''

    try {
      let jsonParseAmn = JSON.parse((amenities as string))
  
      const amenitiesData: any = {
        water: jsonParseAmn['water'],
        air_conditioner: jsonParseAmn['air_conditioner'],
        private_washer: jsonParseAmn['private_washer'],
        private_dryer: jsonParseAmn['private_dryer'],
        electricity: jsonParseAmn['electricity'],
        internet: jsonParseAmn['internet'],
        heater: jsonParseAmn['heater'],
        parking: jsonParseAmn['parking'],
        balcony: jsonParseAmn['balcony'],
        pets_allowed: jsonParseAmn['pets_allowed'],
        shared_kitchen: jsonParseAmn['shared_kitchen'],
        shared_dryer: jsonParseAmn['shared_dryer'],
        shared_washer: jsonParseAmn['shared_washer'],
        shared_bathroom: jsonParseAmn['shared_bathroom'],
        bathrooms: jsonParseAmn['bathrooms'],
        bedrooms: jsonParseAmn['bedrooms'],
        tenant_capacity: jsonParseAmn['tenant_capacity'],
        distance: rankingList.indexOf('distance')+1,
        price: rankingList.indexOf('price')+1,
        size: rankingList.indexOf('size')+1,
        amenities: rankingList.indexOf('amenities')+1,
        rating: rankingList.indexOf('rating')+1,
        min_price: minPrice,
        max_price: maxPrice,
        min_size: minSize,
        max_size: maxSize
      }
  
      jsonAmenities = JSON.stringify(amenitiesData)
    } catch(error) {
      const amenitiesData: any = {
        water: false,
        air_conditioner: false,
        private_washer: false,
        private_dryer: false,
        electricity: false,
        internet: false,
        heater: false,
        parking: false,
        balcony: false,
        pets_allowed: false,
        shared_kitchen: false,
        shared_dryer: false,
        shared_washer: false,
        shared_bathroom: false,
        bathrooms: 0,
        bedrooms: 0,
        tenant_capacity: 1,
        min_price: minPrice,
        max_price: maxPrice,
        min_size: minSize,
        max_size: maxSize,
        distance: rankingList.indexOf('distance')+1,
        price: rankingList.indexOf('price')+1,
        size: rankingList.indexOf('size')+1,
        amenities: rankingList.indexOf('amenities')+1,
        rating: rankingList.indexOf('rating')+1
      }
  
      jsonAmenities = JSON.stringify(amenitiesData)
    }
  
    const filterOptions: any = {
      amenitiesFilter: true,
      scoreFilter: scoreToggle
    }
  
    let jsonFilter = JSON.stringify(filterOptions)

    router.push({
      pathname: '/listings/results',
      query: { 
        search: search,
        filterOptions: jsonFilter,
        amenities: jsonAmenities
      }
    })
  };

  const [dragStart, setDragStart] = useState<string>('');
  const [dragOver, setDragOver] = useState<string>('');

  const endDrag = () => {
    setDragStart('');
    setDragOver('');
  }

  useEffect(() => {
    if(openDropdown && dragOver) {
      let currIndex = rankingList.indexOf(dragStart)
      let dropIndex = rankingList.indexOf(dragOver)
      rankingList[currIndex] = dragOver
      rankingList[dropIndex] = dragStart
    }
  });

  const scoreDropdown = () => {
    if(openDropdown) {
      return  (
        <div className='grid grid-flow-row items-center my-3'>
          <button className='grid grid-flow-col justify-center items-center w-28 h-8 overflow-hidden rounded-lg text-white group bg-gradient-to-br from-orange-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800'
          onClick={() => setOpenDropdown(false)} type='button'>
            <a className='ml-2'>Ranking</a> <TbChevronUp className='ml-2' />
          </button>
          <div className='bg-gray-100 rounded-lg overflow-hidden shadow-2xl dark:bg-gray-700 m-0.5'>
            <ol className='rounded-lg divide-y divide-gray-200'>
              <li id={rankingList[0]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[0])} onDragOver={(event: any) => {event.preventDefault(); setDragOver(rankingList[0])}} onDragEnd={endDrag}>
                <a>{rankingList[0]}</a>
              </li>
              <li id={rankingList[1]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[1])} onDragOver={(event: any) => {event.preventDefault(); setDragOver(rankingList[1])}} onDragEnd={endDrag}>
                <a>{rankingList[1]}</a>
              </li>
              <li id={rankingList[2]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[2])} onDragOver={(event: any) => {event.preventDefault(); setDragOver(rankingList[2])}} onDragEnd={endDrag}>
                <a>{rankingList[2]}</a>
              </li>
              <li id={rankingList[3]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[3])} onDragOver={(event: any) => {event.preventDefault(); setDragOver(rankingList[3])}} onDragEnd={endDrag}>
                <a>{rankingList[3]}</a>
              </li>
              <li id={rankingList[4]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[4])} onDragOver={(event: any) => {event.preventDefault(); setDragOver(rankingList[4])}} onDragEnd={endDrag}>
                <a>{rankingList[4]}</a>
              </li>
            </ol>
          </div>
        </div>
    );
    } else {
      return  (
        <div className='grid grid-flow-row items-center my-3'>
          <button className='grid grid-flow-col justify-center items-center w-28 h-8 overflow-hidden rounded-lg text-white group bg-gradient-to-br from-orange-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800'
          onClick={() => setOpenDropdown(true)}>
            <a className='ml-2'>Ranking</a> <TbChevronDown className='ml-2' />
          </button>
        </div>
      );
    }
  }

  const priceFilter = () => {
    return (
      <div className='grid grid-flow-col items-center my-3'>
        <span className='font-medium mr-2 text-gray-900 dark:text-white text-lg'>Price:</span>
        <input id='min_price' name='min_price' className='bg-white w-20 border-2 border-accent text-gray-900 text-sm h-8 rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='$0' min={0} max={10000} onChange={(event: any) => {if(!event.target.value){setMinPrice(0)} else{setMinPrice(event.target.value)}}} />
        <button type='submit' className='sr-only' />
        <GoDash />
        <input id='max_price' name='max_price' className='bg-white w-20 border-2 border-accent text-gray-900 text-sm h-8 rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='$0' min={0} max={10000} onChange={(event: any) => {if(!event.target.value){setMaxPrice(10000)} else{setMaxPrice(event.target.value)}}} />
        <button type='submit' className='sr-only' />
       </div>
    );
  }

  const sizeFilter = () => {
    return (
      <div className='grid grid-flow-col items-center my-3'>
        <span className='font-medium mr-2 text-gray-900 dark:text-white text-lg'>Size:</span>
        <input id='min_size' name='min_size' className='bg-white w-20 border-2 border-accent text-gray-900 text-sm h-8 rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='sq ft' min={0} max={10000} onChange={(event: any) => {if(!event.target.value){setMinSize(0)} else{setMinSize(event.target.value)}}} />
        <button type='submit' className='sr-only' />
        <GoDash />
        <input id='max_size' name='max_size' className='bg-white w-20 border-2 border-accent text-gray-900 text-sm h-8 rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='sq ft' min={0} max={10000} onChange={(event: any) => {if(!event.target.value){setMaxSize(10000)} else{setMaxSize(event.target.value)}}} />
        <button type='submit' className='sr-only' />
       </div>
    );
  }

  const scoreCheckbox = () => {
      return (
      <div className='grid grid-flow-col items-center'>
        <span className='grid grid-flow-col items-center my-3 mr-2 text-lg h-8 font-medium text-gray-900 dark:text-gray-300'>Score</span>
        <input id='score' name='score' value='false' type='checkbox' className='cursor-pointer border-1 border-accent text-accent' data-te-toggle='tooltip' title='activate score function and use the ranking dropdown to order elements by preference from top to bottom' 
        onClick={(event: any) => setScoreToggle(event.target.checked)} />
        <button type='submit' className='sr-only' />
      </div>
      );
  }

  return  (
    <form onSubmit={handleFilter} className='relative z-10 grid grid-flow-row grid-flow-col justify-evenly'>
      <div>{priceFilter()}</div>
      <div>{sizeFilter()}</div>
      <div>{scoreCheckbox()}</div>
      <div>{scoreDropdown()}</div>
    </form>
  );
};

export default ExtraFilters;
