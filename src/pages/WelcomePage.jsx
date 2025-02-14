import React from 'react';
import Button from '../components/Button';
import { useNavigate, useOutletContext } from 'react-router';
import MessageHandler from '../components/message/MessageHandler';

const WelcomePage = () => {
	const navigate = useNavigate();
	const handleclick = () => {
		navigate('/ticket-selection');
	};
	return (
		<>
			<section className='ticket-main-container max-md:h-[600px] max-md:w-[90%] relative  animate__animated animate__fadeIn'>
				<div className='ticket-form-container'>
					
					<div className='w-full h-[80%] m-auto  border-none md:border border-[#0E464F] rounded-3xl bg-[#08252B] flex justify-between md:justify-evenly flex-col '>
						<h1 className='font-roadRage text-[32px] md:text-[64px] text-center fest-card-ctn w-[292px] md:w-[506px]'>
							Welcome to the Ultimate Ticket Generator App
						</h1>
						<p className='text-center text-gray-400 text-[16px] w-[85%] mx-auto'>
							Generate your ticket for the upcoming{' '}
							<span className='font-alatsi text-white'>Techember Fest '25</span>
							<br />
							<em>Secure your spot now!</em>
						</p>
						<div className='text-center'>
							<Button
								text='Get Started'
								className={
									'w-[70%] md:w-[60%] max-md:h-[48px] max-lg:h-[60px] text-[#24A0B5] hover:text-white hover:bg-[#24A0B5] border-[#24A0B5] transition'
								}
								onclick={handleclick}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default WelcomePage;
