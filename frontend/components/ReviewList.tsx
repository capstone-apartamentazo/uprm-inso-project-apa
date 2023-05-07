import React from 'react';
import Review from '@/components/Review';
import { useListings } from 'useListings';

type Props = {
	route: string;
};

const ReviewList: React.FC<Props> = (route) => {
	let allReviews: any[] = [];
	const { data: reviews } = useListings(route.route);

	if (!reviews || reviews === undefined) return <div>Loading...</div>;
	try {
		reviews.map((review: any) => {
			const { data: name } = useListings(reviews != undefined ? 'tenants/' + review.tenant_id : '');
			const { data: tenantPic } = useListings(reviews != undefined ? 'images/tenant/' + review.tenant_id : '');
			const { data: accmPic } = useListings(reviews != undefined ? 'images/accommodation/' + review.accm_id : '');
			const { data: accm } = useListings(reviews != undefined ? 'accommodations/' + review.accm_id : '');

			const tenantPicLink = tenantPic != undefined ? (tenantPic.total_count === 0 ? '/images/user.png' : tenantPic.resources[0].secure_url) : '';
			const accmPicLink = accmPic != undefined ? (accmPic.length > 0 ? accmPic[0].secure_url : '/images/default.jpg') : '';
			const tenantName = name != undefined ? name.tenant_name : '';
			const accmName = accm != undefined ? accm.accm_title : '';
			const rating = review != undefined ? review.rating : '';
			allReviews.push(
				<div key={review.review_id} className='space-y-4'>
					<Review opinion={review.comment} listingTitle={accmName} listingImg={accmPicLink} name={tenantName} date={review.review_send_date} userImg={tenantPicLink} rating={rating} />{' '}
				</div>
			);
		});
	} catch (ex) {
		allReviews.push(
			<div className='card w-96 shadow-md mt-4 bg-white'>
				<div className='card-body'>
					<p className='text-lg'>No reviews found</p>
				</div>
			</div>
		);
	}

	return <div className='flex flex-col'>{allReviews}</div>;
};
export default ReviewList;
