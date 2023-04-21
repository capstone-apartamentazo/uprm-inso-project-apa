import { useRouter } from 'next/router';

export default function Hero() {
	const router = useRouter();

	const handleSearch = (event) => {
		event.preventDefault();

		router.push({
			pathname: '/listings/results',
			query: { search: event.target.search.value },
		});
	};
	return (
		<section className='text-center bg-transparent text-white mb-48'>
			<svg xmlns='http://www.w3.org/2000/svg' className='absolute block w-full' style={{ margin: 'auto', zIndex: '-10' }} height='700' preserveAspectRatio='none' viewBox='0 0 1920 880'>
				<g transform='translate(960,440) scale(1,1) translate(-960,-440)'>
					<linearGradient id='lg-0.047955344060927496' x1='0' x2='1' y1='0' y2='0'>
						<stop stopColor='hsl(195.7,39.4%,32.4%)' offset='0'></stop>
						<stop stopColor='hsl(18.9,66.5%,67.3%)' offset='1'></stop>
					</linearGradient>
					<path d='' fill='url(#lg-0.047955344060927496)' opacity='0.6'>
						<animate
							attributeName='d'
							dur='33.333333333333336s'
							repeatCount='indefinite'
							keyTimes='0;0.333;0.667;1'
							calcMode='spline'
							keySplines='0.3 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1'
							begin='0s'
							values='
							M0 0L 0 704.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 612.0661063245175T 1920 501.8788007488083L 1920 0 Z;
							M0 0L 0 777.6839081951588Q 320 668.0720922803877  640 649.0018928349388T 1280 428.7087077664202T 1920 362.95038242563396L 1920 0 Z;
							M0 0L 0 624.9886210051687Q 320 661.4364572061575  640 623.2173947479624T 1280 459.20353038907734T 1920 335.51673041732283L 1920 0 Z;
							M0 0L 0 704.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 612.0661063245175T 1920 501.8788007488083L 1920 0 Z'></animate>
					</path>
					<path d='' fill='url(#lg-0.047955344060927496)' opacity='0.6'>
						<animate
							attributeName='d'
							dur='33.333333333333336s'
							repeatCount='indefinite'
							keyTimes='0;0.333;0.667;1'
							calcMode='spline'
							keySplines='0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1'
							begin='-6.666666666666667s'
							values='
							M0 0L 0 665.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 390.38947978522663L 1920 0 Z;
							M0 0L 0 742.1984196370487Q 320 570.6690721707517  640 540.6844954979398T 1280 439.92879442880593T 1920 400.29713960445451L 1920 0 Z;
							M0 0L 0 696.6802345094818Q 320 721.9216894353016  640 696.8815669355181T 1280 373.6367381440213T 1920 396.63169821789495L 1920 0 Z;
							M0 0L 0 665.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 390.38947978522663L 1920 0 Z'></animate>
					</path>
					<path d='' fill='url(#lg-0.047955344060927496)' opacity='0.6'>
						<animate
							attributeName='d'
							dur='33.333333333333336s'
							repeatCount='indefinite'
							keyTimes='0;0.333;0.667;1'
							calcMode='spline'
							keySplines='0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1'
							begin='-13.333333333333334s'
							values='
							M0 0L 0 701.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 424.7551247480177L 1920 0 Z;
							M0 0L 0 721.0401780336218Q 320 670.8690783540507  640 637.0744123031742T 1280 456.40745286432224T 1920 478.1294357804296L 1920 0 Z;
							M0 0L 0 644.0534225112256Q 320 637.6425395409125  640 593.2079605185819T 1280 457.03995196824286T 1920 454.87693899994804L 1920 0 Z;
							M0 0L 0 701.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 424.7551247480177L 1920 0 Z'></animate>
					</path>
					<path d='' fill='url(#lg-0.047955344060927496)' opacity='0.6'>
						<animate
							attributeName='d'
							dur='33.333333333333336s'
							repeatCount='indefinite'
							keyTimes='0;0.333;0.667;1'
							calcMode='spline'
							keySplines='0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1'
							begin='-20s'
							values='
							M0 0L 0 717.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 409.017381620229L 1920 0 Z;
							M0 0L 0 702.0504889976935Q 320 561.3963273210122  640 537.6024084387631T 1280 430.41283267566695T 1920 456.1972069733954L 1920 0 Z;
							M0 0L 0 689.4448177495887Q 320 561.9675446430498  640 531.6192318019404T 1280 414.76018143244175T 1920 465.9163329632971L 1920 0 Z;
							M0 0L 0 717.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 409.017381620229L 1920 0 Z'></animate>
					</path>
					<path d='' fill='url(#lg-0.047955344060927496)' opacity='0.6'>
						<animate
							attributeName='d'
							dur='33.333333333333336s'
							repeatCount='indefinite'
							keyTimes='0;0.333;0.667;1'
							calcMode='spline'
							keySplines='0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1'
							begin='-26.666666666666668s'
							values='
							M0 0L 0 744.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 390.81850676853674L 1920 0 Z;
							M0 0L 0 771.4928294956283Q 320 618.9784567388518  640 593.1183717103518T 1280 376.5051942642811T 1920 341.32293927545027L 1920 0 Z;
							M0 0L 0 682.0118384610068Q 320 727.3267836497654  640 694.0476176759635T 1280 518.1545471640493T 1920 476.0053882957168L 1920 0 Z;
							M0 0L 0 744.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 390.81850676853674L 1920 0 Z'></animate>
					</path>
				</g>
			</svg>
			<h1 className='text-5xl mb-4 pt-48 font-semibold'>Apartamentazo</h1>
			<h2 className='font-semibold mb-5 text-lg'>Helping you find your next college apartment</h2>

			<form onSubmit={handleSearch} className='flex items-center justify-center'>
				<label className='sr-only'>Search for a location...</label>{' '}
				<div className='relative w-2/6'>
					<div className='relative w-full'>
						<input type='text' id='search' className='appearance-none bg-gray-50 bg-opacity-80 border border-accent text-gray-900 text-sm rounded-full focus:ring-accent focus:border-accent block w-full pl-5 p-2.5 pr-8' placeholder='Search for a location...' required />
						<button type='submit' className='absolute top-0.5 right-0 p-2.5 text-sm font-medium text-accent rounded-r-lg'>
							<svg aria-hidden='true' className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
							</svg>
							<span className='sr-only'>Search</span>
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}
