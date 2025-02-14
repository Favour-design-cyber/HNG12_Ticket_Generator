import React from 'react';
import Button from './Button';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { NavLink } from 'react-router';

const PageHeader = () => {
	return (
		<nav
			className='w-[320px] md:w-[1200px] h-[68px] md:h-[76px] border border-[#197686] flex justify-between items-center px-[16px] py-[12px] mx-auto rounded-3xl font-jejumyeongo mt-10 animate__animated animate__fadeInUp
 '
		>
			<div className='flex gap-3'>
				<img
					src='/ticketLogo.png'
					alt='logo image'
					className='w-[40px] h-[36px] border-2 border-[#0E464F] bg-[#052F35] rounded-xl  p-1'
				/>

				<img src='/ticz.svg' alt='logo image' />
			</div>

			<ul className='hidden md:flex w-[341px] h-[34px] justify-evenly'>
				<li>
					<NavLink
						to='/ticket-selection'
						className={({ isActive }) => (isActive ? 'active-nav' : 'nav-item')}
					>
						Events
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/ticket'
						className={({ isActive }) => (isActive ? 'active-nav' : 'nav-item')}
					>
						My Tickets
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/about'
						className={({ isActive }) => (isActive ? 'active-nav' : 'nav-item')}
					>
						About Project
					</NavLink>
				</li>
			</ul>

			<NavLink
				to={'/ticket'}
				className='w-[141px] h-[44px] md:w-[169px] md:h-[52px] bg-white text-black rounded-xl flex items-center justify-center gap-1'
			>
				MY TICKETS
				<HiOutlineArrowNarrowRight className='' />
			</NavLink>
		</nav>
	);
};

export default PageHeader;
