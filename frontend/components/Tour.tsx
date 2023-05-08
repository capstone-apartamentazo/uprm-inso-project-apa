import React from 'react';
import getConfig from 'next/config';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
	unitID: number;
	token: any;
};

const Tour: React.FC<Props> = ({ unitID, token }) => {
	const requestTour = async (event: any) => {
		let data = {
			unit_id: unitID,
			message: event.target.tour_message.value,
		};

		event.preventDefault();
		if (event) {
			console.log(data);
			await axios({ method: 'post', url: `${host}/api/tenant/sends/request/tour`, headers: { Authorization: `Bearer ${token}` }, data })
				.then((response) => {
					console.log(response.data);
					return response.data;
				})
				.catch((err) => {
					console.log(err);
					alert(err);
				});
		}
	};

	return (
		<div className='overflow-hidden'>
			<label htmlFor='requestTour' className='btn btn-primary text-white'>
				Request Tour
			</label>
			<form id={'tour'} onSubmit={requestTour}>
				<input type='checkbox' id='requestTour' className='modal-toggle' />
				<div className='modal'>
					<div className='modal-box relative flex'>
						<div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
							<br></br>
						</div>
						<div className='flex-col flex-auto'>
							<label htmlFor='requestTour' className='btn btn-sm btn-circle absolute right-2 top-2'>
								✕
							</label>

							<h2 className='text-2xl font-bold text-start text-accent'>Request a Tour</h2>

							<div className='form-control pt-2'>
								<label className='label'>
									<span className='label-text font-semibold'>Message to landlord</span>
								</label>
								<textarea
									id='tour_message'
									className='textarea shadow-inner ring-stone-200 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2 bg-white disabled:bg-white disabled:text-black disabled:font-semibold disabled'
									placeholder='I would like to have a tour of this unit.'
									value='I would like to have a tour of this unit.'
									disabled></textarea>
							</div>
							<div className='modal-action'>
								<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
									Submit Request
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Tour;
