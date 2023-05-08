import React from 'react';
import { useContext } from 'react';
import AlertContext from 'context/alertContext';

const AlertBar = () => {
	const alertCtx = useContext(AlertContext);

	return (
		<div className='fixed w-96 top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
			{alertCtx?.alert != undefined ? (
				alertCtx.alert === 'success' ? (
					<div className={`alert alert-success shadow-lg absolute`}>
						<div>
							<svg xmlns='http://www.w3.org/2000/svg' className='stroke-current flex-shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
							<span>{alertCtx?.alertText}</span>
						</div>
					</div>
				) : (
					<div className={`alert alert-error shadow-lg absolute`}>
						<div>
							<svg xmlns='http://www.w3.org/2000/svg' className='stroke-current flex-shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
							<span>{alertCtx?.alertText}</span>
						</div>
					</div>
				)
			) : (
				<></>
			)}
		</div>
	);
};
export default AlertBar;
