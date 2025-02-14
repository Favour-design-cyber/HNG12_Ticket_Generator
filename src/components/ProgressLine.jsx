const ProgressLine = ({ width }) => {
	return (
		<div
			className={`h-1 w-full border border-[#0E464F] bg-[#0E464F] relative rounded-md`}
		>
			{width && (
				<div
					className={`h-full bg-[#24A0B5] absolute rounded-md top-0 left-0`}
					style={{ width: width }}
				></div>
			)}
		</div>
	);
};

export default ProgressLine;
