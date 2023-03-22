import Image from 'next/image';

export default function Card() {
	return (
		<div className=' bg-white rounded-2xl p-4 w-48 border-2 border-gray-100 hover:bg-gray-100 text-center shadow-lg'>
			<div className='bg-white rounded-2xl h-36 text-center border-2 border-gray-100'>
				<Image src='https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' className='rounded-2xl h-full' width={400} height={400} alt='...' />
			</div>
			<p className='font-bold my-6'>Card title</p>
			<p className='mb-6'>example description</p>
		</div>
	);
}
