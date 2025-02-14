import React, { useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { BiEnvelope } from 'react-icons/bi';
import MessageHandler from './message/MessageHandler';

const Input = ({
	id,
	label,
	name,
	value,
	type = 'text',
	placeholder,
	className,
	isRequired,
	minLength,
	maxLength,
	pattern,
	onChange,
	...props
}) => {
	const [error, setError] = useState();
	// Handle validation onBlur (when user leaves the input)

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => setError(null), 5000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	const validateInput = (e) => {
		const { value } = e.target;
		// Check required field
		if (isRequired && !value) {
			return { message: 'This field is required.', type: 'error' };
		}

		// Check minlength
		if (minLength && value.length < minLength) {
			return {
				message: `Must be at least ${minLength} characters.`,
				type: 'error',
			};
		}

		// Check maxlength
		if (maxLength && value.length > maxLength) {
			return {
				message: `Must be less than ${maxLength} characters.`,
				type: 'error',
			};
		}

		// Check pattern (e.g., email, phone number)
		if (pattern && !new RegExp(pattern).test(value)) {
			if (!value.length)
				return { message: 'Invalid email Format', type: 'error' };
			return {
				message: `"${value.slice(
					0,
					6
				)}..." is not a valid email format, try again?`,
				type: 'error',
			};
		}
		// If all validations pass, clear error
		return { message: 'Input validated', type: 'success' };
	};

	return (
		<div className='flex flex-col justify-start mb-6 relative'>
			<label htmlFor={id} className='mb-2'>
				{label}
			</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				pattern={pattern}
				aria-label={label || placeholder}
				aria-required={isRequired}
				className={`${
					className ? className : 'pl-2'
				} w-full h-[48px] bg-transparent border border-[#07373F] rounded-xl outline-none caret-slate-500 focus-visible:outline-[#041E23]`}
				required={isRequired}
				onChange={onChange}
				onBlur={(e) => setError(validateInput(e))}
				{...props}
			/>
			{error?.message && <MessageHandler userMessage={error} className={'-right-2'}/>}
			{type === 'email' && (
				<BiEnvelope className='w-[24px] h-[24px] absolute top-[38px] md:top-[45px] left-2' />
			)}
		</div>
	);
};

export default Input;
