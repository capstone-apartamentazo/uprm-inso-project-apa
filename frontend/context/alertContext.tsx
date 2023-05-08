import React, { useState } from 'react';

type STATE = {
	SUCCESS: 'success';
	ERROR: 'error';
};

const STATES: STATE = {
	SUCCESS: 'success',
	ERROR: 'error',
};

export interface IAlert {
	text: string;
	state: STATE;
	status: boolean;
}

export type AlertContextType = {
	alert: STATE['SUCCESS'] | STATE['ERROR'] | null;
	alertText: string;
	success: (text: string) => void;
	error: (text: string) => void;
	clear: () => void;
};

const AlertContext = React.createContext<AlertContextType | null>(null);

const AlertProvider: React.FC<React.ReactNode> = ({ children }) => {
	const [alert, setAlert] = React.useState<STATE['SUCCESS'] | STATE['ERROR'] | null>(null);
	const [alertText, setAlertText] = useState('');

	const success = (text: string) => {
		window.scroll(0, 0);
		setAlertText(text);
		setAlert(STATES.SUCCESS);
		setTimeout(function () {
			setAlertText('');
			setAlert(null);
		}, 5000);
	};
	const error = (text: string) => {
		window.scroll(0, 0);
		setAlertText(text);
		setAlert(STATES.ERROR);
		setTimeout(function () {
			setAlertText('');
			setAlert(null);
		}, 5000);
	};
	const clear = () => {
		setAlertText('');
		setAlert(null);
	};
	return (
		<AlertContext.Provider
			value={{
				success,
				error,
				clear,
				alert,
				alertText,
			}}>
			{children}
		</AlertContext.Provider>
	);
};

export { AlertProvider };
export default AlertContext;
