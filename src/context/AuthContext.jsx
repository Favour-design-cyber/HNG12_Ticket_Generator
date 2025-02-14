import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [formData, setFormData] = useState({});

	return (
		<>
			<AuthContext.Provider value={{ user, setUser, formData, setFormData }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};
export { AuthContext, AuthProvider };
