import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import BarCode from '../components/Barcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate, useOutletContext } from 'react-router';
import MessageHandler from '../components/message/MessageHandler';
import { toast } from 'react-toastify';

const Ticket = () => {
	const { ticketGenerated, setTicketGenerated, setMessage } =
		useOutletContext();
	const navigate = useNavigate();
	const [userTicket, setUserTicket] = useState(null);
	useEffect(() => {
		const storedFormData = sessionStorage.getItem('formData');
		const storedTickedGenerated = sessionStorage.getItem('ticketGenerated');

		if (storedTickedGenerated) {
			setTicketGenerated(JSON.parse(storedTickedGenerated));
		}
		setUserTicket(JSON.parse(storedFormData));
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => handleTicketDownload(), 3000);
		return () => clearTimeout(timeout);
	}, []);

	const handleTicketDownload = async () => {
		const isConfirmed = window.confirm(
			'Are you sure you want to download the ticket as a PDF?'
		);

		if (!isConfirmed) return;
		const ticketElm = document.getElementById('ticket-container');
		if (!ticketElm) return;

		const canvas = await html2canvas(ticketElm, { useCORS: true });
		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF('p', 'mm', 'a4');
		pdf.addImage(imgData, 'PNG', 10, 10, 120, 250, 'Techember-Ticket');

		pdf.save('ticket.pdf');
	};

	const handleAnotherTicket = () => {
		sessionStorage.removeItem('formData');
		sessionStorage.removeItem('file');
		sessionStorage.removeItem('ticketGenerated')
		navigate('/ticket-selection');
	};

	if (!ticketGenerated) {
		setMessage({
			message: 'You do not have any active / generated ticket, select a ticket?',
			type: 'error',
		});
		navigate('/ticket-selection');
	}

	return (
		<>
			<section className='ticket-main-container h-[1056px] animate__animated animate__fadeInRight'>
				<div className='w-[85%] h-[98%] m-auto flex flex-col justify-evenly'>
					<Header width={'100%'} title={'Ready'} step={'3/3'} />
					<section className='w-full h-[85%] m-auto'>
						<div className='w-full text-center'>
							<h3 className='text-[24px] md:text-[32px] font-alatsi'>
								Your Ticket is Booked!
							</h3>
							<p className='mt-2'>
								Check your email for a copy or you can{' '}
								<span className='font-[600]'>download</span>
							</p>
						</div>

						<section
							className='mt-16 w-[300px] h-[600px] mx-auto ticket relative d-flex'
							id='ticket-container'
						>
							<div className='w-[260px] h-[446px] mx-auto border border-[#24A0B5] mt-3 rounded-2xl absolute top-4'>
								<div className='d-flex'>
									<h2 className='font-roadRage text-[34px]'>
										Techember Fest ”25
									</h2>
									<p className='text-[10px] text-center'>
										📍 04 Rumens road, Ikoyi, Lagos
									</p>
									<p className='text-[10px] mt-1'>📆 March 15, 2025 | 7:00pm</p>
								</div>

								<img
									src={userTicket?.imageUrl}
									alt='ticket_img'
									className='w-[140px] h-[140px] mx-auto mt-6 border-2 border-[#249fb5] rounded-lg object-cover object-top'
								/>
								<section className='w-[232px] h-[160px] mx-auto mt-5 bg-[#08343C] border-[#133D44] rounded-lg p-2'>
									<div className='grid grid-cols-2 h-auto'>
										<div className='border-r border-b border-[#12464E] h-[45px] flex justify-evenly items-start flex-col'>
											<p className='text-[10px] pb-1'>Enter your name</p>
											<p className='text-[8px] '>
												{userTicket?.fullName || 'Avi'}
											</p>
										</div>
										<div className='border-b pl-2 border-[#12464E] h-[45px] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>
												Enter your email<sup>*</sup>
											</p>
											<p className='text-[8px] '>
												{userTicket?.email || 'user@gmail.com'}
											</p>
										</div>
										<div className='border-r border-b pb-1 border-[#12464E] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>Ticket type</p>
											<p className='text-[8px] '>
												{userTicket?.['ticketType'].access}
											</p>
										</div>
										<div className='border-b pl-2 border-[#12464E] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>Ticket for:</p>
											<p className='text-[8px] '>
												{userTicket?.['ticketNum'] || 0}
											</p>
										</div>
									</div>

									<div>
										<p className='text-[10px] py-2'>Special request?</p>
										<p className='text-[10px]'>
											{userTicket?.request || 'Nil'}
										</p>
									</div>
								</section>
							</div>
							<div className='w-[236px] h-[68px] absolute bottom-10'>
								<BarCode />
							</div>
						</section>

						<div className='btn-ctn'>
							<Button
								text='Book Another Ticket'
								className={
									'text-[#24A0B5] border-[#24A0B5] hover:text-opacity-70'
								}
								onclick={handleAnotherTicket}
							/>
							<Button
								text='Download Ticket'
								className={
									' bg-[#24A0B5] border-[#24A0B5] hover:bg-[#249fb5e2]'
								}
								onclick={handleTicketDownload}
							/>
						</div>
					</section>
				</div>
			</section>
		</>
	);
};

export default Ticket;
