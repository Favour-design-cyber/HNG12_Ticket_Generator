import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import uploadImg from '../assets/upload.svg';
import changeImg from '../assets/change.svg';
import ProgressLine from '../components/ProgressLine';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import FilePreview from '../components/FilePreviewer';
import MessageHandler from '../components/message/MessageHandler';
import { useNavigate, useOutletContext } from 'react-router';

const AttendeeForm = () => {
	const { formData, setFormData } = useContext(AuthContext);
	const { message, setMessage, setTicketGenerated, isValidTicket } =
		useOutletContext();
	const navigate = useNavigate();

	const [userDetails, setUserDetails] = useState({
		fullName: '',
		email: '',
		request: '',
	});

	// cloudinary
	const [imageFile, setImageFile] = useState(null);
	const UPLOAD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
	const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

	// form validation
	const [formValidated, setFormValidated] = useState(false);
	const [isBlurred, setIsBlurred] = useState(false);
	const emailRegex = useMemo(
		() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		[]
	);

	//form submission
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const updatedData = sessionStorage.getItem('formData');
		const storedFile = sessionStorage.getItem('file');

		if (updatedData) {
			try {
				const { fullName, email, request } = JSON.parse(updatedData);
				if (fullName || email || request) {
					setUserDetails({
						fullName,
						email,
						request,
					});
				}
				if (storedFile) setImageFile(storedFile);
			} catch (e) {
				console.error('Error parsing sessionStorage data:', e);
			}
		}
	}, []);

	const handleFileSelection = (e) => {
		const selectedFile = e.target.files?.[0];

		if (
			selectedFile &&
			(selectedFile.type === 'image/png' ||
				selectedFile.type === 'image/jpg' ||
				selectedFile.type === 'image/jpeg') &&
			selectedFile.size < 5000000
		) {
			setImageFile(selectedFile);
			setMessage({ message: 'File successfully uploaded!', type: 'success' });

			// handle file storage in session
			const reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onload = () => {
				sessionStorage.setItem('file', reader.result);
			};
		} else {
			if (
				(selectedFile && selectedFile?.type !== 'image/png') ||
				selectedFile?.type !== 'image/jpg' ||
				selectedFile.type === 'image/jpeg'
			) {
				setMessage({
					message: 'Wrong image type - upload the right type',
					type: 'error',
				});
			}
			if (selectedFile && selectedFile?.size > 5000000) {
				setMessage({
					message: 'Image size is over 5MB, retry?',
					type: 'error',
				});
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = useCallback(() => {
		let isValidForm = true;
		const { fullName, email } = userDetails;

		if (!imageFile) {
			isValidForm = false;
			setMessage({ message: 'Invalid user profile photo', type: 'error' });
		}

		if (!email || !emailRegex.test(email)) {
			setMessage({ message: 'invalid email', type: 'error' });
			isValidForm = false;
		}

		if (!fullName || fullName.trim().length < 5) {
			isValidForm = false;
			setMessage({
				message: 'Full name must be at least 5 characters.',
				type: 'error',
			});
		}

		if (userDetails.request.length) {
			if (userDetails.request.length <= 5) {
				isValidForm = false;
				setMessage({
					message: 'Request must be at least 5 characters.',
					type: 'error',
				});
			}
		}

		// If no errors, return true indicating form is valid
		if (isValidForm) {
			setFormValidated(true);
			setMessage(null);
		} else {
			setFormValidated(false);
		}

		return isValidForm;
	}, [userDetails, imageFile, emailRegex, setMessage]);

	const handleFileUpload = async () => {
		if (!imageFile) return;
		const formData = new FormData();
		formData.append('file', imageFile);
		formData.append('upload_preset', UPLOAD_PRESET);

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${UPLOAD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);

			const data = await response.json();
			if (data.secure_url) {
				return data.secure_url;
			} else {
				setMessage({ message: 'Image upload failed', type: 'error' });
				return null;
			}
		} catch (error) {
			console.error('Error uploading image: ', error);
		}
	};

	const handleAttendeeFormSubmission = useCallback(async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			setMessage({ message: 'Form validation failed', type: 'error' });
			return;
		}

		const uploadedImageUrl = await handleFileUpload();
		if (!uploadedImageUrl) {
			setMessage({
				message: 'Image upload failed, try again',
				type: 'error',
			});
			return;
		}

		const updatedData = {
			...formData,
			...userDetails,
			imageUrl: uploadedImageUrl,
		};

		setFormData(updatedData);
		sessionStorage.setItem('formData', JSON.stringify(updatedData));

		setMessage({ message: 'Form validated and submitted!', type: 'success' });
		setTimeout(() => {
			setMessage({
				message: 'Image uploaded successfully to cloud storage',
				type: 'success',
			});
		}, 2000);
		setTimeout(() => {
			setMessage({ message: 'Generating Ticket...', type: 'success' });
		}, 4000);
		setTimeout(() => {
			setMessage({
				message: 'Ticket Generated Successfully!',
				type: 'success',
			});
		}, 6000);

		const timeout = setTimeout(() => {
			setTicketGenerated(true);
			sessionStorage.setItem('ticketGenerated', JSON.stringify(true));
			navigate('/ticket');
		}, 6000);
		return () => clearTimeout(timeout);
	});

	useEffect(() => {
		const handleEnterKey = async (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();

				if (isSubmitting) return;
				const isValidForm = validateForm();
				if (!isValidForm) {
					setMessage({ message: 'Form not validated', type: 'error' });
					return;
				}

				setIsSubmitting(true);
				await handleAttendeeFormSubmission(e);
				setIsSubmitting(false);
			}
		};
		window.addEventListener('keydown', handleEnterKey);

		return () => {
			window.removeEventListener('keydown', handleEnterKey);
		};
	}, [
		handleAttendeeFormSubmission,
		isSubmitting,
		setMessage,
		userDetails,
		validateForm,
	]);

	// handle validation on form blur
	useEffect(() => {
		if (isBlurred) {
			validateForm();
		}
	}, [isBlurred, validateForm]);

	const handleBackBtn = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	if (!isValidTicket) {
		setMessage({
			message: 'Unauthorized access, please select a ticket to view this page',
			type: 'error',
		});
		navigate('/ticket-selection');
	}

	return (
		<section className='h-[1083px] mx-auto  ticket-main-container animate__animated animate__fadeInRight'>
			<div className='ticket-form-container'>
				<Header width={'55%'} title={'Attendee Details'} step={'2/3'} />

				{message?.message && (
					<MessageHandler
						userMessage={message}
						className={'hidden md:flex top-4'}
					/>
				)}
				<form
					className='ticket-form h-[907px] attendee-form'
					noValidate
					onBlur={() => setIsBlurred(true)}
				>
					<div className='card-ctn'>
						<p className='max-md:pt-3 pb-3'>Upload Profile Photo</p>
						<div className='w-[98%] md:w-[508px] h-[200px] mx-auto md:bg-[#0000003f] mt-4 relative flex place-content-center'>
							<div className='upload-img-ctn'>
								{!imageFile ? (
									<>
										<label htmlFor='dropzone' className='d-flex gap-3'>
											<img
												src={uploadImg}
												alt='upload'
												width={27}
												height={19}
												className=' hover:cursor-pointer'
											/>
											<small className='text-center'>
												Drag & drop or click to <br />
												upload
											</small>
										</label>
										{
											<MessageHandler
												userMessage={{
													message: 'Accepted formats [jpg/jpeg/png] under 5MB!',
													type: 'error',
												}}
												className={'bottom-2 text-[9px] text-center'}
											/>
										}
									</>
								) : (
									<FilePreview file={imageFile} width={240} height={240} />
								)}
								{imageFile && (
									<label
										htmlFor='dropzone'
										className='d-flex gap-3 absolute inset-0'
									>
										<img
											src={changeImg}
											alt='upload'
											width={100}
											height={100}
											className=' hover:cursor-pointer'
										/>
									</label>
								)}
								<Input
									id='dropzone'
									type='file'
									className='hidden w-full h-full border'
									onChange={handleFileSelection}
								/>
							</div>
						</div>
					</div>
					<div className='w-[95%] mx-auto my-8'>
						<ProgressLine />
					</div>

					<div className='relative'>
						{message?.message && (
							<MessageHandler
								userMessage={message}
								className={'flex md:hidden -top-10 right-0'}
							/>
						)}
					</div>

					<section className='w-[95%] mx-auto'>
						<Input
							type={'text'}
							label={'Enter your name'}
							id={'name'}
							name={'fullName'}
							value={userDetails.fullName}
							minLength={5}
							onChange={handleChange}
						/>
						<Input
							name={'email'}
							value={userDetails.email}
							type={'email'}
							label={'Enter your email'}
							id={'email'}
							className={'pl-10'}
							onChange={handleChange}
							placeholder={''}
							pattern={emailRegex}
						/>
						<div className='mt-4'>
							<p>Special request?</p>
							<textarea
								className='textarea focus-visible:outline-[#041E23]'
								placeholder='Textarea'
								name='request'
								id='request'
								value={userDetails.request}
								onChange={handleChange}
								maxLength={50}
								minLength={10}
								rows={3}
							></textarea>
						</div>
					</section>

					<div className='btn-ctn'>
						<Button
							text='Back'
							className={
								'text-[#24A0B5] border-[#24A0B5] hover:text-opacity-70'
							}
							onclick={handleBackBtn}
						/>
						<Button
							text='Get My Free Ticket'
							className={'bg-[#24A0B5] border-[#24A0B5] hover:bg-[#249fb5c0]'}
							disabled={!formValidated}
							onclick={handleAttendeeFormSubmission}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AttendeeForm;
