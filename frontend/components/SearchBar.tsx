import getConfig from 'next/config';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

interface Props {
	className: string;
	width: string;
}

const SearchBar: React.FC<Props> = ({ className, width }) => {
	const router = useRouter();

	const { filterOptions, amenities } = router.query
	let filter: any = {}
	let jsonAmenities: any = ''

	try {
		let jsonParseFilter = JSON.parse((filterOptions as string));
		let amenitiesFilter = jsonParseFilter['amenitiesFilter'];
		let scoreFilter = jsonParseFilter['scoreFilter'];
		let jsonParseAmn = JSON.parse((amenities as string))
		filter = {
      amenitiesFilter: amenitiesFilter,
      scoreFilter: scoreFilter
    }
		jsonAmenities = JSON.stringify(jsonParseAmn)
	} catch(error) {
	 filter = {
      amenitiesFilter: false,
      scoreFilter: false
    }
	}

	let jsonFilter = JSON.stringify(filter)

	const handleSearch = (event: any) => {
		event.preventDefault();

		router.push({
			pathname: '/listings/results',
			query: { 
				search: event.target.search.value,
				filterOptions: jsonFilter,
				amenities: jsonAmenities
		},
		});
	};

	return (
		<form onSubmit={handleSearch} className={`${className}`}>
			<label className='sr-only'>Search for a location...</label>{' '}
			<div className={`relative ${width}`}>
				<div className='relative w-full'>
					<input type='text' id='search' className='appearance-none bg-white border border-accent text-gray-900 text-sm rounded-full focus:ring-accent focus:border-accent block w-full pl-5 p-3.5 pr-8' placeholder='Search for a location...' required />
					<button type='submit' className='absolute top-[0.340rem] right-2 p-2 text-sm font-medium text-accent hover:bg-accent hover:text-white transition ease-in-out duration-300 hover:shadow-sm rounded-full'>
						<svg aria-hidden='true' className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
						</svg>
						<span className='sr-only'>Search</span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default SearchBar;
