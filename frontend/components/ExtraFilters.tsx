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
  const [distanceRank, setDistanceRank] = useState(0);
  const [priceRank, setPriceRank] = useState(1);
  const [sizeRank, setSizeRank] = useState(2);
  const [amenitiesRank, setAmenitiesRank] = useState(3);
  const [ratingRank, setRatingRank] = useState(4);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scoreToggle, setScoreToggle] = useState(false);
  const [rankingList, setRankingList] = useState(['distance', 'price', 'size', 'amenities', 'rating']);

  const router = useRouter();
  const { search, filter, amenities } = router.query

  const handleScore = (event: any) => {
    event.preventDefault();

    const ranking: any = {
      distance: distanceRank,
      price: priceRank,
      size: sizeRank,
      amenities: amenitiesRank,
      rating: ratingRank
    }

    let jsonAmenities = JSON.stringify(amenities)
    let jsonRanking = JSON.stringify(ranking)

    router.push({
      pathname: '/listings/results',
      query: { 
        search: search,
        filter: filter,
        score: true,
        amenities: jsonAmenities,
        ranking: jsonRanking
      }
    })
  };

  const scoreBtn = () => {
    if(scoreToggle) {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 ml-2 mr-2 mt-0.5 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-orange-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800'>
          <span className='relative px-5 py-2.5 rounded-full text-white rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='activate score function' onClick={() => setScoreToggle(false)}>
            Score
          </span>
        </button>
      );
    } else {
      return (
        <button className='relative inline-flex items-center justify-center p-0.5 ml-2 mr-2 mt-0.5 mb-1 overflow-hidden rounded-full group bg-gradient-to-br from-orange-500 to-cyan-500 group-hover:from-orange-500 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-orange'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0' data-te-toggle='tooltip' title='activate score function' onClick={() => setScoreToggle(true)}>
          Score
          </span>
        </button>
      );
    }
  }

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
  })

  const scoreDropdown = () => {
    if(openDropdown) {
      return  (
        <div className='grid grid-flow-row items-center m-2'>
          <button className='grid grid-flow-col justify-center items-center py-2 w-28 overflow-hidden rounded-lg text-white group bg-gradient-to-br from-orange-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800'
          onClick={() => setOpenDropdown(false)}>
            Ranking <TbChevronUp className='ml-2' />
          </button>
          {/* ml-2 mr-2 mt-0.5 mb-1 */}
          <div className='rounded-lg overflow-hidden shadow-2xl dark:bg-gray-700 m-0.5'>
            <ol className='rounded-lg divide-y divide-gray-200'>
              <li id={rankingList[0]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[0])} onDragOver={() => setDragOver(rankingList[0])} onDragEnd={endDrag}>
                <a>{rankingList[0]}</a>
              </li>
              <li id={rankingList[1]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[1])} onDragOver={() => setDragOver(rankingList[1])} onDragEnd={endDrag}>
                <a>{rankingList[1]}</a>
              </li>
              <li id={rankingList[2]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[2])} onDragOver={() => setDragOver(rankingList[2])} onDragEnd={endDrag}>
                <a>{rankingList[2]}</a>
              </li>
              <li id={rankingList[3]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[3])} onDragOver={() => setDragOver(rankingList[3])} onDragEnd={endDrag}>
                <a>{rankingList[3]}</a>
              </li>
              <li id={rankingList[4]} className='hover:bg-gray-200 pl-2 rounded-lg cursor-move' draggable='true' onDragStart={() => setDragStart(rankingList[4])} onDragOver={() => setDragOver(rankingList[4])} onDragEnd={endDrag}>
                <a>{rankingList[4]}</a>
              </li>
            </ol>
          </div>
        </div>
    );
    } else {
      return  (
        // px-10 py-2 ml-2 mr-2 mt-0.5 mb-1
        <div className='grid grid-flow-row items-center m-2'>
          <button className='grid grid-flow-col justify-center items-center py-2 w-28 overflow-hidden rounded-lg text-white group bg-gradient-to-br from-orange-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800'
          onClick={() => setOpenDropdown(true)}>
            Ranking <TbChevronDown className='ml-2' />
          </button>
        </div>
      );
    }
  }

  const priceFilter = () => {
    return (
      <div className='grid grid-flow-col justify-start items-center m-2'>
        <label className='font-medium mr-2 text-gray-900 dark:text-white'>Price:</label>
          <input className='bg-white w-20 border border-accent text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='$0' min={0} max={10000} />
          <GoDash />
          <input className='bg-white w-20 border border-accent text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent' type='text' inputMode='numeric' pattern='^\d{1,5}$' placeholder='$0' min={0} max={10000} />
       </div>
    );
  }

  return  (
    <div className='grid grid-flow-row grid-flow-col justify-start gap-2'>
      <div>
        {priceFilter()}
      </div>
      <div>
          {scoreBtn()}
      </div>
      <div>
        {scoreDropdown()}
      </div>
    </div>
  );
};

export default ExtraFilters;
