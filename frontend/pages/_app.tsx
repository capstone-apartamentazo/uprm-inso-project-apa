import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
const montserrat = Montserrat({ subsets: ['latin'] });

import '@/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${montserrat.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
};

export default App;
