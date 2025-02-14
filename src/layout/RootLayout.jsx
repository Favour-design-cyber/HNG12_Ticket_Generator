import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router';
import PageHeader from '../components/PageHeader';
import { AuthContext } from '../context/AuthContext';

const RootLayout = () => {
	const { formData, setFormData } = useContext(AuthContext);
	const [isValidTicket, setIsValidTicket] = useState(false);
	const [ticketGenerated, setTicketGenerated] = useState(false);
	const [message, setMessage] = useState({});
	const location = useLocation();
	const isFirstPage = location.pathname === '/ticket-selection';
    
	useEffect(() => {
		const storedData = sessionStorage.getItem('formData');
		if (storedData) {
			setFormData(JSON.parse(storedData));
		}
	}, [setFormData]);

	useEffect(() => {
		if (message?.message) {
			const timeout = setTimeout(
				() => setMessage(null),
				isFirstPage ? 2000 : 5000
			);
			return () => clearTimeout(timeout);
		}
	}, [message]);

	return (
		<main>
			<PageHeader />
			<Outlet
				context={{
					isValidTicket,
					setIsValidTicket,
					message,
					setMessage,
					ticketGenerated,
					setTicketGenerated,
				}}
			/>
		</main>
	);
};

export default RootLayout;
