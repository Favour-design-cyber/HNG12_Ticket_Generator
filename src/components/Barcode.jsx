import React, { useEffect, useState } from 'react';
import { genRandBarCode } from '../utils';

const Barcode = () => {
	const barCount = 33;
	const [firstDigit, setFirstDigit] = useState(null);
	const [barCodeOne, setBarCodeOne] = useState('');
	const [barCodeTwo, setBarCodeTwo] = useState('');

	useEffect(() => {
		setFirstDigit(genRandBarCode(1));
		setBarCodeOne(genRandBarCode());
		setBarCodeTwo(genRandBarCode());
	}, []);

	return (
		<section className='w-[236px]'>
			<div className='flex l p-2 gap-1 w-[236px] h-[68px]'>
				{Array.from({ length: barCount }).map((_, index) => {
					let height;
					if (
						index < 2 ||
						index >= barCount - 2 ||
						index === Math.floor(barCount / 2) ||
						index === Math.floor(barCount / 2) - 1
					) {
						height = 70;
					} else {
						height = 60;
					}

					if (index % 8 === 0) {
						return <div key={`space-${index}`} className='w-4'></div>;
					}

					return (
						<div
							key={index}
							className={`w-2 bg-white ${
								index % 4 === 0 ? 'w-3' : index % 5 === 0 ? 'w-5' : ''
							}`}
							style={{ height: `${height}px` }}
						></div>
					);
				})}
			</div>
			<div className='flex justify-evenly w-full tracking-9 text-[12px] mt-2'>
				<p>{firstDigit}</p>
				<p className='tracking-widest'>{barCodeOne}</p>
				<p className='tracking-widest'>{barCodeTwo}</p>
			</div>
		</section>
	);
};

export default Barcode;
