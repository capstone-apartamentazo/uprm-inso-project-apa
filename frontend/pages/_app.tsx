import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
const montserrat = Montserrat({ subsets: ['latin'] });

import '@/styles/global.css';
import { AlertProvider } from 'context/alertContext';
import AlertBar from '@/components/Alert';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<AlertProvider>
			<AlertBar />
			<style jsx global>{`
				html {
					font-family: ${montserrat.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</AlertProvider>
	);
};

export default App;
