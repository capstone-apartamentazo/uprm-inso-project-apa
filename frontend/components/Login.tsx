import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Login = () => {
	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			email: event.target.email.value,
			password: event.target.password.value,
		};

		const JSONdata = JSON.stringify(data);
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
			<input type='checkbox' id='login-modal' className='modal-toggle' />
			<label htmlFor='login-modal' className='modal cursor-pointer'>
				<label className='modal-box relative flex' htmlFor=''>
					<div className='flex-col flex-none w-10 -my-6 bg-gradient-to-b pl-5 -ml-8 mr-5 from-primary to-accent overscroll-none'>
						<br></br>
					</div>

					<div className='flex-col flex-auto'>
						<label htmlFor='login-modal' className='btn btn-sm btn-circle absolute right-2 top-2'>
							✕
						</label>

						<h3 className='text-4xl text-accent font-bold my-10'>Login</h3>

						<form onSubmit={handleSubmit} className='p-5 form-control gap-10'>
							<input type='text' id='email' name='email' placeholder='E-mail' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<input type='password' id='password' name='password' placeholder='Password' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
								Log In
							</button>
						</form>
						<p className='pb-16'>
							Don't have an account?{' '}
							<a className='text-accent' href=''>
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
