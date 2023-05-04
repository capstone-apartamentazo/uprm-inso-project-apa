import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Token } from 'Token';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Login = () => {
	const router = useRouter();
	const cookies = new Cookies();
	const [logError, setLogError] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		var data = {};
		const isLandlord = event.target.landlord.checked;

		data = {
			tenant_email: event.target.email.value,
			tenant_password: event.target.password.value,
		};

		var endpoint = `${host}/api/tenants/login`;
		if (isLandlord) {
			endpoint = `${host}/api/landlords/login`;
			data = {
				landlord_email: event.target.email.value,
				landlord_password: event.target.password.value,
			};
		}

		const JSONdata = JSON.stringify(data);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		};
		console.log(JSONdata);
		await fetch(endpoint, options)
			.then((response) => {
				if (!response.ok) {
					console.log(response);
					throw new Error('Email or password do not match!');
				} else {
					return response.json();
				}
			})
			.then((result) => {
				const decoded = jwt<Token>(result['access_token']);
				cookies.set('jwt_authorization', result['access_token'], {
					expires: new Date(decoded.exp * 1000),
				});
				router.replace('/#');
				router.reload();
			})
			.catch((error) => {
				setLogError(true);
				console.log(error);
			});
	};
	return (
		<div className='text-center'>
			<label id='login-modal' className='modal cursor-pointer'>
				<label className='modal-box relative flex' htmlFor=''>
					<div className='flex-col flex-none w-10 -my-6 bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent overscroll-none'>
						<br></br>
					</div>

					<div className='flex-col flex-auto'>
						<a href='#' className='btn btn-sm btn-circle absolute right-2 top-2'>
							✕
						</a>

						<h3 className='text-4xl text-accent font-bold my-10'>Login</h3>

						<form onSubmit={handleSubmit} className='p-5 form-control gap-10 '>
							<input type='text' id='email' name='email' placeholder='E-mail' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<input type='password' id='password' name='password' placeholder='Password' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<div className='text-left'>
								<div className='flex-row pb-5'>Account Type</div>
								<div className='flex-row text-left justify-start'>
									<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]  hover:cursor-pointer'>
										<input type='checkbox' name='checkbox' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' id='landlord' value='landlord' />
										<label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor='landlord'>
											Landlord
										</label>
									</div>
								</div>
							</div>
							<div className='flex-col'>
								<h1 hidden={!logError} className='mb-4 text-red-600'>
									Email or password did not match
								</h1>
								<button onClick={() => setLogError(false)} type='submit' className='btn w-full text-white bg-accent hover:bg-accent'>
									Log In
								</button>
							</div>
						</form>
						<p className='pb-16'>
							Don't have an account?{' '}
							<a className='text-accent' href='#signup-modal'>
								Register
							</a>
						</p>
					</div>
				</label>
			</label>
		</div>
	);
};

export default Login;
