import React, { useState, useEffect, useContext } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import AlertContext, { AlertContextType, IAlert } from 'context/alertContext';
import { handleModal } from 'helpers/handleModal';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

type Props = {
	unitID: number;
	token: any;
	landlordID: number;
};

const Contact: React.FC<Props> = ({ unitID, landlordID, token }) => {
	const alertCtx = useContext(AlertContext) as AlertContextType;
	const { success, error } = React.useContext(AlertContext) as AlertContextType;

	const sendMessage = async (event: any) => {
		let data = {
			unit_id: unitID,
			msg_content: event.target.contact_message.value,
			landlord_id: landlordID,
		};

		event.preventDefault();
		if (event) {
			await axios({ method: 'post', url: `${host}/api/tenant/sends/message`, headers: { Authorization: `Bearer ${token}` }, data })
				.then((response) => {
					handleModal('modal_container');
					success('Sent the message successfully!');
					return response.data;
				})
				.catch((err) => {
					handleModal('modal_container');
					error('You must be signed in to do this!');
				});
		}
	};

	return (
		<div className='overflow-hidden'>
			<label htmlFor='sendMessage' onClick={() => handleModal('modal_container')} className='btn btn-primary btn-sm hover:text-white'>
				Contact
			</label>
			<form id={'contact'} onSubmit={sendMessage}>
				<div id='modal_container' className='modal'>
					<div className='modal-box relative flex'>
						<div className='flex-col flex-none w-10 -my-8  bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent'>
							<br></br>
						</div>
						<div className='flex-col flex-auto'>
							<label id='sendMessage_X' onClick={() => handleModal('modal_container')} htmlFor='sendMessage' className='btn btn-sm btn-circle absolute right-2 top-2'>
								✕
							</label>

							<h2 className='text-2xl font-bold text-start text-accent'>Contact</h2>

							<div className='form-control pt-2'>
								<label className='label'>
									<span className='label-text font-semibold'>Message to landlord</span>
								</label>
								<textarea id='contact_message' className='textarea shadow-inner bg-gray-100 ring-stone-200 focus:outline-none focus:border-0 focus:ring-accent focus:ring-2 focus:ring-offset-2' placeholder='Your message to the landlord...'></textarea>
							</div>
							<div className='modal-action'>
								<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
									Send Message
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Contact;
