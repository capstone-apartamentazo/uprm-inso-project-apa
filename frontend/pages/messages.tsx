import Layout from '@/components/Layout';
import Conversation from '@/components/Conversation';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import MessageList from '@/components/MessageList';
import { useRouter } from 'next/router';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';
import { Storage } from 'Storage';
import { Msg } from 'Msg';
import getConfig from 'next/config';

interface Props {
	messages: Msg[];
}
const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Messages: React.FC<Props> = ({}) => {
	const dummy = useRef<null | HTMLDivElement>(null);

	const [storage, setStorage] = useState<Storage>({ token: null, isLandlord: null, id: null });
	const [selected, setSelected] = useState(0);
	const router = useRouter();
	const cookies = new Cookies();
	const [currentConvoName, setCurrentConvoName] = useState('');

	useEffect(() => {
		try {
			const token = cookies.get('jwt_authorization');
			const decoded = jwt<Token>(token);
			setStorage({ token: token, id: decoded['id'], isLandlord: decoded['rls'] == 'landlord' ? true : false });
			var endpoint = `${host}/api/tenants/refresh`;
			if (storage.isLandlord) {
				endpoint = `${host}/api/landlords/refresh`;
			}
			axios({ method: 'get', url: endpoint, headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					return res.data;
				})
				.then((result) => {
					const newToken = result['access_token'];
					const newDecoded = jwt<Token>(newToken);

					cookies.set('jwt_authorization', result['access_token'], {
						expires: new Date(newDecoded.exp * 1000),
					});
					setStorage({ token: newToken, id: newDecoded['id'], isLandlord: newDecoded['rls'] == 'landlord' ? true : false });
				})
				.catch((err) => {
					console.error(err);
				});
		} catch (err) {
			router.replace('/');
			console.error(err);
		}
	}, []);

	const [selectedIndex, setSelectedIndex] = useState(-1);
	function handleSelection(landlord_id: number, tenant_id: number, index: number, tenant_name: string, landlord_name: string) {
		setSelectedIndex(index);
		if (storage?.isLandlord) {
			setSelected(tenant_id);
			setCurrentConvoName(tenant_name);
		} else {
			setSelected(landlord_id);
			setCurrentConvoName(landlord_name);
		}
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		var data = {};
		var endpoint = `${host}/api/tenant/sends/message`;
		if (storage.isLandlord) {
			endpoint = `${host}/api/landlord/sends/message`;
			data = {
				tenant_id: selected,
				msg_content: event.target.msg.value,
			};
		} else {
			data = {
				landlord_id: selected,
				msg_content: event.target.msg.value,
			};
		}
		const JSONdata = JSON.stringify(data);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + storage.token,
			},
			body: JSONdata,
		};
		await fetch(endpoint, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Could not send message!');
				} else {
					mutate(`${host}/api/messages`);
					mutate(`${host}/api/messages/conversation/${selected}`);
					event.target.msg.value = '';
					return response.json();
				}
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	const {
		data: convos,
		error: convoError,
		isLoading: isLoadingConvo,
	} = useSWR(storage.token != null ? `${host}/api/messages` : null, (url) =>
		fetch(url, {
			headers: {
				Authorization: `Bearer ${storage?.token}`,
			},
		}).then((res) => {
			return res.json();
		})
	);

	if (convoError) {
		console.log(convoError);
		return (
			<div>
				<h1>Error found</h1>
				<button
					onClick={() => {
						router.reload();
					}}
					className='btn border-2 mr-4'>
					Reload
				</button>
			</div>
		);
	}
	if (isLoadingConvo) {
		return <p>Loading...</p>;
	}
	if (!convos || convos == 'Conversation Not Found' || convos == 'Messages from User is Empty') {
		return (
			<Layout>
				<div>
					<main className='flex flex-col flex-nowrap pt-32 pl-10 pr-10 bg-gray-50'>
						<div className='flex flex-row flex-nowrap'>
							<div className='grid grid-rows-auto auto-rows-min gap-1 ml-10 mr-6 basis-1/4  h-128 ring-1 ring-stone-200 rounded-lg shadow-lg overflow-hidden'>
								<div className='h-16'>
									<div className='h-16 pl-4 pt-4  shadow-md'>
										<h1 className=' text-3xl font-bold text-left '>Messages</h1>
									</div>
								</div>
								<div className=''>
									<div>
										<h1 className='mx-4 mt-2 text-lg font-medium'>Your mailbox is empty</h1>
									</div>
								</div>
							</div>

							<div className='grid grid-rows-auto relative w-4/6 h-128 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg opacity-50'>
								<div>
									<div className='flex flex-row flex-nowrap h-16 bg-white   drop-shadow-md items-center '>
										<div className='avatar p-4 hidden'>
											<div className=' w-10 rounded-full ring-1 ring-accent ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2'>
												<a href='' className=''>
													<img className='aspect-square' src='/images/person.png' />
												</a>
											</div>
										</div>

										<h1 className='font-semibold text-xl'>{}</h1>
									</div>
								</div>
								<div className='overflow-auto mx-4 overscroll-contain'></div>

								<div className='absolute inset-x-0 bottom-0'>
									<form onSubmit={handleSubmit} className=' form-control flex flex-row justify-center my-3'>
										<input readOnly maxLength={255} type='text' id='msg' name='msg' placeholder='' className='input flex-grow mx-4 ring-primary ring-2 ring-offset-2 focus:outline-none focus:border-0 focus:ring-primary focus:ring-2 focus:ring-offset-2' required />

										<button type='submit' className='btn btn-circle  btn-primary border-2 mr-4 opacity-50'>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 stroke-white '>
												<path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
											</svg>
										</button>
									</form>
								</div>
							</div>
						</div>
					</main>
				</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<main className='flex flex-col flex-nowrap pt-32 pl-10 pr-10 bg-gray-50'>
				<div className='flex flex-row flex-nowrap'>
					<div className='grid grid-rows-auto auto-rows-auto relative gap-1 ml-10 mr-6 basis-1/4  h-128 ring-1 ring-stone-200 rounded-lg shadow-lg overflow-hidden'>
						<div className='h-16 absolute inset-x-0 top-0 '>
							<div className='h-16 pl-4 pt-4  shadow-md'>
								<h1 className=' text-3xl font-bold text-left '>Messages</h1>
							</div>
						</div>
						<div className='overflow-auto  mt-16 overscroll-contain row-span-4'>
							{convos.map((message: Msg, index: number) => (
								<Conversation
									onClick={() => {
										handleSelection(message.landlord_id, message.tenant_id, index, message.tenant_name, message.landlord_name);
									}}
									key={message.message_id}
									msg={message}
									isLandlord={storage.isLandlord}
									convoId={storage.isLandlord ? message.tenant_id : message.landlord_id}
									host={host}></Conversation>
							))}
						</div>
					</div>

					<div className={selectedIndex < 0 ? 'grid grid-rows-auto relative w-4/6 h-128 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg opacity-50' : 'grid grid-rows-auto relative w-4/6 h-128 mr-6 gap-1 ring-1 ring-stone-200 rounded-lg overflow-hidden shadow-lg'}>
						<div className='absolute inset-x-0 top-0'>
							<div className='flex flex-row flex-nowrap h-16 bg-white   drop-shadow-md items-center '>
								<div className='avatar p-4 hidden'>
									<div className=' w-10 rounded-full  ring-offset-base-100 ring-offset-2 hover:shadow-lg hover:ring-2'>
										<a href='' className=''>
											<img className='aspect-square' src='/images/person.png' />
										</a>
									</div>
								</div>

								<div className='flex flex-col mx-4'>
									<h1 className=' font-semibold text-xl'>{currentConvoName} </h1>
									<h2 className={selected ? 'text-xs font-medium' : 'hidden'}>ID: {storage ? selected : ''}</h2>
								</div>
							</div>
						</div>

						<MessageList u_id={selected} selected={selected}></MessageList>

						<div className='absolute inset-x-0 bottom-0'>
							<form onSubmit={handleSubmit} className=' form-control flex flex-row justify-center my-2'>
								<input
									readOnly={selectedIndex < 0}
									maxLength={255}
									type='text'
									id='msg'
									name='msg'
									placeholder={selectedIndex < 0 ? '' : 'Type here'}
									className='input flex-grow mx-4 ring-primary ring-2 ring-offset-2 focus:outline-none focus:border-0 focus:ring-primary focus:ring-2 focus:ring-offset-2'
									required
								/>

								<button type='submit' className={selected < 1 ? 'btn btn-circle  btn-primary border-2 mr-4 opacity-50' : 'btn btn-circle  btn-primary border-2 mr-4'}>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 stroke-white '>
										<path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Messages;
