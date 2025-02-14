import React, { useState, useEffect } from 'react';

const FilePreview = ({ file, width, height }) => {
	const [fileUrl, setFileUrl] = useState(null);

	useEffect(() => {
		if (!file) {
			setFileUrl(null);
			return;
		}
		// If the file is already a Base64 string, just use it
		if (typeof file === 'string' && file?.startsWith('data:image')) {
			setFileUrl(file);
		} else {
			// If it's a File object, convert it to a temporary object URL
			const url = URL.createObjectURL(file);
			setFileUrl(url);

			return () => URL.revokeObjectURL(url); // Cleanup
		}
	}, [file]);

	return (
		<div className='w-full h-full flex items-center justify-center'>
			{fileUrl && (
				<img
					src={fileUrl}
					alt={file?.name || 'Preview'}
					width={width}
					height={height}
					className={`w-full h-full object-cover object-top rounded-[32px]`}
				/>
			)}
		</div>
	);
};

export default FilePreview;
