import getConfig from 'next/config';

import Layout from '@/components/Layout';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Loaderio = () => {
	return (
		<Layout>
				<div>
          loaderio-fa0db6d49f8bf2f6c766b1e054e189b8
				</div>
		</Layout>
	);
};

export default Loaderio;