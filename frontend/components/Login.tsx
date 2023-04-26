import getConfig from 'next/config';
import { type } from 'os';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { resolve } from 'path';
import { ApiError } from 'next/dist/server/api-utils';


const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;


const Login = () => {
	
	const router = useRouter()
	

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		
		const data = {
			"landlord_email": event.target.email.value,
			"landlord_password": event.target.password.value,
			"type": "landlord"
		};
		//console.log(data);
		const JSONdata = JSON.stringify(data);
		//console.log(JSONdata);
		const endpoint = 'http://127.0.0.1:5000/api/landlords/login';

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata
		};

		await fetch(endpoint, options)
		.then((response) => {
			//console.log(response);
			if (!response.ok){
				console.log(response)
				//alert("first error")
				throw new Error("Email or password not match!");
			}else{
				return response.json()
			}
		})
			
		.then(result =>{
			//alert(result);
			const objc = {"token":(result['access_token']), "type":data.type, 'id':5};
			const stringified = JSON.stringify(objc)
			localStorage.setItem("data",stringified)

			// localStorage.setItem('token', result["access_token"]);
			// localStorage.setItem('type', data.type)
			// localStorage.setItem('id', 1)
			//console.log()
			//console.log(JSON.parse(localStorage.getItem('data')!).token === ("Bearer "+result['access_token']));
			alert(`Logged in success`);
			//router.push('#');

			

		})
		.catch((error) => {
			console.log(error);
			alert(error);
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

						<form onSubmit={handleSubmit}  className='p-5 form-control gap-10'>
							<input type='text' id='email' name='email' placeholder='E-mail' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<input type='password' id='password' name='password' placeholder='Password' className='bg-gray-200 bg-opacity-50 border border-transparent focus:ring-accent focus:border-accent pl-4' required />
							<button type='submit' className='btn text-white bg-accent hover:bg-accent'>
								Log In
							</button>
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
