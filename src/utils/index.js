export const ticketTypeData = [
	{ plan: 'Free', access: 'Regular Access' },
	{ plan: '$50', access: 'Vip Access' },
	{ plan: '$150', access: 'Vvip Access' },
];

export const genRandBarCode = (length = 6) => {
	let barcodeNum = '';

	while (length > 0) {
		const randNum = Math.floor(Math.random() * 10);
		barcodeNum += randNum;
		length--;
	}
	return barcodeNum;
};
