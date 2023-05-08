import React from 'react';
import Review from '@/components/Review';
import { useListings } from 'useListings';

type Props = {
	route: string;
};

const ReviewList: React.FC<Props> = (route) => {
	let allReviews: any[] = [];
	const { data: reviews } = useListings(route.route != undefined ? route.route : null);

	if (!reviews || reviews === undefined) return <div>Loading...</div>;
	if (reviews === 'Empty List')
		allReviews.push(
			<div key='no_reviews' className='card w-96 shadow-md mt-4 bg-white'>
				<div className='card-body'>
					<p className='text-lg'>No reviews found</p>
				</div>
			</div>
		);
	else
		reviews.map((review: any) => {
			allReviews.push(
				<div key={'review_id' + review.review_id} className='space-y-4'>
					<Review opinion={review.comment} accmID={review.accm_id} tenantID={review.tenant_id} date={review.review_send_date} rating={review.rating} />{' '}
				</div>
			);
		});

	return <div className='flex flex-col'>{allReviews}</div>;
};
export default ReviewList;
