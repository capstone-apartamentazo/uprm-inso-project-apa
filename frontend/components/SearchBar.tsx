import getConfig from 'next/config';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const SearchBar = ({ className, width }) => {
	const router = useRouter();

	const handleSearch = (event) => {
		event.preventDefault();

		router.push({
			pathname: '/listings/results',
			query: { search: event.target.search.value },
		});
	};

	return (
		<form onSubmit={handleSearch} className={`${className}`}>
			<label className='sr-only'>Search for a location...</label>{' '}
			<div className={`relative ${width}`}>
				<div className='relative w-full'>
					<input type='text' id='search' className='appearance-none bg-gray-50 bg-opacity-80 border border-accent text-gray-900 text-sm rounded-full focus:ring-accent focus:border-accent block w-full pl-5 p-2.5 pr-8' placeholder='Search for a location...' required />
					<button type='submit' className='absolute top-0.5 right-0 p-2.5 text-sm font-medium text-accent rounded-r-lg'>
						<svg aria-hidden='true' className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
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
