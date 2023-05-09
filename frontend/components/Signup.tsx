import AlertContext, { AlertContextType } from 'context/alertContext';
import { handleModal } from 'helpers/handleModal';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Signup = () => {
	const alertCtx = useContext(AlertContext) as AlertContextType;
	const { success, error } = React.useContext(AlertContext) as AlertContextType;
	const router = useRouter();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (event.target.password.value == event.target.cpassword.value) {
			var data = {};
			data = {
				tenant_name: event.target.first.value + ' ' + event.target.last.value,
				tenant_email: event.target.email.value,
				tenant_password: event.target.password.value,
				tenant_phone: event.target.phone.value,
			};

			var endpoint = `${host}/api/tenants/new`;
			if (event.target.inlineRadio2.checked) {
				endpoint = `${host}/api/landlords/new`;
				data = {
					landlord_name: event.target.first.value + ' ' + event.target.last.value,
					landlord_email: event.target.email.value,
					landlord_password: event.target.password.value,
					landlord_phone: event.target.phone.value,
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

			await fetch(endpoint, options)
				.then((response) => {
					console.log(response);
					if (!response.ok) {
						console.log(response);
						error('Something went wrong while creating your account!');
						throw new Error('Signup unsuccessful');
					} else {
						return response.json();
					}
				})
				.then((res) => {
					success('Successfully signed up!');
					handleModal('signup-modal');
					router.replace('/#login-modal');
					router.reload();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			alert("Passwords don't match!");
		}
	};
	return (
		<div className='text-center'>
			<label id='signup-modal' className='modal cursor-pointer'>
				<label className='modal-box relative flex' htmlFor=''>
					<div className='flex-col flex-none w-10 h-[50rem] md:h-auto -my-6 bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent overscroll-none'>
						<br></br>
					</div>

					<div className='flex-col flex-auto'>
						<a onClick={() => handleModal('signup-modal')} className='btn btn-sm btn-circle absolute right-2 top-2'>
							✕
						</a>

						<h3 className='text-4xl text-accent font-bold my-10'>Create an Account</h3>

						<form onSubmit={handleSubmit} className='p-5 form-control gap-10 flex overflow-scroll md:overflow-hidden'>
							<div className='gap-5 flex-row flex'>
								<input type='text' id='first' name='first' placeholder='First Name' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
								<input type='text' id='last' name='last' placeholder='Last Name' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							</div>
							<input type='text' id='email' name='email' placeholder='E-mail' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<div className='gap-5 flex-row flex'>
								<input type='password' id='password' name='password' placeholder='Password' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
								<input type='password' id='cpassword' name='cpassword' placeholder='Confirm Password' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							</div>
							<input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' id='phone' name='phone' placeholder='Phone Number' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />

							<div className='text-left'>
								<div className='flex-row pb-5'>Account Type</div>
								<div className='flex-row text-left justify-start'>
									<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem]'>
										<input type='radio' name='inlineRadioOptions' className=' hover:cursor-pointer text-accent bg-gray-200 border-gray-200 focus:accent' id='inlineRadio1' value='student' />
										<label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor='inlineRadio1'>
											Student
										</label>
									</div>
									<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem] hover:cursor-pointer'>
										<input type='radio' name='inlineRadioOptions' className='hover:cursor-pointer  text-accent bg-gray-200 border-gray-200 focus:accent' id='inlineRadio2' value='landlord' />
										<label className='mt-px inline-block pl-2 hover:cursor-pointer' htmlFor='inlineRadio2'>
											Landlord
										</label>
									</div>
								</div>
							</div>

							<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
								Create Account
							</button>
						</form>
						<p className='pb-16'>
							Already have an account?{' '}
							<a href='#login-modal' className='text-accent'>
								Log In
							</a>
						</p>
					</div>
				</label>
			</label>
		</div>
	);
};

export default Signup;
