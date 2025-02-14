import React from 'react';
import TicketSelection from './TicketSelection';
import AttendeeForm from './AttendeeForm';
import Ticket from './Ticket';
import WelcomePage from './WelcomePage';
import { HashRouter, Routes, Route } from 'react-router';
import RootLayout from '../layout/RootLayout';

const TicketApp = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route index element={<WelcomePage />} />
						<Route path='/ticket-selection' element={<TicketSelection />} />
						<Route path='/attendee-form' element={<AttendeeForm />} />
						<Route path='/ticket' element={<Ticket />} />
						<Route path='*' element={<WelcomePage />} />
					</Route>
				</Routes>
			</HashRouter>
		</>
	);
};

export default TicketApp;
