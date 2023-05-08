import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from '@/components/ReviewList';

const { publicRuntimeConfig } = getConfig();
const { url: host } = publicRuntimeConfig.site;

const Tenant = () => {
	const router = useRouter();
	const { id } = router.query;
	const [tenant, setTenant] = useState({ deleted_flag: false, tenant_email: '', tenant_id: 0, tenant_name: '', tenant_password: '', tenant_phone: '' });
	const [tenantImg, setTenantImg] = useState('/images/default.jpeg');

	useEffect(() => {
		if (id != null || id != undefined) {
			axios
				.get(`${host}/api/tenants/${id}`)
				.then((res) => {
					return res.data;
				})
				.then((result) => {
					setTenant(result);
				})
				.catch((err) => {
					console.error(err);
				});

			axios
				.get(`${host}/api/images/tenant/${id}`)
				.then((res) => {
					return res.data;
				})
				.then((result) => {
					return result['resources'][0];
				})
				.then((result) => {
					setTenantImg(result['secure_url']);
				})
				.catch((err) => console.error(err));
		}
	}, [id]);

	return (
		<Layout>
			<main className='flex flex-col lg:flex-row  flex-nowrap my-24'>
				<div className='flex  flex-col flex-initial basis-1/6 pt-10 pl-6 pr-6 '>
					<div className='block min-w-full rounded-xl pt-6 bg-white ring-stone-200 ring-1 shadow-lg dark:bg-neutral-700 items-center text-center'>
						<div className=''>
							<div className='avatar my-4 mx-10'>
								<div className=' w-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-4 hover:shadow-lg'>
									<img className='aspect-square' src={tenantImg} />
								</div>
							</div>
						</div>
						<div className=' '>
							<h5 className='mb-2 text-2xl pt-2 font-bold leading-tight text-neutral-800 dark:text-neutral-50'>{tenant.tenant_name}</h5>
						</div>
					</div>
					<div className='flex justify-center pt-4'>
						<div className='block min-w-full rounded-lg bg-white ring-1 ring-stone-200 shadow-lg dark:bg-neutral-700'>
							<div className='p-6'>
								<h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>Details:</h5>
								<ul>
									<li className=' text-neutral-600 dark:text-neutral-200 '>Phone: {tenant.tenant_phone}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-initial relative basis-5/6 mt-10 pl-6 pr-6 max-h-semi min-w-min  m-6 ring-1 ring-stone-200 rounded-md bg-white shadow-lg overflow-hidden'>
					<div className='text-3xl font-bold text-left shadow-md pt-6 pb-2 px-6 rounded-md absolute bg-white top-0 left-0 right-0 '>Reviews made:</div>
					<div className='overflow-auto p-4  mt-20 '>
						<ReviewList route={`tenants/reviews/${tenant.tenant_id}`} />
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Tenant;
