import React, { useState } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
	accmID: number;
	token: any;
};

const WriteReview: React.FC<Props> = ({ accmID, token }) => {
	const [rating, setRating] = useState(1);

	const createReview = async (event: any) => {
		let data = {
			accm_id: accmID,
			rating: rating,
			comment: event.target.comment.value,
		};

		event.preventDefault();
		if (event) {
			console.log(data);
			await axios({ method: 'post', url: `${host}/api/reviews/add`, headers: { Authorization: `Bearer ${token}` }, data })
				.then((response) => {
					console.log(response.data);
					return response.data;
				})
				.catch((err) => {
					console.log(err);
					alert(err);
					//router.replace()
				});
		}
	};
	function handleRating(num: number) {
		var rating1 = document.getElementById('rating_1');
		var rating2 = document.getElementById('rating_2');
		var rating3 = document.getElementById('rating_3');
		var rating4 = document.getElementById('rating_4');
		var rating5 = document.getElementById('rating_5');

		rating1?.classList.contains('text-accent') ? rating1?.classList.remove('text-accent') : null;
		rating2?.classList.contains('text-accent') ? rating2?.classList.remove('text-accent') : null;
		rating3?.classList.contains('text-accent') ? rating3?.classList.remove('text-accent') : null;
		rating4?.classList.contains('text-accent') ? rating4?.classList.remove('text-accent') : null;
		rating5?.classList.contains('text-accent') ? rating5?.classList.remove('text-accent') : null;

		for (let i: number = 1; i <= num; i++) {
			var id = 'rating_' + i;
			document.getElementById(id)?.classList.contains('text-accent');
			document.getElementById(id)?.classList.toggle('text-accent');
		}
		setRating(num);
	}

	return (
		<div className=' overflow-hidden'>
			<label htmlFor='addReview' className='btn btn-accent'>
				Add Review
			</label>
			<form id={'review'} onSubmit={createReview}>
				<input type='checkbox' id='addReview' className='modal-toggle' />
				<div className='modal'>
					<div className='modal-box relative flex'>
						<div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
							<br></br>
						</div>
						<div className='flex-col flex-auto'>
							<label htmlFor='addReview' className='btn btn-sm btn-circle absolute right-2 top-2'>
								✕
							</label>

							<h2 className='text-2xl font-bold text-start text-accent'>Write a Review</h2>

							<div className='text-end justify-end'>
								<span className='flex flex-row-reverse justify-end'>
									<svg
										id={'rating_5'}
										onClick={() => {
											handleRating(5);
										}}
										className='cursor-pointer peer peer-hover:text-accent hover:text-accent duration-100 '
										width='23'
										height='23'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
									</svg>

									<svg
										id={'rating_4'}
										onClick={() => {
											handleRating(4);
										}}
										className='cursor-pointer peer peer-hover:text-accent hover:text-accent duration-100 '
										width='23'
										height='23'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
									</svg>

									<svg
										id={'rating_3'}
										onClick={() => {
											handleRating(3);
										}}
										className='cursor-pointer peer peer-hover:text-accent hover:text-accent duration-100 '
										width='23'
										height='23'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
									</svg>

									<svg
										id={'rating_2'}
										onClick={() => {
											handleRating(2);
										}}
										className='cursor-pointer peer peer-hover:text-accent hover:text-accent duration-100 '
										width='23'
										height='23'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
									</svg>

									<svg
										id={'rating_1'}
										onClick={() => {
											handleRating(1);
										}}
										className=' cursor-pointer peer peer-hover:text-accent hover:text-accent duration-100 '
										width='23'
										height='23'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
									</svg>
								</span>
							</div>

							<div className='form-control pt-2'>
								<label className='label'>
									<span className='label-text font-semibold'>Review</span>
								</label>
								<textarea id='comment' className='textarea shadow-inner ring-stone-200 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2 bg-gray-100' placeholder='Your opinion about the unit...'></textarea>
							</div>
							<div className='modal-action'>
								<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
									Submit Review
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default WriteReview;
