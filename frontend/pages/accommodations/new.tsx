import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Review from '@/components/Review';
import Image from 'next/image';


const New = () => {
	return (
		<Layout>
			<main className='flex flex-col'>
				<div>Images</div>
                <div>Name and price</div>
			</main>
		</Layout>
	);
};

export default New;
