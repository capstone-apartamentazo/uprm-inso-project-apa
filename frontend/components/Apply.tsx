import React from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import AlertContext, { AlertContextType, IAlert } from 'context/alertContext';
import { handleModal } from 'helpers/handleModal';
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
	unitID: number;
	token: any;
};

const Apply: React.FC<Props> = ({ unitID, token }) => {
	const { success, error } = React.useContext(AlertContext) as AlertContextType;
	const sendApp = async (event: any) => {
		let data = {
			unit_id: unitID,
		};

		event.preventDefault();
		if (event) {
			await axios({ method: 'post', url: `${host}/api/tenant/sends/request`, headers: { Authorization: `Bearer ${token}` }, data })
				.then((response) => {
					handleModal('modal_apply');
					success('Sent your message to the landlord!');
					return response.data;
				})
				.catch((err) => {
					handleModal('modal_apply');
					error('You must be signed in to do this!');
				});
		}
	};

	return (
		<div className='overflow-hidden'>
			<label htmlFor='apply' onClick={() => handleModal('modal_apply')} className='btn btn-secondary text-secondary hover:bg-primary-200 hover:text-white bg-transparent'>
				Apply
			</label>
			<form id='apply_unit' onSubmit={sendApp}>
				<div id={'modal_apply'} className='modal'>
					<div className='modal-box relative flex'>
						<div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
							<br></br>
						</div>
						<div className='flex-col flex-auto'>
							<label htmlFor='apply' onClick={() => handleModal('modal_apply')} className='btn btn-sm btn-circle absolute right-2 top-2'>
								✕
							</label>

							<h2 className='text-2xl font-bold text-start text-accent'>Apply</h2>

							<div className='form-control pt-2'>
								<label className='label'>
									<span className='label-text font-semibold'>Message to landlord</span>
								</label>
								<textarea
									id='apply_message'
									className='textarea shadow-inner ring-stone-200 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2 bg-white disabled:text-black disabled:font-semibold disabled:bg-white'
									value='I would like to apply for this unit. No need for a tour.'
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
export default Apply;
