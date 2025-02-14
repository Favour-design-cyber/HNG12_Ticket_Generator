import React from 'react';
import ProgressLine from './ProgressLine';

const Header = ({ width, title, step }) => {
	return (
		<>
			<div
				className={`flex ${
					title !== 'Ready' ? 'flex-col items-start' : 'items-center'
				} md:flex-row md:items-center justify-between pt-5 md:pt-10 mb-2`}
			>
				<h3 className='text-[24px] md:text-[32px] font-jejumyeongo'>{title}</h3>
				<small className='text-[16px] font-roboto'>Step {step}</small>
			</div>
			<ProgressLine width={width} />
		</>
	);
};

export default Header;
