import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Signup = () => {
	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			first: event.target.first.value,
			last: event.target.last.value,
			email: event.target.email.value,
			password: event.target.password.value,
			cpassword: event.target.cpassword.value,
			type: event.target.inlineRadio1.checked ? event.target.inlineRadio1.value : event.target.inlineRadio2.value,
		};

		const JSONdata = JSON.stringify(data);
		alert(`${JSONdata}`);
		const endpoint = '/api/something';

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		};

		const response = await fetch(endpoint, options);
		const result = await response.json();

		alert(`${result.data}`);
	};
	return (
		<div className='text-center'>
			
			<label id='signup-modal' className='modal cursor-pointer'>
				<label className='modal-box relative flex' htmlFor=''>
					<div className='flex-col flex-none w-10 -my-6 bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent overscroll-none'>
						<br></br>
					</div>

					<div className='flex-col flex-auto'>
						<a href='#' className='btn btn-sm btn-circle absolute right-2 top-2'>
							✕
						</a>

						<h3 className='text-4xl text-accent font-bold my-10'>Create an Account</h3>

						<form onSubmit={handleSubmit} className='p-5 form-control gap-10 flex'>
							<div className='gap-5 flex-row flex'>
								<input type='text' id='first' name='first' placeholder='First Name' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
								<input type='text' id='last' name='last' placeholder='Last Name' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							</div>
							<input type='text' id='email' name='email' placeholder='E-mail' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<div className='gap-5 flex-row flex'>
								<input type='password' id='password' name='password' placeholder='Password' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
								<input type='password' id='cpassword' name='cpassword' placeholder='Confirm Password' className='w-1/2 bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							</div>
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
							<a href='#login-modal' className='text-accent' >
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
