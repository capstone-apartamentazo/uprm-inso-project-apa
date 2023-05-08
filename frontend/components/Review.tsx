import React from 'react';
import { useListings } from 'useListings';

type Props = {
	opinion: string;
	date: string;
	rating: number;
	accmID: number;
	tenantID: number;
};

const Review: React.FC<Props> = ({ tenantID, opinion, accmID, date, rating }) => {
	let ratingStars = [];
	const { data: name } = useListings(tenantID != undefined ? 'tenants/' + tenantID : null);
	const { data: tenantPic } = useListings(tenantID != undefined ? 'images/tenant/' + tenantID : null);
	const { data: accmPic } = useListings(accmID != undefined ? 'images/accommodation/' + accmID : null);
	const { data: accm } = useListings(accmID != undefined ? 'accommodations/' + accmID : null);

	const tenantPicLink = tenantPic != undefined ? (tenantPic.total_count === 0 ? '/images/user.png' : tenantPic.resources[0].secure_url) : '';
	const accmPicLink = accmPic != undefined ? (accmPic.length > 0 ? accmPic[0].secure_url : '/images/default.jpg') : '';
	const tenantName = name != undefined ? name.tenant_name : '';
	const accmName = accm != undefined ? accm.accm_title : '';

	for (let i = 0; i < 5; i++) {
		ratingStars.push(
			<svg key={'star_' + i} aria-hidden='true' className={`w-7 h-7 ${Math.round(rating) > i ? 'text-accent' : 'text-gray-500'}`} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
				<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
			</svg>
		);
	}
	return (
		<div className='flex flex-row ring-1 shadow-lg ring-stone-200 rounded-md mt-4 mb-2'>
			<div className='flex flex-col flex-auto '>
				<h1 className='pt-6 pl-6 pr-6 pb-2 text-2xl font-bold text-left'>
					<a href='/' className='hover:underline'>
						{accmName}
					</a>
				</h1>
				<div className='flex flex-row pl-5 align-middle'>{ratingStars}</div>

				<div className='flex flex-row flex-nowrap w-full'>
					<div className='flex-auto'>
						<p className=' text-lg pl-6'>{opinion}</p>
					</div>
				</div>

				<div className='flex flex-nowrap flex-row  items-center pl-2 pb-2'>
					<div className='items-center'>
						<div className='avatar p-4'>
							<div className=' w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2'>
								<a href='' className=''>
									<img className='aspect-square' src={tenantPicLink} />
								</a>
							</div>
						</div>
					</div>
					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<a href='/' className='hover:underline'>
								{tenantName}
							</a>
						</h1>
						<h2 className='text-neutral-600'>{date}</h2>
					</div>
				</div>
			</div>
			<div className=' m-auto  items-center'>
				<div className=' w-60 p-6 h-52'>
					<a href='/'>
						<img className='h-full rounded-lg hover:shadow-lg hover:ring-1 hover:ring-stone-200 object-cover w-full' src={accmPicLink} />
					</a>
				</div>
			</div>
		</div>
	);
};
export default Review;
