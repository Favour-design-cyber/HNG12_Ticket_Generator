import React from 'react';

const MessageHandler = ({ userMessage, className }) => {
	if (!userMessage) return null;
	const { type, message } = userMessage;
	return (
		<p
			className={`absolute mt-2 right-4 text-[12px]  ${
				type === 'error' ? 'text-red-500' : 'text-green-500'
			} ${className ? className : 'top-0 md:top-0'}`}
			aria-live='assertive'
		>
			{type === 'error' ? `❗️${message}` : `✅ ${message}`}
		</p>
	);
};

export default MessageHandler;
