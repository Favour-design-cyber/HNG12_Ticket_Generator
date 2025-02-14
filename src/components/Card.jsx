import React from 'react';

const Card = ({ ticket, onclick, ticketType }) => {
	const selectedTicket = ticketType?.access === ticket?.access;
	return (
		<div
			className={`w-[255px] md:w-[158px] h-[110px] m-auto border-2 border-[#197686] hover:bg-[#12464E] rounded-xl hover:border pl-3 pt-2 hover:cursor-pointer transition-all`}
			style={{ backgroundColor: selectedTicket && '#12464E' }}
			onClick={onclick}
		>
			<h3 className='font-semibold text-[24px] pb-1'>{ticket?.plan}</h3>
			<p className='uppercase'>{ticket?.access}</p>
			<p className='text-[14px]'>20/52</p>
		</div>
	);
};

export default Card;
